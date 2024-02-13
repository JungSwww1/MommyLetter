
package com.ssafy.A509.profile.service;
import com.ssafy.A509.account.model.Role;
import com.ssafy.A509.exception.CustomException;
import com.ssafy.A509.exception.ErrorCode;
import com.ssafy.A509.photo.service.PhotoService;
import com.ssafy.A509.profile.dto.*;
import com.ssafy.A509.profile.model.*;
import com.ssafy.A509.profile.repository.*;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;
@Service
public class ProfileServiceImpl implements ProfileService {
    private final ProfileRepository profileRepository;
    private final PhotoService photoService;
    public ProfileServiceImpl(ProfileRepository profileRepository,
        PhotoService photoService) {
        this.profileRepository = profileRepository;
        this.photoService = photoService;
    }
    @Override
    @Transactional
    public String updateProfileImage(Long userId, MultipartFile profileImage) {
        Profile profile = profileRepository.findByUserId(userId);
        if (profile != null) {
            if(profile.getProfilePhoto() != null){
                photoService.deleteFile(profile.getProfilePhoto());
            }
            profile.setProfilePhoto(photoService.getImagePath(profileImage, "profile/profile-image"));
            profileRepository.save(profile);
            return profile.getProfilePhoto();
        }
        else{ // Handle the case where the user profile is not found
            throw new CustomException(ErrorCode.NO_SUCH_PROFILE,
                "userId: " + userId);
        }
    }
    @Override
    @Transactional
    public String updateBackgroundImage(Long userId, MultipartFile backgroundImage) {
        Profile profile = profileRepository.findByUserId(userId);
        if (profile != null) {
            if(profile.getBackgroundPhoto()!=null){
                photoService.deleteFile(profile.getBackgroundPhoto());
            }
            // 배경 이미지 URL 설정
            profile.setBackgroundPhoto(photoService.getImagePath(backgroundImage, "profile/background-image"));
            // 프로필 저장
            profileRepository.save(profile);
            return profile.getBackgroundPhoto();
        }
        else{ // Handle the case where the user profile is not found
            throw new CustomException(ErrorCode.NO_SUCH_PROFILE,
                "userId: " + userId);
        }
    }
    @Override
    public UserProfileResponse getUserProfile(Long userId) {
        Profile profile = profileRepository.findByUserId(userId);
        if (profile != null && profile.getUser().getRole() == Role.Common){
            UserProfileResponse profileResponse = new UserProfileResponse();
            profileResponse.setUserId(profile.getUser().getUserId());
            profileResponse.setNickname(profile.getUser().getNickname());
            profileResponse.setIntro(profile.getUser().getIntro());
            profileResponse.setProfilePhoto(profile.getProfilePhoto());
            profileResponse.setBackgroundPhoto(profile.getBackgroundPhoto());
            profileResponse.setFollower(profile.getUser().getFollowerList().size());
            profileResponse.setFollowing(profile.getUser().getFollowingList().size());
            return profileResponse;
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
    public DoctorProfileResponse getDoctorProfile(Long doctorId) {
        Profile doctorProfile = profileRepository.findByUserDoctorDoctorId(doctorId);
        if (doctorProfile != null && doctorProfile.getUser().getRole() == Role.Doctor) {
            return getDoctorProfileResponse(doctorProfile);
        } else {
            throw new CustomException(ErrorCode.NO_SUCH_DOCTOR, "doctorId: " + doctorId);
        }
    }
    private static DoctorProfileResponse getDoctorProfileResponse(Profile doctorProfile) {
        DoctorProfileResponse profileResponse = new DoctorProfileResponse();
        profileResponse.setUserId(doctorProfile.getUserId());
        profileResponse.setDoctorId(doctorProfile.getUser().getDoctor().getDoctorId());
        profileResponse.setName(doctorProfile.getUser().getDoctor().getName());
        profileResponse.setHistoryList(doctorProfile.getUser().getDoctor().getHistories());
        profileResponse.setLocation(doctorProfile.getUser().getDoctor().getLocation());
        profileResponse.setDepartment(doctorProfile.getUser().getDoctor().getDepartment());
        profileResponse.setValidTime(doctorProfile.getUser().getDoctor().getValidTime());
        profileResponse.setProfilePhoto(doctorProfile.getProfilePhoto());
        profileResponse.setBackgroundPhoto(doctorProfile.getBackgroundPhoto());
        return profileResponse;
    }
    private static DoctorProfileCardsResponse getDoctorProfileCardsResponse(Profile doctorProfile) {
        return DoctorProfileCardsResponse.builder()
            .doctorId(doctorProfile.getUser().getDoctor().getDoctorId())
            .name(doctorProfile.getUser().getDoctor().getName())
            .location(doctorProfile.getUser().getDoctor().getLocation())
            .department(doctorProfile.getUser().getDoctor().getDepartment())
            .profilePhoto(doctorProfile.getProfilePhoto())
            .build();
    }
}
