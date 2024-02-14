// ProfileService.java
package com.ssafy.A509.profile.service;

import com.ssafy.A509.account.model.Role;
import com.ssafy.A509.profile.dto.*;
import com.ssafy.A509.profile.repository.ProfileRepository;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface ProfileService {

    String updateProfileImage(Long userId, MultipartFile profileImage);

    String updateBackgroundImage(Long userId, MultipartFile backgroundImage);

    UserProfileResponse getUserProfile(Long userId);

    List<DoctorProfileCardsResponse> getAllDoctorProfileCards();

    DoctorProfileResponse getDoctorProfile(Long doctorId);

    DoctorProfileResponse getUserDoctorProfile(Long userId);
}
