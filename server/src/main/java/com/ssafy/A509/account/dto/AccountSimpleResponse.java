package com.ssafy.A509.account.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Builder
public class AccountSimpleResponse {
	private Long userId;
	private String nickname;
	private String profilePhoto;
}
