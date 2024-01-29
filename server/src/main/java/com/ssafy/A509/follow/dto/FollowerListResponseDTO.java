package com.ssafy.A509.follow.dto;

import com.ssafy.A509.profile.dto.BoardProfileResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class FollowerListResponseDTO {
    private List<BoardProfileResponse> followers;

}
