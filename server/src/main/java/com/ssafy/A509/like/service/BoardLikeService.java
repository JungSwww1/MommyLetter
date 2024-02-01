package com.ssafy.A509.like.service;

import com.ssafy.A509.account.model.User;
import com.ssafy.A509.account.repository.AccountRepository;
import com.ssafy.A509.board.model.Board;
import com.ssafy.A509.board.service.BoardService;
import com.ssafy.A509.like.dto.CreateLikeRequest;
import com.ssafy.A509.like.model.BoardLike;
import com.ssafy.A509.like.repository.BoardLikeRepository;
import java.util.NoSuchElementException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

@Service
public class BoardLikeService extends LikeService<BoardService, BoardLikeRepository> {

	public BoardLikeService(AccountRepository accountRepository, BoardService boardService,
		BoardLikeRepository boardLikeRepository) {
		super(accountRepository, boardService, boardLikeRepository);
	}

	@Override
	public void deleteLike(Long id, Long userId) {
		likeRepository.findByBoard_BoardIdAndUser_UserId(id, userId).ifPresentOrElse(likeRepository::delete, () -> {
			throw new NoSuchElementException("no such board-like");
		});
	}

	@Override
	public Long getLikeCount(Long id) {
		return likeRepository.countByBoard_BoardId(id);
	}

	@Override
	public boolean checkUserLike(Long id, Long userId) {
		return likeRepository.existsBoardLikeByBoard_BoardIdAndUser_UserId(id, userId);
	}

	@Override
	protected Long createLikeObject(CreateLikeRequest likeRequest, User user) {
		// 검증
		if (checkUserLike(likeRequest.getBoardId(), likeRequest.getUserId())) {
			throw new DuplicateKeyException("이미 존재하는 board_like 입니다");
		}

		Board board = service.findById(likeRequest.getBoardId());

		BoardLike boardLike = BoardLike.builder()
			.board(board)
			.user(user)
			.build();

		BoardLike save = likeRepository.save(boardLike);
		return save.getId();
	}
}
