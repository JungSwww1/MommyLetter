package com.ssafy.A509.account.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class AccountSimpleReponse {
	private String nickname;
	private String profilePhoto;
}
