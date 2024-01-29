package com.ssafy.A509.account.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateAccountRequest {

    private Long userId;

    private String nickname;

    private String intro;

    private String currentPassword;

    private String newPassword;

}
