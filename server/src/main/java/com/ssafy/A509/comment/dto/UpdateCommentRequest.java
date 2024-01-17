package com.ssafy.A509.comment.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UpdateCommentRequest {

	@NotBlank
	private Long commentId;
	@NotBlank
	private String content;
}
