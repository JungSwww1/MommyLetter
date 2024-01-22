package com.ssafy.A509.comment.controller.like;

import com.ssafy.A509.comment.dto.like.CreateCommentLikeRequest;
import com.ssafy.A509.comment.service.like.CommentLikeService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comments/like")
public class CommentLikeController {

	private final CommentLikeService commentLikeService;

	@PostMapping
	public ResponseEntity<Void> createCommentLike(@Valid @RequestBody CreateCommentLikeRequest commentLikeRequest) {
		Long commentId = commentLikeService.createCommentLike(commentLikeRequest);
		// 뭘 돌려주지
		return ResponseEntity.ok().build();
	}

	@GetMapping("/{commentId}")
	public ResponseEntity<Long> getCommentLikeCount(@NotNull @PathVariable Long commentId) {
		Long commentLikeCount = commentLikeService.getCommentLikeCount(commentId);
		return ResponseEntity.ok(commentLikeCount);
	}

	@GetMapping("/{commentId}/{userId}")
	public ResponseEntity<Boolean> getCommentLikeByUser(@NotNull @PathVariable Long commentId,
		@NotNull @PathVariable Long userId) {
		boolean doesUserLikeComment = commentLikeService.commentLikeByUser(commentId, userId);
		return ResponseEntity.ok(doesUserLikeComment);
	}

	@DeleteMapping("/{commentLikeId}")
	public ResponseEntity<Void> deleteCommentLike(@NotNull @PathVariable Long commentLikeId) {
		commentLikeService.deleteCommentLike(commentLikeId);
		return ResponseEntity.noContent().build();
	}
}
