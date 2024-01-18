package com.ssafy.A509.profile.repository;

import com.ssafy.A509.profile.model.DoctorProfile;
import com.ssafy.A509.profile.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorProfileRepository extends JpaRepository<DoctorProfile, Long> {
    DoctorProfile findByDoctorId(Long doctorId);

    // 추가적인 메서드가 필요하다면 여기에 작성
}
