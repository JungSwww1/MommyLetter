package com.ssafy.A509.diary.dto;

import com.ssafy.A509.diary.model.Emotion;
import com.ssafy.A509.diary.model.Family;
import com.ssafy.A509.diary.model.Health;
import com.ssafy.A509.diary.model.People;
import com.ssafy.A509.diary.model.Weather;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreateEmoticonRequest {

	List<Emotion> emotionList;
	List<Family> familyList;
	List<Health> healthList;
	List<People> peopleList;
	List<Weather> weatherList;
}
