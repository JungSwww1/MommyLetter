package com.ssafy.A509.account.controller;

import com.ssafy.A509.account.dto.AccountResponse;
import com.ssafy.A509.account.dto.CreateAccountRequest;
import com.ssafy.A509.account.dto.UpdateAccountRequest;
import com.ssafy.A509.account.service.AccountService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AccountController {
  private final AccountService accountService;

  //계정 생성 (회원가입)
  @PostMapping("/signup")
  public ResponseEntity<Void> createAccount(@Valid @RequestBody CreateAccountRequest accountRequest){
    accountService.createAccount(accountRequest);
    return new ResponseEntity<>(HttpStatus.CREATED);
  }

  //userId를 통해 계정을 검색
  @GetMapping("/{userId}")
  public ResponseEntity<AccountResponse> getAccount(@NotNull @PathVariable Long userId){
    return new ResponseEntity<>(accountService.getAccount(userId), HttpStatus.OK);
  }

  //전체 계정 리스트 검색
  @GetMapping
  public ResponseEntity<List<AccountResponse>> getAllAccount(){
    return new ResponseEntity<>(accountService.getAllAccount(), HttpStatus.OK);
  }

  //계정 정보 수정
  @PatchMapping("/{userId}")
  public ResponseEntity<Void> updateAccount(@Valid UpdateAccountRequest accountRequest){
    accountService.updateAccount(accountRequest);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  //계정 비밀번호 수정
  @PatchMapping("/changepwd")
  public ResponseEntity<Void> updateAccountPassword(@Valid UpdateAccountRequest accountRequest){
    accountService.updateAccountPassword(accountRequest);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  //계정 삭제
  @DeleteMapping("/{userId}")
  public ResponseEntity<Void> deleteAccount(@NotNull @PathVariable Long userId){
    accountService.deleteAccount(userId);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }


}
