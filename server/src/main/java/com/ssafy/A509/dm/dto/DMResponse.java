package com.ssafy.A509.dm.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class DMResponse {
	Long senderId;
	Long receiverId;
	LocalDateTime createdDate;
	String content;
}
