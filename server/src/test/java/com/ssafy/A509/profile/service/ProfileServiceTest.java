//package com.ssafy.A509.profile.service;
//
//import com.ssafy.A509.account.model.User;
//import com.ssafy.A509.account.repository.AccountRepository;
//import com.ssafy.A509.profile.dto.ProfileImageRequest;
//import com.ssafy.A509.profile.model.Profile;
//import com.ssafy.A509.profile.repository.ProfileRepository;
//import jakarta.transaction.Transactional;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.junit.jupiter.api.Assertions.assertNotNull;
//
//@ExtendWith(SpringExtension.class)
//@SpringBootTest
//@Transactional
//public class ProfileServiceTest {
//
//    @Autowired
//    ProfileService profileService;
//
//    @Autowired
//    AccountRepository accountRepository;
//
//    @Autowired
//    ProfileRepository profileRepository;
//
//    private ProfileImageRequest profileImageRequest;
//    private User user;
//
//
//    @BeforeEach
//    void beforeEach() {
//        profileImageRequest = ProfileImageRequest.builder()
//                .imageUrl("profileImage")
//                .build();
//
//        // User 저장
//        user = User.builder().build();
//        User save = accountRepository.save(user);
//
//        // Profile에 User 설정 후 저장
//        Profile profile = Profile.builder().profilePhoto("profileImage").backgroundPhoto("profileImage").build();
//        profile.setUser(save);
//
//        // User에 Profile 설정 후 저장
//        save.setProfile(profile);
//        accountRepository.save(save);
//
//        user = save;
//        // No need to save user again because it is already managed by JPA
//    }
//
//    @Test
//    @DisplayName("프로필 사진 등록/수정")
//    void updateProfileImage() {
//        // when
//        profileService.updateProfileImage(profileImageRequest);
//
//        // then
//        User updatedUser = accountRepository.findById(user.getUserId()).orElse(null);
//        assertNotNull(updatedUser);
//        assertEquals(profileImageRequest.getImageUrl(), updatedUser.getProfile().getProfilePhoto());
//    }
//
//    @Test
//    @DisplayName("배경 사진 등록/수정")
//    void updateBackgroundImage() {
//        // when
//        profileService.updateBackgroundImage(profileImageRequest);
//
//        // then
//        User updatedUser = accountRepository.findById(user.getUserId()).orElse(null);
//        assertNotNull(updatedUser);
//        assertEquals(profileImageRequest.getImageUrl(), updatedUser.getProfile().getBackgroundPhoto());
//    }
//
//}
