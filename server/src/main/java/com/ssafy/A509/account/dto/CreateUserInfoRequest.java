package com.ssafy.A509.account.dto;

import com.ssafy.A509.account.model.PregnancyStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateUserInfoRequest {


    private String name;

    private String SSN;

    private String phone;

    private PregnancyStatus pregnancyStatus; // 임신 중, 출산, 해당 사항 없음 Enum

    private String extra; // 비고 (추가 정보)

    private Boolean diaryOpen; // 산모 일기 열람 권한 승인

}
