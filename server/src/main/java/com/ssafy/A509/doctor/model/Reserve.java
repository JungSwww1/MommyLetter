package com.ssafy.A509.doctor.model;

import com.ssafy.A509.account.model.Doctor;
import com.ssafy.A509.account.model.User;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@NoArgsConstructor(access =  AccessLevel.PROTECTED)
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Reserve {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long reserveId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "doctor_id")
	private Doctor doctor;

	private LocalDateTime reserveDate;

	@Builder
	protected Reserve(LocalDateTime reserveDate){
		this.reserveDate = reserveDate;
	}

}
