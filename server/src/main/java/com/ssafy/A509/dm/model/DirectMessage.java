package com.ssafy.A509.dm.model;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

import com.ssafy.A509.account.model.User;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DirectMessage {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	private Long dmId;

	private String roomId;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "sender_id")
	private User sender;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "receiver_id")
	private User receiver;

	private String content;

	private LocalDateTime createdDate;

	@Builder
	protected DirectMessage(User sender, User receiver, String content, String roomId, String createdDate) {
		this.sender = sender;
		this.receiver = receiver;
		this.content = content;
		this.roomId = roomId;
		this.createdDate = LocalDateTime.parse(createdDate);
	}
}
