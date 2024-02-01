package com.ssafy.A509.like.repository;

import com.ssafy.A509.like.model.CommentLike;
import java.util.Optional;

public interface CommentLikeRepository extends LikeRepository<CommentLike> {

	Optional<CommentLike> findByComment_CommentIdAndUser_UserId(Long commentId, Long userId);

	Long countByComment_CommentId(Long commentId);

	boolean existsCommentLikeByComment_CommentIdAndUser_UserId(Long commentId, Long userId);
}
