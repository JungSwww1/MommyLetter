package com.ssafy.A509.board.service.like;

import com.ssafy.A509.account.model.User;
import com.ssafy.A509.account.repository.AccountRepository;
import com.ssafy.A509.board.dto.like.CreateBoardLikeRequest;
import com.ssafy.A509.board.model.Board;
import com.ssafy.A509.board.model.like.BoardLike;
import com.ssafy.A509.board.repository.like.BoardLikeRepository;
import com.ssafy.A509.board.repository.BoardRepository;
import com.ssafy.A509.board.service.BoardService;
import jakarta.transaction.Transactional;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class BoardLikeService {

	private final BoardLikeRepository boardLikeRepository;
	private final AccountRepository accountRepository;
	private final BoardRepository boardRepository;

	private final BoardService boardService;

	@Transactional
	public Long createBoardLike(CreateBoardLikeRequest boardLikeRequest) {
		User user = accountRepository.findById(boardLikeRequest.getUserId())
			.orElseThrow(() -> new NoSuchElementException("no such user"));

		Board board = boardService.findById(boardLikeRequest.getBoardId());

		BoardLike boardLike = BoardLike.builder()
			.board(board)
			.user(user)
			.build();

		BoardLike save = boardLikeRepository.save(boardLike);
		return save.getBoard().getBoardId();
	}

	public Long getBoardLikeCount(Long boardId) {
		return boardLikeRepository.countByBoard_BoardId(boardId);

	}

	public boolean boardLikeByUser(Long boardId, Long userId) {
		return boardLikeRepository.findByBoard_BoardIdAndUser_UserId(boardId, userId).isPresent();
	}

	@Transactional
	public void deleteBoardLike(Long boardLikeId) {
		boardLikeRepository.findById(boardLikeId).ifPresentOrElse(boardLikeRepository::delete, () -> {
			throw new NoSuchElementException("no such board-like");
		});
	}
}
