package com.ssafy.A509.doctor.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreateConsultRequest {
	@NotNull
	private Long userId;

	@NotNull
	private Long reserveId;

	@NotBlank
	private String prescriptionPath;
}
