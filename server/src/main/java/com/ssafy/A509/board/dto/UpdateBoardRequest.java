package com.ssafy.A509.board.dto;

import com.ssafy.A509.board.model.Access;
import com.ssafy.A509.board.model.Category;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UpdateBoardRequest {
	private String content;
	private Access access;
	private Category category;
	private List<String> hashtagList;
}
