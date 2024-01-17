package com.ssafy.A509.board.dto;

import com.ssafy.A509.board.model.Access;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreateBoardRequest {
	@NotBlank
	private User user;
	@NotBlank
	private String content;
	@NotBlank
	private Access access;
}
