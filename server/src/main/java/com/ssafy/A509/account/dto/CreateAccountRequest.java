package com.ssafy.A509.account.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreateAccountRequest {
  @NotBlank
  private String email;
  @NotBlank
  private String nickname;
  @NotBlank
  private String password;

}
