package com.ssafy.A509.account.service;

import com.ssafy.A509.account.dto.CreateUserInfoRequest;
import com.ssafy.A509.account.dto.UpdateUserInfoRequest;
import com.ssafy.A509.account.model.User;
import com.ssafy.A509.account.model.UserInfo;
import com.ssafy.A509.account.repository.AccountRepository;
import com.ssafy.A509.account.repository.UserInfoRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserInfoService {

    private final UserInfoRepository userInfoRepository;
    private final AccountRepository accountRepository;

    @Transactional
    public void createUserInfo(Long userId, CreateUserInfoRequest userInfoRequest){
        User user = accountRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

        UserInfo buildUserInfo = UserInfo.builder()
                .user(user)
                .SSN(userInfoRequest.getSSN())
                .name(userInfoRequest.getName())
                .phone(userInfoRequest.getPhone())
                .pregnancyStatus(userInfoRequest.getPregnancyStatus())
                .extra(userInfoRequest.getExtra())
                .diaryOpen(userInfoRequest.getDiaryOpen())
                .build();

        userInfoRepository.save(buildUserInfo);
    }

    @Transactional
    public void updateUserInfo(Long userId, UpdateUserInfoRequest updateRequest) {
        UserInfo userInfo = userInfoRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("UserInfo not found with id: " + userId));

        userInfo.setPhone(updateRequest.getPhone());
        userInfo.setPregnancyStatus(updateRequest.getPregnancyStatus());
        userInfo.setExtra(updateRequest.getExtra());
        userInfo.setDiaryOpen(updateRequest.getDiaryOpen());

        userInfoRepository.save(userInfo);
    }
}
