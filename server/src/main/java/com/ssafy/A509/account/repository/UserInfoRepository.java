package com.ssafy.A509.account.repository;

import com.ssafy.A509.account.model.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
	UserInfo findByUserUserId(Long userId);
}
