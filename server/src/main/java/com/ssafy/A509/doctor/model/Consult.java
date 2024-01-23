package com.ssafy.A509.doctor.model;

import com.ssafy.A509.account.model.User;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Consult {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long counselingId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "reserve_id")
	private Reserve reserve;

	private String prescriptionPath;

	@Builder
	public Consult(User user, Reserve reserve, String prescriptionPath) {
		this.user = user;
		this.reserve = reserve;
		this.prescriptionPath = prescriptionPath;
	}
}
