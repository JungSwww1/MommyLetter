package com.ssafy.A509.diary.dto;

import com.ssafy.A509.diary.model.Category;
import com.ssafy.A509.photo.dto.PhotoResponse;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DiaryResponse {
    @NotBlank
    private Long diaryId;

    @NotBlank
    private Long userId;

    @NotBlank
    private String content;

    @NotBlank
    private Category category;

    @NotBlank
    private int emoji;

    @NotBlank
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;

    private List<PhotoResponse> photoList;
}
