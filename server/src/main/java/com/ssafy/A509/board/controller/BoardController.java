package com.ssafy.A509.board.controller;

import com.ssafy.A509.board.dto.BoardResponse;
import com.ssafy.A509.board.dto.CreateBoardRequest;
import com.ssafy.A509.board.dto.UpdateBoardRequest;
import com.ssafy.A509.board.service.BoardService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/boards")
public class BoardController {

	private final BoardService boardService;

	@PostMapping
	public ResponseEntity<URI> createBoard(@Valid @RequestBody CreateBoardRequest boardRequest) {
		Long boardId = boardService.createBoard(boardRequest);
		return ResponseEntity.created(URI.create("/" + boardId)).build();
	}

	@GetMapping
	public ResponseEntity<List<BoardResponse>> getAllBoard() {
		return ResponseEntity.ok(boardService.getAllBoard());
	}

	@GetMapping("/user/{userId}")
	public ResponseEntity<List<BoardResponse>> getUserBoard(@NotNull @PathVariable Long userId) {
		return ResponseEntity.ok(boardService.getUserBoard(userId));
	}

	@GetMapping("/{boardId}")
	public ResponseEntity<BoardResponse> getBoard(@NotNull @PathVariable Long boardId) {
		return ResponseEntity.ok(boardService.getBoard(boardId));
	}

	@PatchMapping("/{boardId}")
	public ResponseEntity<Void> updateBoard(@NotNull @PathVariable Long boardId, @Valid @RequestBody UpdateBoardRequest boardRequest) {
		boardService.updateBoard(boardId, boardRequest);
		return ResponseEntity.ok().build();
	}

	@DeleteMapping("/{boardId}")
	public ResponseEntity<Void> deleteBoard(@NotNull @PathVariable Long boardId) {
		boardService.deleteBoard(boardId);
		return ResponseEntity.noContent().build();
	}
}
