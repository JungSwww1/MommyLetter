package com.ssafy.A509.profile.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DoctorProfileResponse {

    @NotBlank
    private Long userId;
    @NotBlank
    private Long doctorId;
    @NotBlank
    private String name;
    @NotBlank
    private String location;
    @NotBlank
    private String intro;
    @NotBlank
    private String department;
    @NotBlank
    private String validTime;
    private String profilePhoto;
    private String backgroundPhoto;
}
