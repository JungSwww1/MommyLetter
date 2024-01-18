package com.ssafy.A509.profile.service;

import com.ssafy.A509.profile.dto.*;
import com.ssafy.A509.profile.model.*;
import com.ssafy.A509.profile.repository.*;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProfileServiceImpl implements ProfileService {
    private final UserProfileRepository userProfileRepository;
    private final DoctorProfileRepository doctorProfileRepository;
    private final ModelMapper modelMapper;

    public ProfileServiceImpl(UserProfileRepository userProfileRepository, DoctorProfileRepository doctorProfileRepository, ModelMapper modelMapper) {
        this.userProfileRepository = userProfileRepository;
        this.doctorProfileRepository = doctorProfileRepository;
        this.modelMapper = modelMapper;
    }


    @Override
    public void updateProfileImage(Long userId, ProfileImageRequest profileImageRequest) {

    }

    @Override
    public void updateBackgroundImage(Long userId, ProfileImageRequest profileImageRequest) {

    }

    @Override
    public UserProfileResponse getUserProfile(Long userId) {
        System.out.println(userId);
        UserProfile userProfile = userProfileRepository.findByUserId(userId);

        if (userProfile != null) {
            return modelMapper.map(userProfile, UserProfileResponse.class);
        } else {
            return null;
        }
    }

    @Override
    public List<DoctorProfileCardsResponse> getAllDoctorProfileCards() {
        List<DoctorProfile> doctorProfiles = doctorProfileRepository.findAll();
        return doctorProfiles.stream()
                .map(doctorProfile -> modelMapper.map(doctorProfile, DoctorProfileCardsResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public DoctorProfileResponse getDoctorProfile(Long doctorId) {
        DoctorProfile doctorProfile = doctorProfileRepository.findByDoctorId(doctorId);

        if (doctorProfile != null) {
            return modelMapper.map(doctorProfile, DoctorProfileResponse.class);
        } else {
            return null;
        }
    }

}
