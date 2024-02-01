package com.ssafy.A509.like.controller;

import com.ssafy.A509.like.dto.CreateLikeRequest;
import com.ssafy.A509.like.service.LikeService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/*
like 기능의 추상클래스 컨트롤러
 */
public abstract class LikeController<T extends LikeService<?, ?>> {

	protected final T likeService;

	public LikeController(T likeService) {
		this.likeService = likeService;
	}

	/*
	좋아요 생성
	각각의 컨트롤러에서 구현되어 있음
	 */
	@PostMapping
	public abstract ResponseEntity<URI> createLike(@Valid @RequestBody CreateLikeRequest likeRequest);

	/*
	게시물의 좋아요 개수 반환
	board 또는 comment Id를 받음
	 */
	@GetMapping("/{id}")
	public ResponseEntity<Long> getBoardLikeCount(@NotNull @PathVariable Long id) {
		Long likeCount = likeService.getLikeCount(id);
		return ResponseEntity.ok(likeCount);
	}

	/*
	사용자 게시물 좋아요 여부 반환
	board 또는 commentId를 받음
	 */
	@GetMapping("/{id}/{userId}")
	public ResponseEntity<Boolean> getLikeByUser(@NotNull @PathVariable Long id,
		@NotNull @PathVariable Long userId) {
		boolean doesUserLikeBoard = likeService.checkUserLike(id, userId);
		return ResponseEntity.ok(doesUserLikeBoard);
	}

	/*
	좋아요 삭제
	board 또는 comment id와 userId를 받아서 삭제함
	 */
	@DeleteMapping("/{id}/{userId}")
	public ResponseEntity<Void> deleteLike(@NotNull @PathVariable Long id, @NotNull @PathVariable Long userId) {
		likeService.deleteLike(id, userId);
		return ResponseEntity.noContent().build();
	}
}
