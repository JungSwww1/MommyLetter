package com.ssafy.A509.comment.dto;

import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CommentResponse {

	private Long commentId;
	private Long userId;
	private String content;
	private LocalDateTime createdDate;
	private LocalDateTime updatedDate;
}
