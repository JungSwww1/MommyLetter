package com.ssafy.A509.dm.model;

import jakarta.persistence.Id;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "dm")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DirectMessage {

	@Id
	private String id;

	private Long chatGroupId;

	private Long senderId;

	private Long receiverId;

	private String content;

	private Set<Long> readUser = new HashSet<>();

	private int unreadCount;

	private LocalDateTime createdDate;

	@Builder
	protected DirectMessage(Long senderId, Long receiverId, String content, Long chatGroupId, LocalDateTime createdDate,
		int unreadCount) {
		this.senderId = senderId;
		this.receiverId = receiverId;
		this.content = content;
		this.chatGroupId = chatGroupId;
		this.createdDate = createdDate;
		this.unreadCount = unreadCount;
	}

	public int addReader(Long userId) {
		if (!this.readUser.contains(userId)) {
			unreadCount--;
			this.readUser.add(userId);
		}

		return unreadCount;
	}
}
