// ProfileService.java
package com.ssafy.A509.profile.service;

import com.ssafy.A509.account.model.Role;
import com.ssafy.A509.profile.dto.*;
import com.ssafy.A509.profile.repository.ProfileRepository;

import java.util.List;

public interface ProfileService {


    void updateProfileImage(ProfileImageRequest profileImageRequest);

    void updateBackgroundImage(ProfileImageRequest profileImageRequest);

    UserProfileResponse getUserProfile(Long userId);

    List<DoctorProfileCardsResponse> getAllDoctorProfileCards();

    DoctorProfileResponse getDoctorProfile(Long userId);

}
