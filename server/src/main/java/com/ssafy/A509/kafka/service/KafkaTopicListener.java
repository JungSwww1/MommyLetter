package com.ssafy.A509.kafka.service;

import com.ssafy.A509.dm.model.DirectMessage;
import com.ssafy.A509.dm.service.DMService;
import com.ssafy.A509.kafka.dto.KafkaDMRequest;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaTopicListener {

	private final SimpMessagingTemplate messagingTemplate;
	private final Map<Long, List<Long>> onlineUserMap = new ConcurrentHashMap<>();
	private final DMService dmService;

	@KafkaListener(id = "enterListener", topics = "enter")
	public void listenToEnterTopic(ConsumerRecord<String, KafkaDMRequest> record) {
		log.info("enter listen ={}", record);
		Long chatGroupId = record.value().getChatGroupId();
		messagingTemplate.convertAndSend("/sub/enter/" + chatGroupId, record.value());
		/*
		현재 채팅방에 입장 처리
		 */
		enterChatRoom(record, chatGroupId);

		/*
		채팅방 입장으로 읽음 표시가 업데이트 되는 채팅 목록과 숫자
		 */
		setUnreadCount(record, chatGroupId);
	}

	@KafkaListener(id = "leaveListener", topics = "leave")
	public void listenToLeaveTopic(ConsumerRecord<String, KafkaDMRequest> record) {
		log.info("leave listen ={}", record);
		Long chatGroupId = record.value().getChatGroupId();
		messagingTemplate.convertAndSend("/sub/leave/" + chatGroupId, record.value());

		/*
		접속 중인 유저에서 삭제
		 */
		List<Long> userList = onlineUserMap.get(chatGroupId);
		userList.remove(record.value().getSenderId());
		System.out.println("userList = " + userList);
	}

	@KafkaListener(id = "dmListener", topics = "dm")
	public void listenToDMTopic(ConsumerRecord<String, KafkaDMRequest> record) {
		log.info("dm listen ={}", record);
		Long chatGroupId = record.value().getChatGroupId();
		messagingTemplate.convertAndSend("/sub/dm/" + chatGroupId, record.value());

		/*
		발신된 메세지의 unreadCount를 접속 중인 유저만큼 삭제
		 */
		setUnreadCount(chatGroupId);
	}

	@KafkaListener(id = "groupChatListener", topics = "group-chat")
	public void listenToGroupChatTopic(ConsumerRecord<String, KafkaDMRequest> record) {
		log.info("group-chat listen ={}", record);
		Long chatGroupId = record.value().getChatGroupId();
		messagingTemplate.convertAndSend("/sub/groupChat/" + chatGroupId, record.value());

		/*
		발신된 메세지의 unreadCount를 접속 중인 유저만큼 삭제
		 */
		setUnreadCount(chatGroupId);
	}

	private void enterChatRoom(ConsumerRecord<String, KafkaDMRequest> record, Long chatGroupId) {
		List<Long> userList;
		if (!onlineUserMap.containsKey(chatGroupId)) {
			userList = new ArrayList<>();
			onlineUserMap.put(chatGroupId, userList);

		} else {
			userList = onlineUserMap.get(chatGroupId);
		}
		userList.add(record.value().getSenderId());
		System.out.println("enter userList = " + userList);
	}

	private void setUnreadCount(ConsumerRecord<String, KafkaDMRequest> record, Long chatGroupId) {
		LocalDateTime time = LocalDateTime.now();

		List<DirectMessage> chatList = dmService.getChatListByTime(chatGroupId, time);
		Map<String, Integer> readMap = dmService.readMessageAndGetList(chatList, record.value().getSenderId());
		log.info("readMap ={}", readMap);
		messagingTemplate.convertAndSend("/sub/readCount/" + chatGroupId, readMap);
	}

	private void setUnreadCount(Long chatGroupId) {
		DirectMessage directMessage = dmService.getLatestMessage(chatGroupId);
		List<Long> userList = onlineUserMap.get(chatGroupId);
		System.out.println("userList = " + userList);
		;
		int cnt = dmService.readMessageAndGetCount(directMessage, userList);
		System.out.println(cnt);
		Map<String, Integer> readMap = new HashMap<>();
		readMap.put(directMessage.getId(), cnt);

		log.info("readMap ={}", readMap);
		messagingTemplate.convertAndSend("/sub/readCount/" + chatGroupId, readMap);
	}
}