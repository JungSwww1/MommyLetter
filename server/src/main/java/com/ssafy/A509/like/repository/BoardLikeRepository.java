package com.ssafy.A509.like.repository;

import com.ssafy.A509.like.model.BoardLike;
import java.util.Optional;
import org.springframework.data.repository.query.Param;

public interface BoardLikeRepository extends LikeRepository<BoardLike> {

	Optional<BoardLike> findByBoard_BoardIdAndUser_UserId(Long boardId, Long userId);
	Long countByBoard_BoardId(@Param("boardId") Long boardId);
	boolean existsBoardLikeByBoard_BoardIdAndUser_UserId(@Param("boardId") Long boardId, @Param("userId") Long userId);
}
