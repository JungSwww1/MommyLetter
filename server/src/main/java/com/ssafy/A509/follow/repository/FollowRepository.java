package com.ssafy.A509.follow.repository;

import com.ssafy.A509.follow.model.Follow;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    List<Follow> findByFollowerUserId(Long followerUserId);
    List<Follow> findByFollowingUserId(Long followingUserId);
    Optional<Follow> findByFollowerUserIdAndFollowingUserId(Long followerUserId, Long followingUserId);
}