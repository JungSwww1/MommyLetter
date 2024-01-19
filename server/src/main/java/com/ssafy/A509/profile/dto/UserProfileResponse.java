package com.ssafy.A509.profile.dto;

import com.ssafy.A509.account.model.User;
import jakarta.validation.constraints.NotBlank;
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
}
