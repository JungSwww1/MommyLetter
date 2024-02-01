<<<<<<< PATCH SET (c36cdb :art: Feat: Divide Emoticons into 5 Different Tables)
<<<<<<< PATCH SET (f73de4 :art: Feat: Divide Emoticons into 5 Different Tables)
package com.ssafy.A509.diary.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import java.util.ArrayList;
import java.util.List;
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
public class Emoticon {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long emoticonId;

	@Setter
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "diary_id")
	private Diary diary;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "emoticon_id")
	private List<EmotionEmoticon> emotionEmoticon = new ArrayList<>();

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "emoticon_id")
	private List<FamilyEmoticon> familyEmoticon = new ArrayList<>();

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "emoticon_id")
	private List<HealthEmoticon> healthEmoticon = new ArrayList<>();

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "emoticon_id")
	private List<PeopleEmoticon> peopleEmoticon = new ArrayList<>();

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "emoticon_id")
	private List<WeatherEmoticon> weatherEmoticon = new ArrayList<>();

	@Builder
	public Emoticon(Diary diary) {
		this.diary = diary;
	}

	public void addEmotion(EmotionEmoticon emotion){
		this.emotionEmoticon.add(emotion);
		emotion.setEmoticon(this);
	}
	public void addFamily(FamilyEmoticon family){
		this.familyEmoticon.add(family);
		family.setEmoticon(this);
	}
	public void addHealth(HealthEmoticon health){
		this.healthEmoticon.add(health);
		health.setEmoticon(this);
	}
	public void addPeople(PeopleEmoticon people){
		this.peopleEmoticon.add(people);
		people.setEmoticon(this);
	}
	public void addWeather(WeatherEmoticon weather){
		this.weatherEmoticon.add(weather);
		weather.setEmoticon(this);
	}
}
=======
>>>>>>> BASE      (064008 :bug: Fix: fix board, comment controller and add explanation)
=======
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
public class Emoticon {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long emoticonId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "diary_id")
	@Setter
	private Diary diary;

	@Enumerated(EnumType.STRING)
	private Emotion emotion;

	@Builder
	public Emoticon(Diary diary, Emotion emotion) {
		this.diary = diary;
		this.emotion = emotion;
	}
}
>>>>>>> BASE      (12c0ba :art: Feat: Add Emoticon Features)
