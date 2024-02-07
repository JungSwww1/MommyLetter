package com.ssafy.A509.dm.repository;

import com.ssafy.A509.dm.model.DirectMessage;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DMRepository extends MongoRepository<DirectMessage, Long> {
	Optional<DirectMessage> findById(String id);
	@Query("{'$or': [{'senderId': ?0}, {'receiverId': ?0}]}")
	List<DirectMessage> findByUserId(Long userId);

	List<DirectMessage> findBySenderId(Long senderId);
	List<DirectMessage> findByReceiverId(Long senderId);

	List<DirectMessage> findAllByChatGroupId(String chatGroupId);

	@Query("{'$or': [{'senderId': ?0, 'receiverId': ?1}, {'senderId': ?1, 'receiverId': ?0}]}")
	List<DirectMessage> getDmListByUsers(Long user1Id, Long user2Id, Sort sort);

}
