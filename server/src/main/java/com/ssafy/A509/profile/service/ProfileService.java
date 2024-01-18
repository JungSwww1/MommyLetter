// ProfileService.java
package com.ssafy.A509.profile.service;

import com.ssafy.A509.profile.dto.*;
import com.ssafy.A509.profile.repository.UserProfileRepository;

import java.util.List;

public interface ProfileService {


    void updateProfileImage(Long userId, ProfileImageRequest profileImageRequest);

    void updateBackgroundImage(Long userId, ProfileImageRequest profileImageRequest);

    UserProfileResponse getUserProfile(Long userId);

    List<DoctorProfileCardsResponse> getAllDoctorProfileCards();

    DoctorProfileResponse getDoctorProfile(Long doctorId);

}
