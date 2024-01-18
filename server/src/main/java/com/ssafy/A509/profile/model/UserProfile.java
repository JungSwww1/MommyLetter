package com.ssafy.A509.profile.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String nickname;
    private String intro;
    private String backgroundPhoto;
    private String profilePhoto;
    private int followers;
    private int following;

    @Builder
    protected UserProfile(Long userId, String nickname, String intro, String backgroundPhoto, String profilePhoto, int followers, int following) {
        this.userId = userId;
        this.nickname = nickname;
        this.intro = intro;
        this.backgroundPhoto = backgroundPhoto;
        this.profilePhoto = profilePhoto;
        this.followers = followers;
        this.following = following;
    }
}
