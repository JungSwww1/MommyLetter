package com.ssafy.A509.board.dto;

import com.ssafy.A509.account.model.User;
import com.ssafy.A509.board.model.Access;
import com.ssafy.A509.hashtag.dto.CreateHashtagRequest;
import com.ssafy.A509.photo.dto.CreatePhotoRequest;
import jakarta.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreateBoardRequest {
	@NotBlank
	private Long userId;
	@NotBlank
	private String content;
	@NotBlank
	private Access access;
	private List<CreateHashtagRequest> hashTagList;
	private List<CreatePhotoRequest> photoList;
}
