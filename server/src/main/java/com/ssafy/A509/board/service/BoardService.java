package com.ssafy.A509.board.service;

import com.ssafy.A509.account.dto.AccountSimpleResponse;
import com.ssafy.A509.account.model.User;
import com.ssafy.A509.account.repository.AccountRepository;
import com.ssafy.A509.board.dto.BoardResponse;
import com.ssafy.A509.board.dto.BoardSimpleResponse;
import com.ssafy.A509.board.dto.CreateBoardRequest;
import com.ssafy.A509.board.dto.UpdateBoardRequest;
import com.ssafy.A509.board.model.Board;
import com.ssafy.A509.board.model.Category;
import com.ssafy.A509.board.repository.BoardRepository;
import com.ssafy.A509.exception.CustomException;
import com.ssafy.A509.exception.ErrorCode;
import com.ssafy.A509.hashtag.dto.HashtagResponse;
import com.ssafy.A509.hashtag.model.Hashtag;
import com.ssafy.A509.photo.dto.CreatePhotoRequest;
import com.ssafy.A509.photo.model.Photo;
import com.ssafy.A509.profile.dto.UserProfileResponse;
import com.ssafy.A509.profile.service.ProfileService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class BoardService {

	private final BoardRepository boardRepository;
	private final AccountRepository accountRepository;
	private final ProfileService profileService;
	private final ModelMapper modelMapper;

	@Transactional
	public Long createBoard(CreateBoardRequest boardRequest) {
		// 사용자 찾아오기
		User user = findByUserId(boardRequest.getUserId());
		// 게시글 생성
		Board board = Board.builder().content(boardRequest.getContent()).user(user).access(boardRequest.getAccess())
			.build();

		// 해시태그 추가
		addHashtags(board, boardRequest);
		// 사진 추가
		addPhotos(board, boardRequest);
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
		List<BoardResponse> boardAll = getAllBoard();

		List<BoardResponse> boardFollwer = boardRepository.findByAccess(userId).stream()
			.map(this::getBoardResponse)
			.collect(Collectors.toList());

		boardAll.addAll(boardFollwer);
		Collections.sort(boardAll, Comparator.comparing(BoardResponse::getCreatedDate).reversed());
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
		boardRepository.delete(findById(boardId));
	}

	private void addPhotos(Board board, CreateBoardRequest boardRequest) {
		Optional.ofNullable(boardRequest.getPhotoList()).ifPresent(list -> {
			for (CreatePhotoRequest photoRequest : list) {
				Photo photo = Photo.builder().path(photoRequest.getPath()) // 사진 받아서 가공해서 사이즈 넣어주기
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

//	private BoardResponse getBoardResponse(Board board) {
//		BoardResponse boardResponse = modelMapper.map(board, BoardResponse.class);
//		UserProfileResponse userProfile = profileService.getUserProfile(board.getUser().getUserId());
//		boardResponse.setAccountSimpleReponse(getUserResponse(board, userProfile));
//		return boardResponse;
//	}

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
