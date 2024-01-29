package com.ssafy.A509.board.dto;

import com.ssafy.A509.board.model.Access;
import com.ssafy.A509.photo.dto.CreatePhotoRequest;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BoardResponse {
	private Long boardId;
	// 이 부분 나중에 userDto 생성되면 수정
	private Long userId;
	private String content;
	private Access access;
	private LocalDateTime createdDate;
	private LocalDateTime updatedDate;
	private List<String> hashTagList;
	private List<CreatePhotoRequest> photoList;
}
