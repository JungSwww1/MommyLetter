package com.ssafy.A509.dm.model;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

import com.ssafy.A509.account.model.User;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@EntityListeners(AuditingEntityListener.class)
public class DmGroup {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	private Long dmGroupId;

	private String dmGroupName;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "user_id")
	private User host;

	@ManyToMany
	@JoinTable(
		name = "user_dm_group",
		joinColumns = @JoinColumn(name = "dm_group_id"),
		inverseJoinColumns = @JoinColumn(name = "user_id")
	)
	private List<User> userList = new ArrayList<>();

	@CreatedDate
	private LocalDateTime createdDate;

	@LastModifiedDate
	private LocalDateTime updatedDate;

	@Builder
	public DmGroup(String dmGroupName, User host) {
		this.dmGroupName = dmGroupName;
		this.host = host;
	}

	public void addUser(User user) {
		userList.add(user);
	}
}
