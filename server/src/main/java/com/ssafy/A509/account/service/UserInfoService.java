package com.ssafy.A509.account.service;

import com.ssafy.A509.account.dto.CreateUserInfoRequest;
import com.ssafy.A509.account.dto.UpdateUserInfoRequest;
import com.ssafy.A509.account.model.UserInfo;
import com.ssafy.A509.account.repository.UserInfoRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserInfoService {

    private final UserInfoRepository userInfoRepository;

    @Transactional
    public void createUserInfo(Long userId, CreateUserInfoRequest userInfoRequest){
        UserInfo userInfo = userInfoRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("UserInfo not found with id: " + userId));

        UserInfo buildUserInfo = UserInfo.builder()
                    .name(userInfoRequest.getName())
                    .SSN(userInfoRequest.getSSN())
                    .phone(userInfoRequest.getPhone())
                    .pregnancyStatus(userInfoRequest.getPregnancyStatus())
                    .extra(userInfoRequest.getExtra())
                    .diaryOpen(userInfoRequest.getDiaryOpen())
                    .build();

        userInfoRepository.save(userInfo);
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
