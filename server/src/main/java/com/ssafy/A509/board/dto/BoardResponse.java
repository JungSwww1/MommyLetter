package com.ssafy.A509.board.dto;

import com.ssafy.A509.board.model.Access;
import com.ssafy.A509.photo.dto.CreatePhotoRequest;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BoardResponse {
	@NotBlank
	private Long boardId;
	@NotBlank
	private Long userId;
	@NotBlank
	private String content;
	@NotBlank
	private Access access;
	@NotBlank
	private LocalDateTime createdDate;
	private LocalDateTime updatedDate;
	private List<String> hashTagList;
	private List<CreatePhotoRequest> photoList;
}
