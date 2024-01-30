package com.ssafy.A509.dm.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupDMRequest {

	@NotNull
	Long senderId;
	@NotBlank
	String content;

	Long roomId;

	String createdDate;

	public void createTimeStamp() {
		this.createdDate = LocalDateTime.now().toString();
	}
}
