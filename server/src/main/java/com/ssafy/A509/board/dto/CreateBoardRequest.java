package com.ssafy.A509.board.dto;

import com.ssafy.A509.board.model.Access;
import com.ssafy.A509.board.model.Category;
import com.ssafy.A509.photo.dto.CreatePhotoRequest;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreateBoardRequest {
	@NotNull
	private Long userId;
	@NotBlank
	private String content;
	@NotNull
	private Access access;
	@NotNull
	private Category category;
	private List<String> hashtagList;
	private List<CreatePhotoRequest> photoList;
}
