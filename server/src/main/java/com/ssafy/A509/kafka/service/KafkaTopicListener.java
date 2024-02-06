package com.ssafy.A509.kafka.service;

import com.ssafy.A509.kafka.dto.KafkaDMRequest;
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

	@KafkaListener(id = "dmListener", topics = "dm")
	public void listenToDMTopic(ConsumerRecord<String, KafkaDMRequest> record) {
		log.info("dm listen ={}", record);
		//  프론트로 보내줘야 함
		messagingTemplate.convertAndSend("/sub/dm", record.value());
	}

	@KafkaListener(id = "groupChatListener", topics = "group-chat")
	public void listenToGroupChatTopic(ConsumerRecord<String, KafkaDMRequest> record) {
		log.info("group-chat listen ={}", record);
		messagingTemplate.convertAndSend("/sub/groupChat", record.value());
	}
}