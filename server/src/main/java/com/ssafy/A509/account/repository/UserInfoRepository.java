package com.ssafy.A509.account.repository;

import com.ssafy.A509.account.model.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
}
