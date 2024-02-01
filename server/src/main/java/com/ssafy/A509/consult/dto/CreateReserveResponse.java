package com.ssafy.A509.consult.dto;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreateReserveResponse {
	@NotNull
	private Long userId;

	@NotNull
	private Long doctorId;

	@NotNull
	private LocalDateTime reserveDate;

}
