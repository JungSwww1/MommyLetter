package com.ssafy.A509.kafka.config;

import com.ssafy.A509.kafka.dto.KafkaConstants;
import com.ssafy.A509.kafka.dto.KafkaDMRequest;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.JsonDeserializer;

@EnableKafka
@Configuration
@RequiredArgsConstructor
public class KafkaConsumerConfig {

	private final KafkaConstants kafkaConstants;
	@Bean
	public ConcurrentKafkaListenerContainerFactory<String, KafkaDMRequest> kafkaListenerContainerFactory() {
		ConcurrentKafkaListenerContainerFactory<String, KafkaDMRequest> factory = new ConcurrentKafkaListenerContainerFactory<>();
		factory.setConsumerFactory(consumerFactory());
		return factory;
	}

	@Bean
	public ConsumerFactory<String, KafkaDMRequest> consumerFactory() {
		Map<String, Object> consumerProps = new HashMap<>();
		consumerProps.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, kafkaConstants.KAFKA_BROKER);
//		consumerProps.put(ConsumerConfig.GROUP_ID_CONFIG, KafkaConstants.GROUP_ID);
		consumerProps.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
		consumerProps.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class.getName());
		consumerProps.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "latest");
		consumerProps.put(JsonDeserializer.TRUSTED_PACKAGES, "*");


		return new DefaultKafkaConsumerFactory<>(consumerProps);
	}
}
