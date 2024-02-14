package com.ssafy.A509.account.dto;

import com.ssafy.A509.account.model.PregnancyStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserInfoResponse {
    @NotNull
    Long userInfoId;

    @NotBlank(message = "실명은 필수 입력 값입니다.")
    private String name;

    @NotBlank(message = "주민등록번호는 필수 입력 값입니다.")
    private String ssn;

    @NotBlank(message = "전화번호는 필수 입력 값입니다.")
    private String phone;

    private PregnancyStatus pregnancyStatus; // 임신 중, 출산, 해당 사항 없음 Enum

    private String extra; // 비고 (추가 정보)

    @NotNull(message = "산모 일기 열람 권한 승인은 필수 입력 값입니다.")
    private Boolean diaryOpen; // 산모 일기 열람 권한 승인
}
