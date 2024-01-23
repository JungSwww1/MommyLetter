package com.ssafy.A509.doctor.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ConsultResponse {
	@NotNull
	private Long counselingId;

	@NotBlank
	private String prescriptionPath;

}
