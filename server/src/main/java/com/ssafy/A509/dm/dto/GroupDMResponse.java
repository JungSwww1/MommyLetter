package com.ssafy.A509.dm.dto;

import com.ssafy.A509.account.dto.AccountSimpleReponse;
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
	AccountSimpleReponse host;
	Set<AccountSimpleReponse> users;
	LocalDateTime createdDate;
}
