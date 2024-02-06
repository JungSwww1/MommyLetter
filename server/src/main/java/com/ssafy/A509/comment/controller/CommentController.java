package com.ssafy.A509.comment.controller;

import com.ssafy.A509.comment.dto.CommentResponse;
import com.ssafy.A509.comment.dto.CreateCommentRequest;
import com.ssafy.A509.comment.service.CommentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@RequestMapping("/comments")
@Tag(name = "Comment", description = "Comment API")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CommentController {

	private final CommentService commentService;

	@PostMapping
	public ResponseEntity<CommentResponse> createComment(@Valid @RequestBody CreateCommentRequest commentRequest) {
		commentService.createComment(commentRequest);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/{boardId}")
	public ResponseEntity<List<CommentResponse>> getBoardComments(@NotBlank @PathVariable Long boardId) {
		return new ResponseEntity<>(commentService.getBoardComment(boardId), HttpStatus.OK);
	}

	@PatchMapping("/{commentId}")
	public ResponseEntity<Void> updateComment(@NotNull @PathVariable Long commentId, @NotBlank @RequestBody String content) {
		commentService.updateComment(commentId, content);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@DeleteMapping("/{commentId}")
	public ResponseEntity<Void> deleteComment(@NotBlank @PathVariable Long commentId) {
		commentService.deleteComment(commentId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
