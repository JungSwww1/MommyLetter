package com.ssafy.A509.dm.repository;

import com.ssafy.A509.dm.model.DirectMessage;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DMRepository extends MongoRepository<DirectMessage, Long> {
	Optional<DirectMessage> findById(String id);
	List<DirectMessage> findAllByChatGroupIdAndCreatedDateGreaterThanEqual(Long chatGroupId, LocalDateTime createdDate);

	Optional<DirectMessage> findFirstByChatGroupIdOrderByCreatedDateDesc(Long chatGroupId);

	@Query("{ 'chatGroupId': ?0, 'createdDate': { $lt: ?1 }, 'unreadCount': { $ne: 0 } }")
	List<DirectMessage> findChatsBeforeDateAndGroupWithUnreadCount(Long chatGroupId, LocalDateTime createdDate);

	List<DirectMessage> getDmListByChatGroupId(Long chatGroupId, Sort sort);

	@Query("{'$or': [{'senderId': ?0, 'receiverId': ?1}, {'senderId': ?1, 'receiverId': ?0}]}")
	List<DirectMessage> getDmListByUsers(Long user1Id, Long user2Id, Sort sort);


}
