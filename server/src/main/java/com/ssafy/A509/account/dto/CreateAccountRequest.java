package com.ssafy.A509.account.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateAccountRequest {

    private String email;
    private String nickname;
    private String password;
}