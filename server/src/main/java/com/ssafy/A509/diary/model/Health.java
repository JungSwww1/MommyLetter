package com.ssafy.A509.diary.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import java.util.stream.Stream;

public enum Health {
	Healthy, Sick, Medicine, Diagnosis, Hospitalization;

	@JsonCreator
	public static Category parsing(String inputValue) {
		return Stream.of(Category.values())
			.filter(category -> category.toString().equals(inputValue))
			.findFirst()
			.orElse(null);
	}
}
