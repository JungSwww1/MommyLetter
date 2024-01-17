package com.ssafy.A509.account.dto;

import com.ssafy.A509.account.model.Gender;
import com.ssafy.A509.account.model.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AccountResponse {
  @NotBlank
  private Long userId;

  @NotNull
  private String password;

  @NotNull
  private String nickname;

  private String intro;

  @NotNull
  private String email;

  private Gender gender;
  private Role role;

  @NotNull
  private LocalDateTime createdDate;

  private LocalDateTime updatedDate;


}
