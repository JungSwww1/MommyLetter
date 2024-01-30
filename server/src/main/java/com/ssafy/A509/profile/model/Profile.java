package com.ssafy.A509.profile.model;

import com.ssafy.A509.account.model.History;
import com.ssafy.A509.account.model.User;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
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

    @Builder
    public Profile(Long profileId, Long userId, String profilePhoto, String backgroundPhoto, User user) {
        this.profileId = profileId;
        this.userId = userId;
        this.profilePhoto = profilePhoto;
        this.backgroundPhoto = backgroundPhoto;
        this.user = user;
    }

}
