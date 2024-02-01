package com.ssafy.A509.like.controller;

import com.ssafy.A509.like.dto.CreateLikeRequest;
import com.ssafy.A509.like.service.BoardLikeService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.net.URI;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/likes/boards")
@Tag(name = "BoardLike", description = "BoardLike API")
public class BoardLikeController extends LikeController<BoardLikeService> {

	public BoardLikeController(BoardLikeService boardLikeService) {
		super(boardLikeService);
	}

	/*
	좋아요 생성
	likeRequest는 boardId와 userId를 받음
	 */
	@Override
	public ResponseEntity<URI> createLike(@Valid @RequestBody CreateLikeRequest likeRequest) {
		if (likeRequest.checkBoardId(likeRequest)) {
			likeService.createLike(likeRequest);
		}
		// 뭘 돌려줄까?
		return ResponseEntity.ok().build();
	}
}
