package com.ssafy.A509.dm.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class DMResponse {
	Long senderId;
	Long receiverId;
	String createdDate;
	String content;
}