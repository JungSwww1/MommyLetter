package com.ssafy.A509.dm.model;

import jakarta.persistence.Id;
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

	private String chatGroupId;

	private Long senderId;

	private Long receiverId;

	private String content;

	private int readCount;

	private String createdDate;

	@Builder
	protected DirectMessage(Long senderId, Long receiverId, String content, String chatGroupId, String createdDate, int readCount) {
		this.senderId = senderId;
		this.receiverId = receiverId;
		this.content = content;
		this.chatGroupId = chatGroupId;
		this.createdDate = createdDate;
		this.readCount = readCount;
	}

	public void reduceReadCount() {
		if (this.readCount > 0) {
			this.readCount --;
		}
	}
}
