package com.ssafy.A509.kafka.dto;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class KafkaConstants {
    public static final String GROUP_ID = "group";

    @Value("${kafka.broker}")
    public String KAFKA_BROKER;

    @Bean
    public String KAFKA_BROKER() {
        return KAFKA_BROKER;
    }
}