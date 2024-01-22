package com.ssafy.A509.like.controller;

import com.ssafy.A509.like.dto.CreateLikeRequest;
import com.ssafy.A509.like.service.CommentLikeService;
import jakarta.validation.Valid;
import java.net.URI;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/likes/comments")
public class CommentLikeController extends LikeController<CommentLikeService> {

	public CommentLikeController(CommentLikeService commentLikeService) {
		super(commentLikeService);
	}

	@Override
	public ResponseEntity<URI> createLike(@Valid @RequestBody CreateLikeRequest likeRequest) {
		if (likeRequest.checkCommentId(likeRequest)) {
			likeService.createLike(likeRequest);
		}
		// 뭘 돌려줄까?
		return ResponseEntity.ok().build();
	}
}
