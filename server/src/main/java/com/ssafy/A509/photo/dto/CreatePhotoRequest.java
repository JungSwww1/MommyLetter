package com.ssafy.A509.photo.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreatePhotoRequest {
	@NotBlank
	private String path;
}
