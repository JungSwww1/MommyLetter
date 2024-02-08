package com.ssafy.A509.dm.repository;

import com.ssafy.A509.dm.model.UserChatGroup;
import com.ssafy.A509.dm.model.UserChatGroupId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserChatGroupRepository extends JpaRepository<UserChatGroup, UserChatGroupId> {

	UserChatGroup findByUserUserIdAndChatGroupChatGroupId(Long userId, Long chatGroupId);
}
