package com.ssafy.A509.dm.dto;

import com.ssafy.A509.account.dto.AccountSimpleResponse;
import java.time.LocalDateTime;
import java.util.Set;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class GroupDMResponse {
	String dpGroupName;
	AccountSimpleResponse host;
	Set<AccountSimpleResponse> users;
	LocalDateTime createdDate;
}
