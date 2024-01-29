package com.ssafy.A509.board.model;

import com.ssafy.A509.account.model.User;
import com.ssafy.A509.hashtag.model.Hashtag;
import com.ssafy.A509.photo.model.Photo;
import jakarta.persistence.CascadeType;
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
import jakarta.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Board {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long boardId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Photo> photoList = new ArrayList<>();

	@Setter
	@OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Hashtag> hashtagList = new ArrayList<>();

	@Setter
	private String content;

	@Setter
	@Enumerated(EnumType.STRING)
	private Access access;

	@Setter
	@Enumerated(EnumType.STRING)
	private Category category;

	@CreatedDate
	private LocalDateTime createdDate;

	@LastModifiedDate
	private LocalDateTime updatedDate;

	@Builder
	protected Board(String content, Access access, User user, Category category) {
		this.content = content;
		this.access = access;
		this.user = user;
		this.category = category;
	}

	public void addPhoto(Photo photo) {
		this.photoList.add(photo);
		photo.setBoard(this);
	}

	public void addHashtag(Hashtag hashtag) {
		this.hashtagList.add(hashtag);
		hashtag.setBoard(this);
	}
}
