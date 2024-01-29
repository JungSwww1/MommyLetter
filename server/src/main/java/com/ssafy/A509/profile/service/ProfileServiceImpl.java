package com.ssafy.A509.profile.service;

import com.ssafy.A509.account.model.Role;
import com.ssafy.A509.profile.dto.*;
import com.ssafy.A509.profile.model.*;
import com.ssafy.A509.profile.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProfileServiceImpl implements ProfileService {
    private final ProfileRepository profileRepository;

    public ProfileServiceImpl(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }


    @Override
    @Transactional
    public void updateProfileImage(ProfileImageRequest profileImageRequest) {
        Profile profile = profileRepository.findByUserId(profileImageRequest.getUserId());

        if (profile != null) {
            profile.setProfilePhoto(profileImageRequest.getImageUrl());
            profileRepository.save(profile);
        }
        // Handle the case where the user profile is not found
    }

    @Override
    @Transactional
    public void updateBackgroundImage(ProfileImageRequest profileImageRequest) {
        Profile profile = profileRepository.findByUserId(profileImageRequest.getUserId());

        if (profile != null) {
            // 배경 이미지 URL 설정
            profile.setBackgroundPhoto(profileImageRequest.getImageUrl());
            // 프로필 저장
            profileRepository.save(profile);

        }
        // Handle the case where the user profile is not found
    }

    @Override
    public UserProfileResponse getUserProfile(Long userId) {
        Profile profile = profileRepository.findByUserId(userId);

        if (profile != null && profile.getUser().getRole() == Role.Common) {
            UserProfileResponse profileResponse = new UserProfileResponse();
            profileResponse.setUserId(profile.getUser().getUserId());
            profileResponse.setNickname(profile.getUser().getNickname());
            profileResponse.setIntro(profile.getUser().getIntro());
            profileResponse.setProfilePhoto(profile.getProfilePhoto());
            profileResponse.setBackgroundPhoto(profile.getBackgroundPhoto());
            return profileResponse;
//            return modelMapper.map(profile, UserProfileResponse.class);
        } else {
            System.out.println("일반사용자가 아님");
            return null;
        }
    }

    public List<DoctorProfileCardsResponse> getAllDoctorProfileCards() {
        List<Profile> doctorProfiles = profileRepository.findByUser_Role(com.ssafy.A509.account.model.Role.Doctor);

        List<DoctorProfileCardsResponse> doctorCards = new ArrayList<>();

        for (Profile doctorProfile : doctorProfiles) {
            DoctorProfileCardsResponse doctorCard = getDoctorProfileCardsResponse(doctorProfile);
            doctorCards.add(doctorCard);
        }

        return doctorCards;
    }

    @Override
    public DoctorProfileResponse getDoctorProfile(Long userId) {
        Profile doctorProfile = profileRepository.findByUserId(userId);

        if (doctorProfile != null && doctorProfile.getUser().getRole() == Role.Doctor) {
            return getDoctorProfileResponse(doctorProfile);
        } else {
            System.out.println("의사아님");
            return null;
        }
    }

    private static DoctorProfileResponse getDoctorProfileResponse(Profile doctorProfile) {
        DoctorProfileResponse profileResponse = new DoctorProfileResponse();
        profileResponse.setUserId(doctorProfile.getUserId());
        profileResponse.setDoctorId(doctorProfile.getUser().getDoctor().getDoctorId());
        profileResponse.setName(doctorProfile.getUser().getDoctor().getName());
        profileResponse.setIntro(doctorProfile.getUser().getIntro());
        profileResponse.setLocation(doctorProfile.getUser().getDoctor().getLocation());
        profileResponse.setDepartment(doctorProfile.getUser().getDoctor().getDepartment());
        profileResponse.setValidTime(doctorProfile.getUser().getDoctor().getValidTime());
        profileResponse.setProfilePhoto(doctorProfile.getProfilePhoto());
        profileResponse.setBackgroundPhoto(doctorProfile.getBackgroundPhoto());
        return profileResponse;
    }

    private static DoctorProfileCardsResponse getDoctorProfileCardsResponse(Profile doctorProfile) {
        return DoctorProfileCardsResponse.builder()
                .name(doctorProfile.getUser().getDoctor().getName())
                .location(doctorProfile.getUser().getDoctor().getLocation())
                .department(doctorProfile.getUser().getDoctor().getDepartment())
                .profilePhoto(doctorProfile.getProfilePhoto())
                .build();
    }

}