package com.ssafy.A509.profile.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class DoctorProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;            //userID
    private Long doctorId;          //doctorID
    private String name;            //의사이름
    private String hospital;        //소속병원
    private String intro;           //의사약력
    private String specialty;       //진료과목
    private String availableTime;   //진료가능 시간
    private String backgroundPhoto; //배경 사진
    private String profilePhoto;    //프로필 사진

}