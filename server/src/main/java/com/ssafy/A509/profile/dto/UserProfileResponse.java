package com.ssafy.A509.profile.dto;

import com.ssafy.A509.profile.model.UserProfile;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserProfileResponse {

    @NotBlank
    final Long userId;
    @NotBlank
    final String nickname;
    final String intro;
    final String backgroundPhoto;
    final String profilePhoto;
    @NotBlank
    final int followers;
    @NotBlank
    final int following;

}
