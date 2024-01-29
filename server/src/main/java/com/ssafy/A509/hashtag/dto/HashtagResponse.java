package com.ssafy.A509.hashtag.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class HashtagResponse {

	@NotBlank
	private String content;
}
