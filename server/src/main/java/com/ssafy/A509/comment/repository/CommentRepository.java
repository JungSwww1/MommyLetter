package com.ssafy.A509.comment.repository;

import com.ssafy.A509.comment.model.Comment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
	List<Comment> findAllByBoardBoardId(Long id);
}
