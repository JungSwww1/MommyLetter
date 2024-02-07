package com.ssafy.A509.dm.model;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ssafy.A509.account.model.User;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@EntityListeners(AuditingEntityListener.class)
public class ChatGroup {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	private Long chatGroupId;

	private String chatRoomName;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "user_id")
	private User host;

	@ManyToMany(mappedBy = "groups", fetch = LAZY)
	@JsonBackReference
	private Set<User> users = new HashSet<>();

	@CreatedDate
	private LocalDateTime createdDate;

	@Builder
	public ChatGroup(String chatRoomName, User host) {
		this.chatRoomName = chatRoomName;
		this.host = host;
	}
}
