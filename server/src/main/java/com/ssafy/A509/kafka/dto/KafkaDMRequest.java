package com.ssafy.A509.kafka.dto;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KafkaDMRequest implements Serializable {

	Long senderId;
	Long receiverId;
	Long chatGroupId;
	String content;
	String createdDate;
}
