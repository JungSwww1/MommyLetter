package com.ssafy.A509.doctor.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreateConsultRequest {
	@NotNull(message = "userId가 존재하지 않습니다")
	private Long userId;

	@NotNull(message = "reserveId가 존재하지 않습니다")
	private Long reserveId;
}
