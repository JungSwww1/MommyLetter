package com.ssafy.A509.account.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ssafy.A509.board.model.Board;
import jakarta.persistence.*;

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

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Board> boards = new ArrayList<>();

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private UserInfo userInfo;

    //  @JsonBackReference
    @OneToOne(mappedBy = "user")
    private Doctor doctor;

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
