package com.ssafy.A509.diary.dto;

import com.ssafy.A509.diary.model.Family;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FamilyResponse {
	@NotNull
	private Long familyId;

	@NotNull
	private Family family;
}
