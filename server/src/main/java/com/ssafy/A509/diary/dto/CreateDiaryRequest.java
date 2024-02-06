package com.ssafy.A509.diary.dto;

import com.ssafy.A509.diary.model.Category;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Builder
public class CreateDiaryRequest {
  @NotNull(message = "userId가 존재하지 않습니다")
  private Long userId;

  @NotBlank(message = "Content가 존재하지 않습니다")
  private String content;

  @NotNull(message = "유효하지 않은 카테고리가 입력되었습니다")
  private Category category;

  @NotNull(message = "이모지가 존재하지 않습니다")
  private int emoji;

  @NotNull(message = "생성날짜가 존재하지 않습니다")
  private LocalDateTime createdDate;

//  private List<MultipartFile> photoList;

  private CreateEmoticonRequest emoticon;
}
