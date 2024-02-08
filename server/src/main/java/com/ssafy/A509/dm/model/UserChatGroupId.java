package com.ssafy.A509.dm.model;

import jakarta.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class UserChatGroupId implements Serializable {

	private Long userId;

	private Long chatGroupId;

}