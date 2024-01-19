package com.ssafy.A509.board.service;

import com.ssafy.A509.account.model.User;
import com.ssafy.A509.board.dto.UpdateBoardRequest;
import com.ssafy.A509.board.dto.BoardResponse;
import com.ssafy.A509.board.dto.CreateBoardRequest;
import com.ssafy.A509.board.model.Board;
import com.ssafy.A509.board.repository.BoardRepository;
import com.ssafy.A509.hashtag.model.Hashtag;
import com.ssafy.A509.photo.dto.CreatePhotoRequest;
import com.ssafy.A509.photo.model.Photo;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
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
	//	private final UserRepository userRepository;
	private final ModelMapper modelMapper;

	@Transactional
	public Long createBoard(CreateBoardRequest boardRequest) {
		// 사용자 찾아오기
//		User user = userRepository.findById(boardRequest.getUserId());
		User user = User.builder().userId(101L).build();

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
		return boardRepository.findById(boardId).map(board -> modelMapper.map(board, BoardResponse.class))
			.orElseThrow(() -> new NoSuchElementException("No value present"));
	}

	public List<BoardResponse> getAllBoard() {
		return boardRepository.findAll().stream().map(board -> modelMapper.map(board, BoardResponse.class))
			.collect(Collectors.toList());
	}

	public List<BoardResponse> getUserBoard(Long userId) {
		return boardRepository.findAllByUserUserId(userId).stream()
			.map(board -> modelMapper.map(board, BoardResponse.class)).collect(Collectors.toList());
	}

	@Transactional
	public void updateBoard(UpdateBoardRequest boardRequest) {
		boardRepository.findById(boardRequest.getBoardId()).ifPresentOrElse(board -> {
			// 내용 수정
			board.setBoardContent(boardRequest.getContent());

			// 해시태그 수정
			List<Hashtag> hashtagList = new ArrayList<>(board.getHashtagList());
			List<String> newHashtagList = Optional.ofNullable(boardRequest.getHashtagList()).orElseGet(ArrayList::new);

			// 이 두 개를 합칠 수 없을까??
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
		}, () -> {
			throw new NoSuchElementException("No value present");
		});
	}

	@Transactional
	public void deleteBoard(Long boardId) {
		boardRepository.findById(boardId).ifPresentOrElse(boardRepository::delete, () -> {
			throw new NoSuchElementException("No value present");
		});
	}

	private void addPhotos(Board board, CreateBoardRequest boardRequest) {
		Optional.ofNullable(boardRequest.getPhotoList()).ifPresent(list -> {
			for (CreatePhotoRequest photoRequest : list) {
				Photo photo = Photo.builder().path(photoRequest.getPath()).size(100) // 사진 받아서 가공해서 사이즈 넣어주기
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

	private BoardResponse getBoardResponse(Board board) {
		return modelMapper.map(board, BoardResponse.class);
	}
}
