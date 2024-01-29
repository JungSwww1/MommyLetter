package com.ssafy.A509.account.dto;

import com.ssafy.A509.account.model.PregnancyStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateUserInfoRequest {

    private String phone;

    private PregnancyStatus pregnancyStatus;

    private String extra;

    private Boolean diaryOpen;

}
