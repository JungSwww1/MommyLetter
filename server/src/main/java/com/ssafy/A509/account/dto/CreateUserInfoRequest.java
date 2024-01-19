package com.ssafy.A509.account.dto;

import com.ssafy.A509.account.model.PregnancyStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreateUserInfoRequest {

    @NotBlank
    private String name;
    @NotBlank
    private String SSN;
    @NotBlank
    private String phone;
    @NotBlank
    private PregnancyStatus pregnancyStatus; // 임신 중, 출산, 해당 사항 없음 Enum

    private String extra; // 비고 (추가 정보)

    @NotBlank
    private Boolean diaryOpen; // 산모 일기 열람 권한 승인

}
