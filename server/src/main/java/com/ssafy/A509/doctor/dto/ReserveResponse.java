package com.ssafy.A509.doctor.dto;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReserveResponse {

	@NotNull
	private Long reserveId;
	@NotNull
	private Long userId;
	private LocalDateTime reserveDate;
}
