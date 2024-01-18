package com.ssafy.A509.profile.dto;

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

}
