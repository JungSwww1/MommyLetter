package com.ssafy.A509.doctor.dto;

import com.ssafy.A509.account.model.Gender;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PatientResponse {
	@NotBlank
	private Long userId;

	@NotNull
	private String name;

	@NotNull
	private Gender gender;

	@NotNull
	private LocalDateTime reserveDate;

}
