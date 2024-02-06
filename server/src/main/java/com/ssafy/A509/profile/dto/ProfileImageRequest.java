package com.ssafy.A509.profile.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProfileImageRequest {
    @NotNull
    private Long userId;
    private String imageUrl;
}