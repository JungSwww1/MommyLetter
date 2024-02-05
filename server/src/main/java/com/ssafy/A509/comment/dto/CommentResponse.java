package com.ssafy.A509.comment.dto;

import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommentResponse {

	private Long commentId;
	private String nickname;
	private Long userId;
	private String content;
	private LocalDateTime createdDate;
	private LocalDateTime updatedDate;
}
