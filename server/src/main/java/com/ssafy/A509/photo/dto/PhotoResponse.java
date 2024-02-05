package com.ssafy.A509.photo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PhotoResponse {

	@NotNull
	Long photoId;
	@NotBlank
	String path;
	@NotBlank
	Long boardId;
	@NotBlank
	Long diaryId;
	@NotBlank
	LocalDateTime createdDate;
	LocalDateTime updatedDate;
}
