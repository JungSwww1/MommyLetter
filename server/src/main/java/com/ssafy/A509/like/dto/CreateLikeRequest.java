package com.ssafy.A509.like.dto;

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
}
