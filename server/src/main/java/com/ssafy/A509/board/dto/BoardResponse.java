package com.ssafy.A509.board.dto;

import com.ssafy.A509.account.dto.AccountSimpleResponse;
import com.ssafy.A509.board.model.Access;
import com.ssafy.A509.board.model.Category;
import com.ssafy.A509.hashtag.dto.HashtagResponse;
import com.ssafy.A509.photo.dto.CreatePhotoRequest;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoardResponse {
	private AccountSimpleResponse accountSimpleReponse = new AccountSimpleResponse();
	private Long boardId;
	private String content;
	private Access access;
	private Category category;
	private LocalDateTime createdDate;
	private LocalDateTime updatedDate;
	private List<HashtagResponse> hashTagList;
	private List<CreatePhotoRequest> photoList;
}
