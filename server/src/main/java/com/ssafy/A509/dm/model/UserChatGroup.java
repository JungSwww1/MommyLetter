package com.ssafy.A509.dm.model;

import com.ssafy.A509.account.model.User;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
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

	@ManyToOne
	@MapsId("chatGroupId")
	@JoinColumn(name = "chat_group_id")
	private ChatGroup chatGroup;

	@ManyToOne
	@MapsId("userId")
	@JoinColumn(name = "user_id")
	private User user;

	@Column(name = "join_date")
	private LocalDateTime joinDate;
}
