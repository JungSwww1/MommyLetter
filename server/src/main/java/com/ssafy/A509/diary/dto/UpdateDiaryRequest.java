package com.ssafy.A509.diary.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UpdateDiaryRequest {
	@NotNull
  	private Long diaryId;

  	@NotBlank
	private String content;

  	@NotNull
	private int emoji;

	@NotNull
	private LocalDateTime createdDate;

	private List<String> photoList;

	private UpdateEmoticonRequest emoticonRequest;

}
