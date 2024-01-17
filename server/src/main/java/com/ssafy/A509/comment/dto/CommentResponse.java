package com.ssafy.A509.comment.dto;

import com.ssafy.A509.board.model.Access;
import com.ssafy.A509.user.model.User;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CommentResponse {

	@NotBlank
	private Long commentId;
	@NotBlank
	private User user;
	@NotBlank
	private String content;
	@NotBlank
	private LocalDateTime createdDate;
	private LocalDateTime updatedDate;
}
