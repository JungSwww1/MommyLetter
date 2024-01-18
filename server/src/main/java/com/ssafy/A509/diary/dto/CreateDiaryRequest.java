package com.ssafy.A509.diary.dto;

import com.ssafy.A509.diary.model.Category;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Getter;
import com.ssafy.A509.account.model.User;

@Getter
@Builder
public class CreateDiaryRequest {
  @NotBlank
  private Long userId;

  @NotBlank
  private String content;

  @NotBlank
  private Category category;

  @NotBlank
  private int emoji;

}
