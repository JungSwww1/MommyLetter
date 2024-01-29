package com.ssafy.A509.account.model;

import com.ssafy.A509.doctor.model.Reserve;
import com.ssafy.A509.follow.model.Follow;
import com.ssafy.A509.profile.model.Profile;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.*;
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

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Profile profile;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private UserInfo userInfo;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reserve> reserve = new ArrayList<>();

    public static User createUser() {
        return new User();
    }

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

}
