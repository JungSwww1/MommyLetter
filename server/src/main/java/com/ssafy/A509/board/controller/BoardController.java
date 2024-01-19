package com.ssafy.A509.board.controller;

import com.ssafy.A509.board.dto.BoardResponse;
import com.ssafy.A509.board.dto.CreateBoardRequest;
import com.ssafy.A509.board.dto.UpdateBoardRequest;
import com.ssafy.A509.board.service.BoardService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import java.net.URI;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/boards")
public class BoardController {

	private final BoardService boardService;

	@PostMapping
	public ResponseEntity<BoardResponse> createBoard(@Valid @RequestBody CreateBoardRequest boardRequest) {
		Long boardId = boardService.createBoard(boardRequest);
		return ResponseEntity.created(URI.create("/" + boardId)).build();
	}

	@GetMapping
	public ResponseEntity<List<BoardResponse>> getAllBoard() {
		return new ResponseEntity<>(boardService.getAllBoard(), HttpStatus.OK);
	}

	@GetMapping("/user/{userId}")
	public ResponseEntity<List<BoardResponse>> getUserBoard(@NotBlank @PathVariable Long userId) {
		return new ResponseEntity<>(boardService.getUserBoard(userId), HttpStatus.OK);
	}

	@GetMapping("/{boardId}")
	public ResponseEntity<BoardResponse> getBoard(@NotBlank @PathVariable Long boardId) {
		return new ResponseEntity<>(boardService.getBoard(boardId), HttpStatus.OK);
	}

	@PatchMapping("/{boardId}")
	public ResponseEntity<Void> updateBoard(@Valid UpdateBoardRequest boardRequest) {
		boardService.updateBoard(boardRequest);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@DeleteMapping("/{boardId}")
	public ResponseEntity<Void> deleteBoard(@NotBlank @PathVariable Long boardId) {
		boardService.deleteBoard(boardId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
