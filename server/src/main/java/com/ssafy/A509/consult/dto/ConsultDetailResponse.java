package com.ssafy.A509.consult.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ConsultDetailResponse {
	@NotNull
	private Long counselingId;
	@NotNull
	private Long userId;
	@NotBlank
	private String doctorName;
	@NotBlank
	private String location;
	@NotBlank
	private String department;
	private String profilePhoto;
	@NotNull
	private LocalDateTime reserveDate;

	@NotBlank
	private String userName;

	private String prescriptionPath;




}
