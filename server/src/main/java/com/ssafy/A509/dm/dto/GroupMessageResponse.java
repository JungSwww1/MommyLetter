package com.ssafy.A509.dm.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupMessageResponse {

	String id;
	Long senderId;
	String content;
	Long chatGroupId;
	String createdDate;
}
