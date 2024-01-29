package com.ssafy.A509.like.repository;

import com.ssafy.A509.like.model.CommentLike;

public interface CommentLikeRepository extends LikeRepository<CommentLike> {

	Long countByComment_CommentId(Long commentId);

	boolean existsCommentLikeByComment_CommentIdAndUser_UserId(Long commentId, Long userId);
}
