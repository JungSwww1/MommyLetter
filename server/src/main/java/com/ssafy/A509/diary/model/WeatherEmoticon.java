package com.ssafy.A509.diary.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@EntityListeners(AuditingEntityListener.class)
public class WeatherEmoticon {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long weatherId;

	@Setter
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "emoticon_id")
	private Emoticon emoticon;

	@Enumerated(EnumType.STRING)
	private Weather weather;

	@Builder
	public WeatherEmoticon(Emoticon emoticon, Weather weather) {
		this.emoticon = emoticon;
		this.weather = weather;
	}
}
