package com.ssafy.A509.like.controller;

import com.ssafy.A509.like.dto.CreateLikeRequest;
import com.ssafy.A509.like.service.LikeService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
public abstract class LikeController<T extends LikeService<?, ?>> {

	protected final T likeService;

	public LikeController(T likeService) {
		this.likeService = likeService;
	}

	@PostMapping
	public abstract ResponseEntity<URI> createLike(@Valid @RequestBody CreateLikeRequest likeRequest);

	@GetMapping("/{id}")
	public ResponseEntity<Long> getBoardLikeCount(@NotNull @PathVariable Long id) {
		Long likeCount = likeService.getLikeCount(id);
		return ResponseEntity.ok(likeCount);
	}

	@GetMapping("/{id}/{userId}")
	public ResponseEntity<Boolean> getLikeByUser(@NotNull @PathVariable Long id,
		@NotNull @PathVariable Long userId) {
		boolean doesUserLikeBoard = likeService.checkUserLike(id, userId);
		return ResponseEntity.ok(doesUserLikeBoard);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteLike(@NotNull @PathVariable Long id) {
		likeService.deleteLike(id);
		return ResponseEntity.noContent().build();
	}
}
