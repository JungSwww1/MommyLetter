package com.ssafy.A509.board.dto.like;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CreateBoardLikeRequest {
	@NotNull
	Long userId;

	@NotNull
	Long boardId;
}
