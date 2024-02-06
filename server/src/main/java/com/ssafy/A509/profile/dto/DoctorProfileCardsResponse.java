package com.ssafy.A509.profile.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class DoctorProfileCardsResponse {
    @NotBlank
    private Long doctorId;
    @NotBlank
    private String name;
    @NotBlank
    private String location;
    @NotBlank
    private String department;
    private String profilePhoto;
}
