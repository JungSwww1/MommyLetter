package com.ssafy.A509.comment.service.like;

import com.ssafy.A509.account.model.User;
import com.ssafy.A509.account.repository.AccountRepository;
import com.ssafy.A509.comment.dto.like.CreateCommentLikeRequest;
import com.ssafy.A509.comment.model.Comment;
import com.ssafy.A509.comment.model.like.CommentLike;
import com.ssafy.A509.comment.repository.like.CommentLikeRepository;
import com.ssafy.A509.comment.service.CommentService;
import jakarta.transaction.Transactional;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CommentLikeService {
	private final CommentService commentService;

	private final CommentLikeRepository commentLikeRepository;
	private final AccountRepository accountRepository;

	@Transactional
	public Long createCommentLike(CreateCommentLikeRequest commentLikeRequest) {
		User user = accountRepository.findById(commentLikeRequest.getUserId())
			.orElseThrow(() -> new NoSuchElementException("no such user"));

		Comment comment = commentService.findById(commentLikeRequest.getCommentId());

		CommentLike commentLike = CommentLike.builder()
			.comment(comment)
			.user(user)
			.build();

		CommentLike save = commentLikeRepository.save(commentLike);
		return save.getComment().getCommentId();
	}

	public Long getCommentLikeCount(Long commentId) {
		return commentLikeRepository.countByComment_CommentId(commentId);
	}

	public boolean commentLikeByUser(Long commentId, Long userId) {
		return commentLikeRepository.existsCommentLikeByComment_CommentIdAndUser_UserId(commentId, userId);
	}

	@Transactional
	public void deleteCommentLike(Long commentLikeId) {
		commentLikeRepository.findById(commentLikeId).ifPresentOrElse(commentLikeRepository::delete, () -> {
			throw new NoSuchElementException("no such comment-like");
		});
	}
}
