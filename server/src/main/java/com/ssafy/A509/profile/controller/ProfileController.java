// ProfileController.java
package com.ssafy.A509.profile.controller;

import com.ssafy.A509.profile.dto.*;
import com.ssafy.A509.profile.service.ProfileService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/profiles")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @PostMapping("/profileImage/{userId}")
    public ResponseEntity<String> updateProfileImage(@PathVariable Long userId, @RequestParam
        MultipartFile profileImage) {
        return new ResponseEntity<>(profileService.updateProfileImage(userId, profileImage),
            HttpStatus.OK);
    }


    @PostMapping("/backgroundImage/{userId}")
    public ResponseEntity<String> updateBackgroundImage(@PathVariable Long userId, @RequestParam
        MultipartFile backgroundImage) {

        return new ResponseEntity<>(profileService.updateBackgroundImage(userId, backgroundImage), HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserProfileResponse> getUserProfile(@PathVariable Long userId) {
        UserProfileResponse profile = profileService.getUserProfile(userId);
        return ResponseEntity.ok(profile);
    }

    @GetMapping("/doctors")
    public ResponseEntity<List<DoctorProfileCardsResponse>> getAllDoctorProfileCards() {
        List<DoctorProfileCardsResponse> doctorProfileCards = profileService.getAllDoctorProfileCards();
        return ResponseEntity.ok(doctorProfileCards);
    }

    @Operation(
        summary = "DoctorId를 통해 profile 얻기",
        description = "{doctorId}에 대응하는 DoctorProfile 반환"
    )
    @GetMapping("/doctors/{doctorId}")
    public ResponseEntity<DoctorProfileResponse> getDoctorProfile(@PathVariable Long doctorId) {
        DoctorProfileResponse doctorProfile = profileService.getDoctorProfile(doctorId);
        return ResponseEntity.ok(doctorProfile);
    }

    @Operation(
        summary = "User가 Doctor이면 profile 얻기",
        description = "{userId}에 대응하는 DoctorProfile 반환"
    )
    @GetMapping("/doctors/user/{userId}")
    public ResponseEntity<DoctorProfileResponse> getUserDoctorProfile(@PathVariable Long userId) {
        DoctorProfileResponse doctorProfile = profileService.getUserDoctorProfile(userId);
        return ResponseEntity.ok(doctorProfile);
    }
}
