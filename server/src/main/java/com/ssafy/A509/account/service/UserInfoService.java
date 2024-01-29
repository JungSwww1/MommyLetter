package com.ssafy.A509.account.service;

import com.ssafy.A509.account.dto.CreateUserInfoRequest;
import com.ssafy.A509.account.dto.UpdateUserInfoRequest;
import com.ssafy.A509.account.model.User;
import com.ssafy.A509.account.model.UserInfo;
import com.ssafy.A509.account.repository.AccountRepository;
import com.ssafy.A509.account.repository.UserInfoRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class UserInfoService {

    private final UserInfoRepository userInfoRepository;
    private final AccountRepository accountRepository;
    private final ModelMapper modelMapper;

    @Transactional
    public void createUserInfo(Long userId, CreateUserInfoRequest userInfoRequest) {
        User user = accountRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

        UserInfo userInfo = modelMapper.map(userInfoRequest, UserInfo.class);
        userInfo.setUser(user); // User 엔티티 연결
        userInfoRepository.save(userInfo);
    }

    @Transactional
    public void updateUserInfo(Long userInfoId, UpdateUserInfoRequest updateRequest) {
        UserInfo userInfo = userInfoRepository.findById(userInfoId)
                .orElseThrow(() -> new EntityNotFoundException("UserInfo not found with id: " + userInfoId));

        modelMapper.map(updateRequest, userInfo); // 기존 엔티티에 변경사항 매핑
        userInfoRepository.save(userInfo);
    }
}