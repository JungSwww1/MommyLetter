package com.ssafy.A509.profile.repository;

import com.ssafy.A509.profile.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Profile findByUserId(Long userId);
//    Profile findByDoctorId(Long doctorId);
}
