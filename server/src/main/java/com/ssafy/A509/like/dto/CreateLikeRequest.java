package com.ssafy.A509.like.dto;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CreateLikeRequest {

	@NotNull
	Long userId;
	Long boardId;
	Long commentId;

	@AssertTrue
	public boolean checkBoardId(CreateLikeRequest likeRequest) {
		return likeRequest.boardId != null;
	}

	@AssertTrue
	public boolean checkCommentId(CreateLikeRequest likeRequest) {
		return likeRequest.commentId != null;
	}
}
