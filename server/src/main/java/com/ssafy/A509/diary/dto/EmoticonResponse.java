<<<<<<< PATCH SET (c36cdb :art: Feat: Divide Emoticons into 5 Different Tables)
<<<<<<< PATCH SET (f73de4 :art: Feat: Divide Emoticons into 5 Different Tables)
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
=======
>>>>>>> BASE      (064008 :bug: Fix: fix board, comment controller and add explanation)
=======
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
>>>>>>> BASE      (12c0ba :art: Feat: Add Emoticon Features)
