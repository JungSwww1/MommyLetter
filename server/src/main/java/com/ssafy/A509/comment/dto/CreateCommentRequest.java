package com.ssafy.A509.comment.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreateCommentRequest {

	@NotNull
	Long userId;
	@NotNull
	Long boardId;
	@NotBlank
	String content;
}
