package com.ssafy.A509.kafka.config;

import com.ssafy.A509.kafka.dto.KafkaConstants;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;
import org.springframework.kafka.core.KafkaAdmin;

@Configuration
@RequiredArgsConstructor
public class KafkaTopicConfig {

	private final KafkaConstants kafkaConstants;

	@Bean
	public KafkaAdmin kafkaAdmin() {
		Map<String, Object> configs = new HashMap<>();
		configs.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, kafkaConstants.KAFKA_BROKER);
		// metadata 요청 타임아웃
		configs.put(AdminClientConfig.REQUEST_TIMEOUT_MS_CONFIG, 5000);
		// 브로커 연결 유지 최대 시간
		configs.put(AdminClientConfig.CONNECTIONS_MAX_IDLE_MS_CONFIG, 60000);
		return new KafkaAdmin(configs);
	}

	@Bean
	public NewTopic dmTopic() {
		return TopicBuilder.name("dm")
			.partitions(100)
			.replicas(1)
			.build();
	}

	@Bean
	public NewTopic groupChatTopic() {
		return TopicBuilder.name("group-chat")
			.partitions(100)
			.replicas(2)
			.build();
	}

	@Bean
	public NewTopic enterTopic() {
		return TopicBuilder.name("enter")
			.partitions(100)
			.replicas(1)
			.build();
	}

	@Bean
	public NewTopic groupLeaveTopic() {
		return TopicBuilder.name("leave")
			.partitions(100)
			.replicas(1)
			.build();
	}
}
