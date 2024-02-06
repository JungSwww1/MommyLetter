package com.ssafy.A509.unreadNotification.service;

import com.ssafy.A509.unreadNotification.dto.NotificationDto;
import com.ssafy.A509.unreadNotification.model.UnreadNotification;
import com.ssafy.A509.unreadNotification.repository.UnreadNotificationRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UnreadNotificationService {

	private final UnreadNotificationRepository notificationRepository;
    private final ModelMapper modelMapper;

	@Transactional
	public void markAsRead(Long userId, String dmId) {
		UnreadNotification notification = notificationRepository.findByUserIdAndDmId(userId, dmId);
		notificationRepository.delete(notification);
	}

	public List<NotificationDto> getUnread(Long userId) {
        List<UnreadNotification> list = notificationRepository.findAllByUserId(userId);
        return list.stream().map(this::getNotiDto).toList();
    }

    private NotificationDto getNotiDto(UnreadNotification notification) {
        return modelMapper.map(notification, NotificationDto.class);
    }

    @Transactional
    public void createUnread(Long userId, String dmId) {
        UnreadNotification unreadNotification = UnreadNotification.builder()
            .userId(userId)
            .dmId(dmId)
            .build();

        notificationRepository.save(unreadNotification);
    }
}