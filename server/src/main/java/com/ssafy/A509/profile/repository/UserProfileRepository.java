package com.ssafy.A509.profile.repository;

import com.ssafy.A509.profile.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
//    UserProfile findByUserId(Long userId);

    @Query(value = "SELECT * FROM user WHERE user_id = :userId", nativeQuery = true)
    UserProfile findByUserId(@Param("userId") Long userId);

    // 추가적인 메서드가 필요하다면 여기에 작성
}
