package com.ssafy.A509.dm.repository;

import com.ssafy.A509.dm.model.DirectMessage;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DMRepository extends JpaRepository<DirectMessage, Long> {

	@Query("SELECT dm " +
		"FROM DirectMessage dm " +
		"WHERE dm.sender.userId = :userId OR dm.receiver.userId = :userId " +
		"GROUP BY dm.receiver.userId " +
		"ORDER BY dm.createdDate DESC")
	List<DirectMessage> findRecentMessagesByUserId(Long userId);

	@Query("SELECT dm FROM DirectMessage dm " +
		"WHERE (dm.sender.userId = :user1Id AND dm.receiver.userId = :user2Id) " +
		"   OR (dm.sender.userId = :user2Id AND dm.receiver.userId = :user1Id)" +
		"order by dm.createdDate DESC")
	List<DirectMessage> getDmListByUsers(Long user1Id, Long user2Id);
}
