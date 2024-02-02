package com.ssafy.A509.account.controller;

import com.ssafy.A509.account.dto.AccountResponse;
import com.ssafy.A509.account.dto.CreateAccountRequest;
import com.ssafy.A509.account.dto.LoginRequest;
import com.ssafy.A509.account.dto.UpdateAccountRequest;
import com.ssafy.A509.account.service.AccountService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/auth")
@Tag(name = "User", description = "User API")
public class AccountController {
    private final AccountService accountService;

    // 일반 로그인 (소셜 로그인 X)
    @PostMapping("/user-login")
    public String login(@RequestBody LoginRequest loginRequest) {
        return accountService.login(loginRequest.getEmail(), loginRequest.getPassword());
    }

    //계정 생성 (회원가입)
    @CrossOrigin("*")
    @PostMapping("/signup")
    public ResponseEntity<Void> createAccount(@Valid @RequestBody CreateAccountRequest accountRequest){
        accountService.createAccount(accountRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    //userId를 통해 계정을 검색
    @GetMapping("/{userId}")
    public ResponseEntity<AccountResponse> getAccount(@NotBlank @PathVariable Long userId){
        return new ResponseEntity<>(accountService.getAccount(userId), HttpStatus.OK);
    }

    //전체 계정 리스트 검색
    @GetMapping
    public ResponseEntity<List<AccountResponse>> getAllAccount(){
        return new ResponseEntity<>(accountService.getAllAccount(), HttpStatus.OK);
    }

    //계정 정보 수정
    @PatchMapping("/{userId}")
    public ResponseEntity<Void> updateAccount(@PathVariable Long userId, @Valid @RequestBody UpdateAccountRequest accountRequest) {
        try {
            accountService.updateAccount(userId, accountRequest);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //계정 비밀번호 수정
    @PatchMapping("/changepwd/{userId}")
    public ResponseEntity<Void> updateAccountPassword(@PathVariable Long userId, @Valid @RequestBody UpdateAccountRequest accountRequest) {
        accountService.updateAccountPassword(userId, accountRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //계정 삭제
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteAccount(@NotNull @PathVariable Long userId){
        accountService.deleteAccount(userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //이메일 중복체크
    @GetMapping("/signup/check-email")
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email) {
        boolean existsEmail = accountService.isEmailExists(email);
        return new ResponseEntity<>(existsEmail, HttpStatus.OK);
    }

    //닉네임 중복체크
    @GetMapping("/signup/check-nickname")
    public ResponseEntity<Boolean> checkNickname(@RequestParam String nickname) {
        boolean existsNickname = accountService.isNicknameExists(nickname);
        return new ResponseEntity<>(existsNickname, HttpStatus.OK);
    }
}
