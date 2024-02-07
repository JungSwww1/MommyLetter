package com.ssafy.A509.unreadNotification.repository;

import com.ssafy.A509.unreadNotification.model.UnreadNotification;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UnreadNotificationRepository extends JpaRepository<UnreadNotification, Long> {
    List<UnreadNotification> findAllByUserId(Long userId);

    UnreadNotification findByUserIdAndDmId(Long userId, String dmId);
}