package com.ssafy.A509.profile.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DoctorProfileResponse {

    @NotBlank
    private Long userId;
    @NotBlank
    private Long doctorId;
    @NotBlank
    private String name;
    @NotBlank
    private String hospital;
    @NotBlank
    private String intro;
    @NotBlank
    private String specialty;
    @NotBlank
    private String availableTime;
    private String backgroundPhoto;
    private String profilePhoto;
}
