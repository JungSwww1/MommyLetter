package com.ssafy.A509.account.controller;

import com.ssafy.A509.account.dto.CreateUserInfoRequest;
import com.ssafy.A509.account.dto.UpdateUserInfoRequest;
import com.ssafy.A509.account.service.UserInfoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth/consult-info")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserInfoController {

    private final UserInfoService userInfoService;

    // 회원 상담 정보 등록
    @PostMapping("/{userId}")
    public ResponseEntity<Void> createUserInfo(@PathVariable Long userId, @Valid @RequestBody CreateUserInfoRequest createUserInfoRequest){
        userInfoService.createUserInfo(userId, createUserInfoRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // 회원 상담 정보 수정
    @PatchMapping("/{userInfoId}")
    public ResponseEntity<Void> updateUserInfo(@PathVariable Long userInfoId, @Valid @RequestBody UpdateUserInfoRequest updateUserInfoRequest) {
        userInfoService.updateUserInfo(userInfoId, updateUserInfoRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
