package com.ssafy.A509.account.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@ToString
public class UserInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userInfoId;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id") // UserInfo와 User를 연결하는 외래 키
    private User user;

    private String SSN;
    private String name;
    private String phone;

    @Enumerated(EnumType.STRING)
    private PregnancyStatus pregnancyStatus;

    private String extra;
    private Boolean diaryOpen;
    private LocalDateTime agreeDate;

    @Builder
    public UserInfo(User user, String SSN, String name, String phone, PregnancyStatus pregnancyStatus, String extra, Boolean diaryOpen, LocalDateTime agreeDate) {
        this.user = user;
        this.SSN = SSN;
        this.name = name;
        this.phone = phone;
        this.pregnancyStatus = pregnancyStatus;
        this.extra = extra;
        this.diaryOpen = diaryOpen;
        this.agreeDate = agreeDate;
    }
}
