package com.ssafy.A509.account.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UpdateAccountRequest {
  @NotBlank
  private Long userId;

  @NotNull
  private String nickname;

  @NotNull
  private String intro;

  @NotNull
  private String currentPassword;

  @NotNull
  private String newPassword;


}
