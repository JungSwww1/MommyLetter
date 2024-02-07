package com.ssafy.A509.kafka.dto;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class KafkaDMRequest implements Serializable {

	Long senderId;
	Long receiverId;
	String content;
	String roomId;
	String createdDate;
}
