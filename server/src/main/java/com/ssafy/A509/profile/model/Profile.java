package com.ssafy.A509.profile.model;

import com.ssafy.A509.account.model.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "PROFILE")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "profile_id")
    private Long profileId;

    @Column(name = "user_id", insertable = false, updatable = false)
    private Long userId;

    @Column(name = "profile_photo")
    private String profilePhoto;

    @Column(name = "background_photo")
    private String backgroundPhoto;

    @OneToOne
    @JoinColumn(name = "user_id")
    @MapsId
    private User user;

    // 생성자, 게터, 세터 및 필요한 다른 메서드

}
