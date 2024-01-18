package com.ssafy.A509.diary.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UpdateDiaryRequest {
  @NotBlank
  private Long diaryId;

  @NotBlank
  private String content;

  @NotBlank
  private String emoji;
}
