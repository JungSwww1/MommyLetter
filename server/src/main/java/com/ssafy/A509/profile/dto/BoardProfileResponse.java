package com.ssafy.A509.profile.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BoardProfileResponse {
    @NotNull
    private Long userId;
    @NotNull
    private String nickname;
    private String profilePhoto;
}
