package com.ssafy.A509.diary.dto;

import com.ssafy.A509.diary.model.Category;
import com.ssafy.A509.diary.model.Emotion;
import com.ssafy.A509.photo.dto.CreatePhotoRequest;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreateDiaryRequest {
  @NotNull private Long userId;

  @NotBlank private String content;

  @NotNull(message = "유효하지 않은 카테고리가 입력되었습니다.")
  private Category category;

  @NotNull private int emoji;

  @NotNull private LocalDateTime createdDate;

  private List<CreatePhotoRequest> photoList;

  private CreateEmoticonRequest emoticon;

  private List<Emotion> emoticonList;
}
