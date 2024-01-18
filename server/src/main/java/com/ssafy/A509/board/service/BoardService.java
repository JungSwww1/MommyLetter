package com.ssafy.A509.board.service;

import com.ssafy.A509.account.model.User;
import com.ssafy.A509.board.dto.UpdateBoardRequest;
import com.ssafy.A509.board.dto.BoardResponse;
import com.ssafy.A509.board.dto.CreateBoardRequest;
import com.ssafy.A509.board.model.Board;
import com.ssafy.A509.board.repository.BoardRepository;
import com.ssafy.A509.hashtag.dto.CreateHashtagRequest;
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
	public BoardResponse createBoard(CreateBoardRequest boardRequest) {
		// 사용자 찾아오기
//		User user = userRepository.findById(boardRequest.getUserId());
		User user = User.builder()
			.userId(101L)
			.build();

		// 게시글 생성
		Board board = Board.builder()
			.content(boardRequest.getContent())
			.user(user)
			.access(boardRequest.getAccess())
			.build();

		// 해시태그 추가
		addHashtags(board, boardRequest);
		// 사진 추가
		addPhotos(board, boardRequest);
		// 게시물 저장
		Board save = boardRepository.save(board);

		// 응답 형식으로 바꿔서 반환
		return getBoardResponse(save);
	}


	public BoardResponse getBoard(Long boardId) {
		return boardRepository.findById(boardId)
			.map(this::getBoardResponse)
			.orElseThrow(() -> new NoSuchElementException("No value present"));
	}

	public List<BoardResponse> getAllBoard() {
		return boardRepository.findAll().stream().map(board -> modelMapper.map(board, BoardResponse.class)).collect(
			Collectors.toList());
	}

	public List<BoardResponse> getUserBoard(Long userId) {
		return boardRepository.findAllByUserUserId(userId).stream()
			.map(board -> modelMapper.map(board, BoardResponse.class)).collect(
				Collectors.toList());
	}

	@Transactional
	public void updateBoard(UpdateBoardRequest boardRequest) {
		boardRepository.findById(boardRequest.getBoardId())
			.ifPresentOrElse(board -> {
				board.setBoardContent(boardRequest.getContent());
				boardRepository.save(board);
			}, () -> {
				throw new NoSuchElementException("No value present");
			});
	}

	@Transactional
	public void deleteBoard(Long boardId) {
		boardRepository.findById(boardId)
			.ifPresentOrElse(boardRepository::delete, () -> {
				throw new NoSuchElementException("No value present");
			});
	}

	private void addPhotos(Board board, CreateBoardRequest boardRequest) {
		Optional.ofNullable(boardRequest.getPhotoList()).ifPresent(list -> {
			for (CreatePhotoRequest photoRequest : list) {
				Photo photo = Photo.builder()
					.path(photoRequest.getPath())
					.size(100) // 사진 받아서 가공해서 사이즈 넣어주기
					.build();

				board.addPhoto(photo);
			}
		});
	}

	private void addHashtags(Board board, CreateBoardRequest boardRequest) {
		Optional.ofNullable(boardRequest.getHashTagList()).ifPresent(list -> {
			for (CreateHashtagRequest hashtagRequest : list) {
				Hashtag hashtag = Hashtag.builder()
					.content(hashtagRequest.getContent())
					.build();

				board.addHashtag(hashtag);
			}
		});
	}

	private BoardResponse getBoardResponse(Board board) {
		return modelMapper.map(board, BoardResponse.class);
	}
}
