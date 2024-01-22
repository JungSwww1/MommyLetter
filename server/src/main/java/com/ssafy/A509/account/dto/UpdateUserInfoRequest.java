package com.ssafy.A509.account.dto;

import com.ssafy.A509.account.model.PregnancyStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UpdateUserInfoRequest {

    @NotBlank
    private String phone;

    @NotNull
    private PregnancyStatus pregnancyStatus;

    private String extra;

    @NotNull
    private Boolean diaryOpen;
}
