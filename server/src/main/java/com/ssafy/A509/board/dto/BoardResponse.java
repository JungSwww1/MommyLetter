package com.ssafy.A509.board.dto;

import com.ssafy.A509.board.model.Access;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BoardResponse {

	@NotBlank
	@NotNull
	private Long boardId;
	@NotBlank
	private User user;
	@NotBlank
	private String content;
	@NotBlank
	private Access access;
	@NotBlank
	private LocalDateTime createdDate;
	private LocalDateTime updatedDate;

}
