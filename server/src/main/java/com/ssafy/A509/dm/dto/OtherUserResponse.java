package com.ssafy.A509.dm.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class OtherUserResponse {
	Long senderId;
	Long userId;
	String latestMessage;
}
