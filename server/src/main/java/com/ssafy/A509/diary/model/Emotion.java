package com.ssafy.A509.diary.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import java.util.stream.Stream;

public enum Emotion {

	Joy, Delight, Excited, Happy, Surprise, Calm
	, Sad, Anxious, Tired, Irritated, Angry, Lonely
	, Clear, Cloudy, Rain, Snow, Fog, Wind
	, Healthy, Sick, Medicine, Diagnosis, Hospitalization
	, Family, Friend, Acquaintance, Stranger, None
	, Harmony, Quarrel, Reconcile, Uncomfortable, Discord;

	@JsonCreator
	public static Category parsing(String inputValue) {
		return Stream.of(Category.values())
			.filter(category -> category.toString().equals(inputValue))
			.findFirst()
			.orElse(null);
	}
}
