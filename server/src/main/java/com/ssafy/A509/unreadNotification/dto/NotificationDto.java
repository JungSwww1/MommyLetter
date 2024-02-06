package com.ssafy.A509.unreadNotification.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class NotificationDto {
	private Long notificationId;
	private Long userId;
	private String dmId;
}
