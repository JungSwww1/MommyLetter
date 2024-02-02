package com.ssafy.A509.diary.dto;

import com.ssafy.A509.diary.model.Health;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class HealthResponse {
	@NotNull
	private Long healthId;

	@NotNull
	private Health health;
}
