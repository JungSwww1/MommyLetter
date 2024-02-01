package com.ssafy.A509.profile.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class UserProfileResponse {

    @NotNull
    private Long userId;
    @NotNull
    private String nickname;
    private String intro;
    private String backgroundPhoto;
    private String profilePhoto;

    public UserProfileResponse(Long userId, String nickname, String profilePhoto) {
        this.userId = userId;
        this.nickname = nickname;
        this.profilePhoto = profilePhoto;
    }
}
