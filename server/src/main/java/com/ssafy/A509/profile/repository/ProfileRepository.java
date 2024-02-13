package com.ssafy.A509.profile.repository;

import com.ssafy.A509.profile.model.Profile;
import com.ssafy.A509.account.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Profile findByUserId(Long userId);
    List<Profile> findByUser_Role(Role role);
//    Profile findByDoctorId(Long doctorId);
    Profile findByUserDoctorDoctorId(Long doctorId);
}
