package com.ssafy.A509.diary.dto;

import com.ssafy.A509.diary.model.Emotion;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UpdateDiaryRequest {
	@NotNull
  	private Long diaryId;

  	@NotBlank
	private String content;

  	@NotNull
	private int emoji;

	@NotNull
	private LocalDateTime createdDate;

	private List<String> photoList;

<<<<<<< PATCH SET (c36cdb :art: Feat: Divide Emoticons into 5 Different Tables)
<<<<<<< PATCH SET (f73de4 :art: Feat: Divide Emoticons into 5 Different Tables)
	private UpdateEmoticonRequest emoticonRequest;

=======
>>>>>>> BASE      (064008 :bug: Fix: fix board, comment controller and add explanation)
=======
	private List<Emotion> emotionList;

>>>>>>> BASE      (12c0ba :art: Feat: Add Emoticon Features)
}
