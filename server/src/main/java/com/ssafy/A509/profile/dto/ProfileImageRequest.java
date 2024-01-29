package com.ssafy.A509.profile.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProfileImageRequest {
    private Long userId;
    private String imageUrl;
}