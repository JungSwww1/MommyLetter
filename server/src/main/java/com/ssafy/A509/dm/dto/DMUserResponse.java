package com.ssafy.A509.dm.dto;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DMUserResponse {

	private Long chatGroupId;
	private String chatRoomName;
	private LocalDateTime createdDate;
	private DMResponse dmResponse;
}
