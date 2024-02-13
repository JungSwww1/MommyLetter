package com.ssafy.A509.follow.service;

import com.ssafy.A509.follow.dto.FollowRequestDTO;
import com.ssafy.A509.follow.dto.FollowerListResponseDTO;
import com.ssafy.A509.follow.dto.FollowingListResponseDTO;

public interface FollowService {
    void followUser(Long followerUserId, FollowRequestDTO followRequestDTO);
    void unfollowUser(Long followerUserId, FollowRequestDTO followRequestDTO);
    FollowerListResponseDTO getFollowerList(Long userId);
    FollowingListResponseDTO getFollowingList(Long userId);

    boolean isAlreadyFollowing(Long followerUserId, Long followingUserId);
}