package com.ssafy.A509.kafka.config;

import com.ssafy.A509.kafka.dto.KafkaConstants;
import com.ssafy.A509.kafka.dto.KafkaDMRequest;
import java.util.HashMap;
import java.util.Map;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;
import org.springframework.kafka.support.serializer.JsonSerializer;

@EnableKafka
@Configuration
public class KafkaProducerConfig {

	@Bean
	public ProducerFactory<String, KafkaDMRequest> producerFactory() {
		return new DefaultKafkaProducerFactory<>(producerConfigs());
	}

	@Bean
	public Map<String, Object> producerConfigs() {
		Map<String, Object> props = new HashMap<>();
		props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, KafkaConstants.KAFKA_BROKER);
		// Leader Replica와 다른 1개의 복제가 받으면 성공
		props.put(ProducerConfig.ACKS_CONFIG, "all");
		props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
		props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
		return props;
	}

	@Bean
	public KafkaTemplate<String, KafkaDMRequest> kafkaTemplate() {
		return new KafkaTemplate<>(producerFactory());
	}
}
