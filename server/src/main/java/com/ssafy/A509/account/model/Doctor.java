package com.ssafy.A509.account.model;

import com.ssafy.A509.doctor.model.Reserve;
import jakarta.persistence.*;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "doctor_id")
    private Long doctorId;

    @Column(name = "user_id", insertable = false, updatable = false)
    private Long userId;

    @Column(name = "department")
    private String department;

    @Column(name = "location")
    private String location;

    @Column(name = "valid_time")
    private String validTime;

    @Column(name = "name")
    private String name;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany
    @JoinColumn(name = "doctor_id")
    private List<Reserve> reserves;

    @OneToMany
    @JoinColumn(name = "doctor_id")
    private List<History> histories;

}
