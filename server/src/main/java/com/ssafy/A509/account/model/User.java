package com.ssafy.A509.account.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.GenerationType;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@EntityListeners(AuditingEntityListener.class)
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long userId;

  private String password;

  private String nickname;

  private String intro;

  private String email;

  @Enumerated(EnumType.STRING)
  private Gender gender;

  @Enumerated(EnumType.STRING)
  private Role role;

  @CreatedDate
  @Column(updatable = false)
  private LocalDateTime createdDate;

  @LastModifiedDate
  private LocalDateTime updatedDate;

  private String profilePhoto;
  private String backgroundPhoto;

  @Builder
  protected User(Long userId, String password, String nickname, String intro, String email,
      Gender gender, Role role, String profilePhoto, String backgroundPhoto) {
    this.userId = userId;
    this.password = password;
    this.nickname = nickname;
    this.intro = intro;
    this.email = email;
    this.gender = gender;
    this.role = role;
    this.profilePhoto = profilePhoto;
    this.backgroundPhoto = backgroundPhoto;
  }
}
