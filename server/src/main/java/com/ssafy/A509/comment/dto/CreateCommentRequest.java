package com.ssafy.A509.comment.dto;

import com.ssafy.A509.user.model.User;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreateCommentRequest {

	@NotBlank
	User user;
	@NotBlank
	Long boardId;
	@NotBlank
	String content;
}
