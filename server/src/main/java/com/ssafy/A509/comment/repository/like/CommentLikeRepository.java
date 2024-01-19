package com.ssafy.A509.comment.repository.like;

import com.ssafy.A509.comment.model.like.CommentLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {
	Long countByComment_CommentId(Long commentId);

	boolean existsCommentLikeByComment_CommentIdAndUser_UserId(Long commentId, Long userId);
}
