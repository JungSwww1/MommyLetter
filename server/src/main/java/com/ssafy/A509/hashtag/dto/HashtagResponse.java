package com.ssafy.A509.hashtag.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class HashtagResponse {

	@NotBlank
	private String content;

	public HashtagResponse() {
	}
	public HashtagResponse(String content) {
		this.content = content;
	}
}
