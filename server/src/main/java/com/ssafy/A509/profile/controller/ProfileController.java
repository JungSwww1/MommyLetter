// ProfileController.java
package com.ssafy.A509.profile.controller;

import com.ssafy.A509.profile.dto.*;
import com.ssafy.A509.profile.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/profiles")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @PostMapping("/profileImage/{userId}")
    public ResponseEntity<Void> updateProfileImage(@RequestBody ProfileImageRequest profileImageRequest) {
        profileService.updateProfileImage(profileImageRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/backgroundImage/{userId}")
    public ResponseEntity<Void> updateBackgroundImage(@RequestBody ProfileImageRequest profileImageRequest) {
        profileService.updateBackgroundImage(profileImageRequest);
        return ResponseEntity.ok().build();
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

    @GetMapping("/doctors/{userId}")
    public ResponseEntity<DoctorProfileResponse> getDoctorProfile(@PathVariable Long userId) {
        DoctorProfileResponse doctorProfile = profileService.getDoctorProfile(userId);
        return ResponseEntity.ok(doctorProfile);
    }
}
