package com.ssafy.A509.board.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UpdateBoardRequest {
	@NotNull
	private Long boardId;
	@NotBlank
	private String content;
	private List<String> hashtagList;
}
