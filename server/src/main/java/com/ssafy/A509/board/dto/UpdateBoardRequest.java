package com.ssafy.A509.board.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UpdateBoardRequest {
	@NotBlank
	private Long boardId;

	@NotBlank
	private String content;
}
