package com.ssafy.A509.config;

import org.modelmapper.ModelMapper;
import org.modelmapper.config.Configuration.AccessLevel;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

	@Bean
	public ModelMapper modelMapper() {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration()
			// private 이어도 접근할 수 있음
			.setFieldAccessLevel(AccessLevel.PRIVATE)
			// 필드명 같으면 자동 매핑 처리
			.setFieldMatchingEnabled(true);

		return modelMapper;
	}
}
