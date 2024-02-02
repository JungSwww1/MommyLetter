package com.ssafy.A509.doctor.model;
import com.ssafy.A509.account.model.Doctor;
import com.ssafy.A509.account.model.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
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
	@Column(name = "reserve_id")
	private Long reserveId;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "doctor_id")
	private Doctor doctor;
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "reserve_id")
	private Consult consult;
	private LocalDateTime reserveDate;
	@Builder
	public Reserve(User user, Doctor doctor, Consult consult, LocalDateTime reserveDate) {
		this.user = user;
		this.doctor = doctor;
		this.consult = consult;
		this.reserveDate = reserveDate;
	}
}