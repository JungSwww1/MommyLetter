package com.ssafy.A509.dm.model;

import static jakarta.persistence.GenerationType.IDENTITY;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "direct_message")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DirectMessage {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	private Long dmId;

	private String roomId;

	private Long senderId;

	private Long receiverId;

	private String content;

	private String createdDate;

	@Builder
	protected DirectMessage(Long senderId, Long receiverId, String content, String roomId, String createdDate) {
		this.senderId = senderId;
		this.receiverId = receiverId;
		this.content = content;
		this.roomId = roomId;
		this.createdDate = createdDate;
	}
}
