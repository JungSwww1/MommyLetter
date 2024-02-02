package com.ssafy.A509.diary.dto;

import jakarta.validation.constraints.NotNull;
import java.util.List;
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
	private List<EmotionResponse> emotionList;

	@NotNull
	private List<FamilyResponse> familyList;

	@NotNull
	private List<HealthResponse> healthList;

	@NotNull
	private List<PeopleResponse> peopleList;

	@NotNull
	private List<WeatherResponse> weatherList;

}

