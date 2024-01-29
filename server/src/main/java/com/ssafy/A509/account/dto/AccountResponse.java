package com.ssafy.A509.account.dto;

import com.ssafy.A509.account.model.Gender;
import com.ssafy.A509.account.model.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccountResponse {

    private Long userId;
    private String password;
    private String nickname;

    private String intro;
    private String email;
    private Gender gender;
    private Role role;

    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;

}
