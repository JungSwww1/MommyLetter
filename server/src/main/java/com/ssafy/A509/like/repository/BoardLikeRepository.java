package com.ssafy.A509.like.repository;

import com.ssafy.A509.like.model.BoardLike;
import org.springframework.data.repository.query.Param;

public interface BoardLikeRepository extends LikeRepository<BoardLike> {
	Long countByBoard_BoardId(@Param("boardId") Long boardId);
	boolean existsBoardLikeByBoard_BoardIdAndUser_UserId(@Param("boardId") Long boardId, @Param("userId") Long userId);
}
