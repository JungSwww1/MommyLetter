package com.ssafy.A509.dm.dto;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class KafkaDMRequest implements Serializable {

	Long senderId;
	String content;
	String roomId;
	String createdDate;
}
