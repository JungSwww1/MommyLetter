package com.ssafy.A509.like.service;

import com.ssafy.A509.account.model.User;
import com.ssafy.A509.account.repository.AccountRepository;
import com.ssafy.A509.comment.model.Comment;
import com.ssafy.A509.comment.service.CommentService;
import com.ssafy.A509.like.dto.CreateLikeRequest;
import com.ssafy.A509.like.model.CommentLike;
import com.ssafy.A509.like.repository.CommentLikeRepository;
import java.util.NoSuchElementException;
import org.springframework.stereotype.Service;

@Service
public class CommentLikeService extends LikeService<CommentService, CommentLikeRepository> {

	public CommentLikeService(AccountRepository accountRepository, CommentService commentService,
		CommentLikeRepository commentLikeRepository) {
		super(accountRepository, commentService, commentLikeRepository);
	}

	@Override
	public void deleteLike(Long id) {
		likeRepository.findById(id).ifPresentOrElse(likeRepository::delete, () -> {
			throw new NoSuchElementException("no such comment-like");
		});
	}

	@Override
	public Long getLikeCount(Long id) {
		return likeRepository.countByComment_CommentId(id);
	}

	@Override
	public boolean checkUserLike(Long id, Long userId) {
		return likeRepository.existsCommentLikeByComment_CommentIdAndUser_UserId(id, userId);
	}

	@Override
	protected Long createLikeObject(CreateLikeRequest likeRequest, User user) {
		Comment comment = service.findById(likeRequest.getCommentId());

		CommentLike commentLike = CommentLike.builder()
			.comment(comment)
			.user(user)
			.build();

		CommentLike save = likeRepository.save(commentLike);
		return save.getComment().getCommentId();
	}
}
