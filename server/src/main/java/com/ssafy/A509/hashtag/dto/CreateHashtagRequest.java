package com.ssafy.A509.hashtag.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreateHashtagRequest {
	private String content;
}
