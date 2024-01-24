package com.ssafy.A509.dm.dto;

import com.ssafy.A509.account.dto.AccountSimpleReponse;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class OtherUserResponse {
	AccountSimpleReponse accountSimpleReponse;
	String latestMessage;
}
