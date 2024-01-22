package com.ssafy.A509.like.controller;

import com.ssafy.A509.like.dto.CreateLikeRequest;
import com.ssafy.A509.like.service.CommentLikeService;
import java.net.URI;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/likes/comments")
public class CommentLikeController extends LikeController<CommentLikeService> {

	public CommentLikeController(CommentLikeService commentLikeService) {
		super(commentLikeService);
	}

	@Override
	public ResponseEntity<URI> createLike(CreateLikeRequest likeRequest) {
		likeService.createLike(likeRequest);
		// 뭘 돌려줄까?
		return ResponseEntity.ok().build();
	}
}
