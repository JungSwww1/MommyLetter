package com.ssafy.A509.profile.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileImageRequest {
    private String imageBase64;  // 프로필 이미지 또는 배경 이미지를 Base64로 인코딩한 문자열
}