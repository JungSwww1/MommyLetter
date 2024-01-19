package com.ssafy.A509.board.repository.like;

import com.ssafy.A509.board.model.like.BoardLike;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface BoardLikeRepository extends JpaRepository<BoardLike, Long> {
	Long countByBoard_BoardId(@Param("boardId") Long boardId);

	Optional<BoardLike> findByBoard_BoardIdAndUser_UserId(@Param("boardId") Long boardId, @Param("userId") Long userId);
}
