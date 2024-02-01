package com.ssafy.A509.diary.dto;

import com.ssafy.A509.diary.model.People;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PeopleResponse {
	@NotNull
	private Long peopleId;

	@NotNull
	private People people;
}
