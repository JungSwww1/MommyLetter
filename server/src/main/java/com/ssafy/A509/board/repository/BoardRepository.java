package com.ssafy.A509.board.repository;

import com.ssafy.A509.board.model.Access;
import com.ssafy.A509.board.model.Board;
import com.ssafy.A509.board.model.Category;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
	List<Board> findAllByUserUserId(Long userId);

	List<Board> findAllByCategory(Category category);

	List<Board> findAllByAccessOrUserUserIdOrBoardIdInOrderByCreatedDateDesc(Access access, Long userId, List<Long> followerBoardList);

	@Query("SELECT b.boardId FROM Board b JOIN b.user u JOIN Follow f ON u.userId = f.follower.userId WHERE b.access = 'Follower' AND f.following.userId = :userId")
	List<Long> findFollowerBoard(Long userId);

	@Query("SELECT b FROM Board b JOIN b.user u JOIN Follow f ON u.userId = f.follower.userId WHERE b.access = 'Follower' AND f.following.userId = :userId")
	List<Board> findByAccess(Long userId);

	@Query("select b from Board b where b.access = 'All'")
	List<Board> findAllBoard();
}
