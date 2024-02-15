package com.ssafy.A509.board.service;

import com.ssafy.A509.account.dto.AccountSimpleResponse;
import com.ssafy.A509.account.model.User;
import com.ssafy.A509.account.repository.AccountRepository;
import com.ssafy.A509.board.dto.BoardResponse;
import com.ssafy.A509.board.dto.BoardSimpleResponse;
import com.ssafy.A509.board.dto.CreateBoardRequest;
import com.ssafy.A509.board.dto.UpdateBoardRequest;
import com.ssafy.A509.board.model.Access;
import com.ssafy.A509.board.model.Board;
import com.ssafy.A509.board.model.Category;
import com.ssafy.A509.board.repository.BoardRepository;
import com.ssafy.A509.exception.CustomException;
import com.ssafy.A509.exception.ErrorCode;
import com.ssafy.A509.hashtag.dto.HashtagResponse;
import com.ssafy.A509.hashtag.model.Hashtag;
import com.ssafy.A509.photo.model.Photo;
import com.ssafy.A509.photo.service.PhotoService;
import com.ssafy.A509.profile.dto.UserProfileResponse;
import com.ssafy.A509.profile.service.ProfileService;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final AccountRepository accountRepository;
    private final ProfileService profileService;
    private final PhotoService photoService;
    private final ModelMapper modelMapper;

    @Transactional
    public Long createBoard(CreateBoardRequest boardRequest, List<MultipartFile> uploadFiles) {
        // 사용자 찾아오기
        User user = findByUserId(boardRequest.getUserId());
        // 게시글 생성
        Board board = Board.builder().content(boardRequest.getContent()).user(user).access(boardRequest.getAccess())
                .build();

        // 해시태그 추가
        addHashtags(board, boardRequest);
        // 사진 추가
        addPhotos(board, uploadFiles);
        // 게시물 저장
        Board save = boardRepository.save(board);

        // 응답 형식으로 바꿔서 반환
        return save.getBoardId();
    }

    public BoardResponse getBoard(Long boardId) {
        Board board = findById(boardId);
        return getBoardResponse(board);
    }

    public List<BoardResponse> getAllBoardByUser(Long userId) {
//        List<BoardResponse> boardAll = getAllBoard();

//        List<BoardResponse> boardFollower = boardRepository.findByAccess(userId).stream()
//                .map(this::getBoardResponse)
//                .toList();

        List<Long> boardFollower = boardRepository.findFollowerBoard(userId).stream()
            .toList();

        //새로운 sql문
        List<BoardResponse> boardAll = boardRepository
            .findAllByAccessOrUserUserIdOrBoardIdInOrderByCreatedDateDesc(Access.All, userId, boardFollower)
            .stream()
            .map(this::getBoardResponse)
            .toList();

//        List<BoardResponse> boardMe = boardRepository.findAllByUserUserId(userId).stream()
//                .map(this::getBoardResponse)
//                .toList();

//        boardAll.addAll(boardFollower);
//		boardMe.stream().filter(boardResponse -> !boardAll.contains(boardResponse)).map(boardAll::add);
//
//        Collections.sort(boardAll, Comparator.comparing(BoardResponse::getCreatedDate).reversed());

//        boardAllAndMe.addAll(boardFollower);
//        Collections.sort(boardAllAndMe, Comparator.comparing(BoardResponse::getCreatedDate).reversed());

        return boardAll;
    }

    public List<BoardResponse> getAllBoard() {
        return boardRepository.findAllBoard().stream().map(this::getBoardResponse)
                .collect(Collectors.toList());
    }


    public List<BoardSimpleResponse> getUserBoard(Long userId) {
        return boardRepository.findAllByUserUserId(userId).stream()
                .map(this::getBoardSimpleResponse).collect(Collectors.toList());
    }

    @Transactional
    public void updateBoard(Long boardId, UpdateBoardRequest boardRequest) {
        Board board = findById(boardId);
        Optional.ofNullable(boardRequest.getContent()).ifPresent(board::setContent);
        Optional.ofNullable(boardRequest.getAccess()).ifPresent(board::setAccess);
        // 해시태그 수정
        List<Hashtag> hashtagList = new ArrayList<>(board.getHashtagList());
        List<String> newHashtagList = Optional.ofNullable(boardRequest.getHashtagList()).orElseGet(ArrayList::new);

        // 해시태그 추가
        newHashtagList.stream()
                .filter(newHashtag -> hashtagList.stream()
                        .noneMatch(existingHashtag -> existingHashtag.getContent().equals(newHashtag)))
                .map(newHashtag -> Hashtag.builder().content(newHashtag).build())
                .forEach(board::addHashtag);

        // 해시태그 삭제
        hashtagList.stream()
                .filter(existingHashtag -> newHashtagList.stream()
                        .noneMatch(newHashtag -> newHashtag.equals(existingHashtag.getContent())))
                .forEach(hashtag -> board.getHashtagList().remove(hashtag));

        boardRepository.save(board);
    }

    @Transactional
    public void deleteBoard(Long boardId) {
        Board board = findById(boardId);
        if (!board.getPhotoList().isEmpty()) {
            board.getPhotoList().stream().forEach(photo -> {
                photoService.deleteFile(photo.getPath());
            });
        }
        boardRepository.delete(findById(boardId));
    }

    private void addPhotos(Board board, List<MultipartFile> uploadFiles) {
        Optional.ofNullable(uploadFiles).ifPresent(list -> {
            for (MultipartFile uploadFile : list) {
                Photo photo = Photo.builder().path(photoService.getImagePath(uploadFile, "board")) // 사진 받아서 가공해서 사이즈 넣어주기
                        .build();

                board.addPhoto(photo);
            }
        });
    }

    private void addHashtags(Board board, CreateBoardRequest boardRequest) {
        Optional.ofNullable(boardRequest.getHashtagList()).ifPresent(list -> {
            for (String hashtagContent : list) {
                Hashtag hashtag = Hashtag.builder().content(hashtagContent).build();

                board.addHashtag(hashtag);
            }
        });
    }

    public Board findById(Long boardId) {
        return boardRepository.findById(boardId).orElseThrow(()
                -> new CustomException(ErrorCode.NO_SUCH_BOARD, "boardId: " + boardId));
    }

    public User findByUserId(Long userId) {
        return accountRepository.findById(userId).orElseThrow(()
                -> new CustomException(ErrorCode.NO_SUCH_ACCOUNT, "userId: " + userId));
    }

    public List<BoardSimpleResponse> findAllByCategory(Category category) {
        return boardRepository.findAllByCategory(category).stream().map(this::getBoardSimpleResponse)
                .collect(Collectors.toList());
    }

    private BoardResponse getBoardResponse(Board board) {
        BoardResponse boardResponse = modelMapper.map(board, BoardResponse.class);
        User user = board.getUser();
        UserProfileResponse userProfile = profileService.getUserProfile(user.getUserId());
        boardResponse.setAccountSimpleReponse(getUserResponse(board, userProfile));

        // 해시태그 목록 추가
        List<HashtagResponse> hashtagList = board.getHashtagList().stream()
                .map(hashtag -> HashtagResponse.builder().content(hashtag.getContent()).build())
                .collect(Collectors.toList());
        boardResponse.setHashTagList(hashtagList);

        return boardResponse;
    }

    private AccountSimpleResponse getUserResponse(Board board, UserProfileResponse userProfile) {
        return AccountSimpleResponse.builder()
                .nickname(board.getUser().getNickname())
                .userId(board.getUser().getUserId())
                .profilePhoto(Optional.ofNullable(userProfile).map(UserProfileResponse::getProfilePhoto).orElse(null))
                .build();
    }

    private BoardSimpleResponse getBoardSimpleResponse(Board board) {
        return BoardSimpleResponse.builder()
                .boardId(board.getBoardId())
                // 여기에 null 대신 defualt 사진 넣어주기?
                .photo(board.getPhotoList().isEmpty() ? null : board.getPhotoList().get(0))
                .build();
    }
}
