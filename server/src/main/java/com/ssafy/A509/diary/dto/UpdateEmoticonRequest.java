package com.ssafy.A509.diary.dto;

import com.ssafy.A509.diary.model.Emotion;
import com.ssafy.A509.diary.model.Family;
import com.ssafy.A509.diary.model.Health;
import com.ssafy.A509.diary.model.People;
import com.ssafy.A509.diary.model.Weather;
import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UpdateEmoticonRequest {
	List<Emotion> emotionList = new ArrayList<>();
	List<Family> familyList = new ArrayList<>();
	List<Health> healthList = new ArrayList<>();
	List<People> peopleList = new ArrayList<>();
	List<Weather> weatherList = new ArrayList<>();
}
