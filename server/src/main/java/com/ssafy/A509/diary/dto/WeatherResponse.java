package com.ssafy.A509.diary.dto;

import com.ssafy.A509.diary.model.Weather;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class WeatherResponse {
	@NotNull
	private Long weatherId;

	@NotNull
	private Weather weather;
}
