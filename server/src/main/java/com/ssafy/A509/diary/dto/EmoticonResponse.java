package com.ssafy.A509.diary.dto;

import com.ssafy.A509.diary.model.Emotion;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class EmoticonResponse {
	@NotNull
	private Long diaryId;

	@NotNull
	private Emotion emotion;
}
