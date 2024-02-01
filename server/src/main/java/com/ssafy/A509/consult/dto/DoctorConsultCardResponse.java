package com.ssafy.A509.consult.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DoctorConsultCardResponse {
	@NotNull
	private Long counselingId;
	@NotNull
	private Long userId;
	@NotBlank
	private String name;
	@NotBlank
	private String location;
	@NotBlank
	private String department;
	private String profilePhoto;
	@NotNull
	private LocalDateTime reserveDate;
	private String prescriptionPath;


}
