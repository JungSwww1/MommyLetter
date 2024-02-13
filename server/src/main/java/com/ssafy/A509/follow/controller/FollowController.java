package com.ssafy.A509.follow.controller;

import com.ssafy.A509.follow.dto.FollowRequestDTO;
import com.ssafy.A509.follow.dto.FollowerListResponseDTO;
import com.ssafy.A509.follow.dto.FollowingListResponseDTO;
import com.ssafy.A509.follow.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/follows")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FollowController {
    private final FollowService followService;

    //팔로우하기
    @PostMapping("/{userId}")
    public ResponseEntity<Void> followUser(@PathVariable Long userId, @RequestBody FollowRequestDTO followRequestDTO) {
        followService.followUser(userId, followRequestDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //언팔로우
    @PostMapping("/unfollow/{userId}")
    public ResponseEntity<Void> unfollowUser(@PathVariable Long userId, @RequestBody FollowRequestDTO followRequestDTO) {
        followService.unfollowUser(userId, followRequestDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    //팔로워 유저 리스트 조회
    @GetMapping("/follower/{userId}")
    public ResponseEntity<FollowerListResponseDTO> getFollowerList(@PathVariable Long userId) {
        FollowerListResponseDTO followerList = followService.getFollowerList(userId);
        return new ResponseEntity<>(followerList, HttpStatus.OK);
    }


    //팔로잉 유저 리스트 조회
    @GetMapping("/following/{userId}")
    public ResponseEntity<FollowingListResponseDTO> getFollowingList(@PathVariable Long userId) {
        FollowingListResponseDTO followingList = followService.getFollowingList(userId);
        return new ResponseEntity<>(followingList, HttpStatus.OK);
    }

    @GetMapping("/check/follow/{user1Id}/{user2Id}")
    public ResponseEntity<Boolean> isFollow(@PathVariable Long user1Id, @PathVariable Long user2Id) {
        boolean check = false;
        check =
			followService.isAlreadyFollowing(user1Id, user2Id) || (followService.isAlreadyFollowing(user2Id, user1Id));
        return new ResponseEntity<>(check, HttpStatus.OK);
    }
}
