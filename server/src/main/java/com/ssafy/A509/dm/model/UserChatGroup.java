package com.ssafy.A509.dm.model;

import com.ssafy.A509.account.model.User;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@EntityListeners(AuditingEntityListener.class)
public class UserChatGroup {

	@EmbeddedId
	private UserChatGroupId id = new UserChatGroupId();

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("chatGroupId")
	@JoinColumn(name = "chat_group_id")
	private ChatGroup chatGroup;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("userId")
	@JoinColumn(name = "user_id")
	private User user;

	@Column(name = "join_date")
	private LocalDateTime joinDate;
}
