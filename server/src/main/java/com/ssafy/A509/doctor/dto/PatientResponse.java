package com.ssafy.A509.doctor.dto;

import com.ssafy.A509.account.model.Gender;
import com.ssafy.A509.account.model.PregnancyStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatientResponse {
	@NotNull
	private Long reserveId;
	@NotNull
	private Long userId;
	@NotNull
	private Long doctorId;

	@NotBlank
	private String name;

	private String profilePhoto;

	private String phone;

	@NotBlank
	private String SSN;

	@NotNull
	private Gender gender;

	@NotNull
	private PregnancyStatus status;

	private String extra;

	private Boolean diaryOpen;

	@NotNull
	private LocalDateTime reserveDate;

	@Setter
	private long countReserve;

	@Setter
	private boolean isConsulted;

}
