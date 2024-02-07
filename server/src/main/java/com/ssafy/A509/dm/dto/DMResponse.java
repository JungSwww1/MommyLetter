package com.ssafy.A509.dm.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class DMResponse {
	String id;
	Long senderId;
	Long receiverId;
	Long chatGroupId;
	String createdDate;
	String content;
}
