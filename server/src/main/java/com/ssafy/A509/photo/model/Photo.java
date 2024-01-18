package com.ssafy.A509.photo.model;

import com.ssafy.A509.board.model.Board;
import jakarta.annotation.Nullable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class Photo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long photoId;

	private String path;

	private int size;

	@Setter
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "board_id")
	@Nullable
	private Board board;

//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "diary_id")
//	@Nullable
//	private Diary diary;

	@CreatedDate
	@Column(updatable = false)
	private LocalDateTime createdDate;

	@LastModifiedDate
	private LocalDateTime updatedDate;

	@Builder
	protected Photo(String path, int size) {
		this.path = path;
		this.size = size;
	}
}
