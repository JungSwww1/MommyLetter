package com.ssafy.A509.comment.dto.like;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreateCommentLikeRequest {
	@NotNull
	Long userId;

	@NotNull
	Long commentId;
}
