package com.ssafy.A509.photo.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CreatePhotoRequest {
	@NotBlank
	private String path;
}
