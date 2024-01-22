package com.ssafy.A509.account.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ssafy.A509.follow.model.Follow;
import com.ssafy.A509.profile.model.Profile;
import jakarta.persistence.*;

import java.time.LocalDateTime;
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
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", insertable = false, updatable = false)
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

    @OneToMany(mappedBy = "follower")
    private List<Follow> followingList;

    @OneToMany(mappedBy = "following")
    private List<Follow> followerList;

//    @JsonBackReference
    @OneToOne(mappedBy = "user")
    private Doctor doctor;

    @OneToOne(mappedBy = "user")
    private Profile profile;

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
  }

    public void setNickname(String nickname) {
      this.nickname = nickname;
    }

    public void setIntro(String intro) {
      this.intro = intro;
    }

    public void setPassword(String password) {
      this.password = password;
    }
}
