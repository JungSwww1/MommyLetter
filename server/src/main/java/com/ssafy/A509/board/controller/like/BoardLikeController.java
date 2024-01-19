package com.ssafy.A509.board.controller.like;

import com.ssafy.A509.board.dto.like.CreateBoardLikeRequest;
import com.ssafy.A509.board.service.like.BoardLikeService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/boards/like")
public class BoardLikeController {

	private final BoardLikeService boardLikeService;

	@GetMapping
	public ResponseEntity<URI> createBoardLike(@Valid @RequestBody CreateBoardLikeRequest boardLikeRequest) {
		Long boardId = boardLikeService.createBoardLike(boardLikeRequest);
		return ResponseEntity.created(URI.create("boards/" + boardId)).build();
	}

	@GetMapping("/{boardId}")
	public ResponseEntity<Long> getBoardLikeCount(@NotNull @PathVariable Long boardId) {
		Long boardLikeCount = boardLikeService.getBoardLikeCount(boardId);
		return ResponseEntity.ok(boardLikeCount);
	}

	@GetMapping("/{boardId}/{userId}")
	public ResponseEntity<Boolean> getBoardLikeByUser(@NotNull @PathVariable Long boardId,
		@NotNull @PathVariable Long userId) {
		boolean doesUserLikeBoard = boardLikeService.boardLikeByUser(boardId, userId);
		return ResponseEntity.ok(doesUserLikeBoard);
	}

	@DeleteMapping("/{boardLikeId}")
	public ResponseEntity<Void> deleteBoardLike(@NotNull @PathVariable Long boardLikeId) {
		boardLikeService.deleteBoardLike(boardLikeId);
		return ResponseEntity.noContent().build();
	}
}
