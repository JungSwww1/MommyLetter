package com.ssafy.A509.like.service;

import com.ssafy.A509.account.model.User;
import com.ssafy.A509.account.repository.AccountRepository;
import com.ssafy.A509.comment.model.Comment;
import com.ssafy.A509.comment.service.CommentService;
import com.ssafy.A509.exception.CustomException;
import com.ssafy.A509.exception.ErrorCode;
import com.ssafy.A509.like.dto.CreateLikeRequest;
import com.ssafy.A509.like.model.CommentLike;
import com.ssafy.A509.like.repository.CommentLikeRepository;
import java.util.NoSuchElementException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

@Service
public class CommentLikeService extends LikeService<CommentService, CommentLikeRepository> {

	public CommentLikeService(AccountRepository accountRepository, CommentService commentService,
		CommentLikeRepository commentLikeRepository) {
		super(accountRepository, commentService, commentLikeRepository);
	}

	@Override
	public void deleteLike(Long commentId, Long userId) {
		likeRepository.findByComment_CommentIdAndUser_UserId(commentId, userId).ifPresentOrElse(likeRepository::delete, () -> {
			throw new CustomException(ErrorCode.NO_SUCH_COMMENT_LIKE);
		});
	}

	@Override
	public Long getLikeCount(Long commentId) {
		return likeRepository.countByComment_CommentId(commentId);
	}

	@Override
	public boolean checkUserLike(Long commentId, Long userId) {
		return likeRepository.existsCommentLikeByComment_CommentIdAndUser_UserId(commentId, userId);
	}

	@Override
	protected Long createLikeObject(CreateLikeRequest likeRequest, User user) {
		if (checkUserLike(likeRequest.getCommentId(), likeRequest.getUserId())) {
			throw new DuplicateKeyException("이미 존재하는 comment_like 입니다");
		}

		Comment comment = service.findById(likeRequest.getCommentId());

		CommentLike commentLike = CommentLike.builder()
			.comment(comment)
			.user(user)
			.build();

		CommentLike save = likeRepository.save(commentLike);
		return save.getId();
	}
}
