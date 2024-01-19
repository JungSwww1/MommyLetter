package com.ssafy.A509.comment.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CommentResponse {

	@NotNull
	private Long commentId;
	@NotNull
	private Long userId;
	@NotBlank
	private String content;
	@NotNull
	private LocalDateTime createdDate;
	private LocalDateTime updatedDate;
}
