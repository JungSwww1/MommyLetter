package com.ssafy.A509.board.repository;

import com.ssafy.A509.board.model.Board;
import com.ssafy.A509.board.model.Category;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
	List<Board> findAllByUserUserId(Long userId);

	List<Board> findAllByCategory(Category category);
}
