package com.ssafy.A509.dm.repository;

import com.ssafy.A509.dm.model.ChatGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ChatGroupRepository extends JpaRepository<ChatGroup, Long> {
	@Query("SELECT SIZE(c.users) FROM ChatGroup c WHERE c.chatGroupId = :chatGroupId")
	int countChatUserByChatGroupId(Long chatGroupId);
}
