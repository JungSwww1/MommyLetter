package com.ssafy.A509.account.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@EntityListeners(AuditingEntityListener.class)
@ToString
public class UserInfo {

    @Id
    private Long userId; // User 엔티티의 ID를 기본 키로 사용

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId // UserInfo의 기본 키를 User의 기본 키와 매핑
    @JoinColumn(name = "user_id")
    private User user;

    private String SSN;

    @Setter
    private String name;

    @Setter
    private String phone;

    @Enumerated(EnumType.STRING)
    @Setter
    private PregnancyStatus pregnancyStatus;

    @Setter
    private String extra;

    @Setter
    private Boolean diaryOpen;

    private LocalDateTime agreeDate;

    @Builder
    public UserInfo(User user, String SSN, String name, String phone, PregnancyStatus pregnancyStatus, String extra, Boolean diaryOpen, LocalDateTime agreeDate) {
        this.user = user;
        this.userId = user != null ? user.getUserId() : null; // user 객체에서 userId를 추출
        this.SSN = SSN;
        this.name = name;
        this.phone = phone;
        this.pregnancyStatus = pregnancyStatus;
        this.extra = extra;
        this.diaryOpen = diaryOpen;
        this.agreeDate = agreeDate;
    }

}