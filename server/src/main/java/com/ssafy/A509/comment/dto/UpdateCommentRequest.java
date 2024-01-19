package com.ssafy.A509.comment.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UpdateCommentRequest {

	@NotNull
	private Long commentId;
	@NotBlank
	private String content;
}
