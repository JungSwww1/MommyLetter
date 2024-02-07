package com.ssafy.A509.like.model;

import com.ssafy.A509.account.model.User;
import com.ssafy.A509.board.model.Board;
import jakarta.persistence.AttributeOverride;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "board_like_id"))
public class BoardLike extends Like {

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "board_id")
	private Board board;

	@Builder
	protected BoardLike(Board board, User user) {
		this.board = board;
		super.user = user;
	}
}
