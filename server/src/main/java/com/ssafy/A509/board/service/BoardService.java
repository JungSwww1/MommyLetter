package com.ssafy.A509.board.service;

import com.ssafy.A509.board.dto.UpdateBoardRequest;
import com.ssafy.A509.board.dto.BoardResponse;
import com.ssafy.A509.board.dto.CreateBoardRequest;
import com.ssafy.A509.board.model.Board;
import com.ssafy.A509.board.repository.BoardRepository;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class BoardService {

	private final BoardRepository boardRepository;
	private final ModelMapper modelMapper;

	public BoardResponse createBoard(CreateBoardRequest boardRequest) {
		Board buildBoard = Board.builder()
			.content(boardRequest.getContent())
			.user(boardRequest.getUser())
			.build();

		Board board = boardRepository.save(buildBoard);
		return getBoardResponse(board);
	}

	public BoardResponse getBoard(Long id) {
		return boardRepository.findById(id)
			.map(this::getBoardResponse)
			.orElseThrow(() -> new NoSuchElementException("No value present"));
	}

	private BoardResponse getBoardResponse(Board board) {
		return modelMapper.map(board, BoardResponse.class);
	}

	public void updateBoard(UpdateBoardRequest boardRequest) {
		boardRepository.findById(boardRequest.getBoardId())
			.ifPresentOrElse(board -> {
				board.setBoardContent(boardRequest.getContent());
				boardRepository.save(board);
			}, () -> {
				throw new NoSuchElementException("No value present");
			});
	}

	public void deleteBoard(Long id) {
		boardRepository.findById(id)
			.ifPresentOrElse(boardRepository::delete, () -> {
				throw new NoSuchElementException("No value present");
			});
	}
}
