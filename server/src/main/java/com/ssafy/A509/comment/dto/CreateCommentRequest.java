package com.ssafy.A509.comment.dto;

import com.ssafy.A509.account.model.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreateCommentRequest {

	@NotBlank
	User user;
	@NotNull
	Long boardId;
	@NotBlank
	String content;
}
