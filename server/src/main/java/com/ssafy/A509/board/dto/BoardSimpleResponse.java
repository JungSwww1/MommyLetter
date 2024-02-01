package com.ssafy.A509.board.dto;

import com.ssafy.A509.photo.model.Photo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BoardSimpleResponse {
	private Long boardId;
	private Photo photo;
}
