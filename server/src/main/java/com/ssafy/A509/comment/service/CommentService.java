package com.ssafy.A509.comment.service;

import com.ssafy.A509.account.model.User;
import com.ssafy.A509.account.repository.AccountRepository;
import com.ssafy.A509.board.service.BoardService;
import com.ssafy.A509.comment.dto.CommentResponse;
import com.ssafy.A509.comment.dto.CreateCommentRequest;
import com.ssafy.A509.comment.model.Comment;
import com.ssafy.A509.comment.repository.CommentRepository;
import com.ssafy.A509.exception.CustomException;
import com.ssafy.A509.exception.ErrorCode;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CommentService {

	private final BoardService boardService;

	private final CommentRepository commentRepository;
	private final AccountRepository accountRepository;

	private final ModelMapper modelMapper;

	@Transactional
	public Long createComment(CreateCommentRequest commentRequest) {
		User user = accountRepository.findById(commentRequest.getUserId())
			.orElseThrow(() -> new CustomException(ErrorCode.NO_COMMENT_USER));

		Comment buildComment = Comment.builder()
			.content(commentRequest.getContent())
			.user(user)
			.board(boardService.findById(commentRequest.getBoardId()))
			.build();

		return commentRepository.save(buildComment).getCommentId();
	}

	public List<CommentResponse> getBoardComment(Long boardId) {
//		return commentRepository.findAllByBoardBoardId(boardId).stream()
//			.map(comment -> modelMapper.map(comment, CommentResponse.class)).collect(
//				Collectors.toList());
		return commentRepository.findAllByBoardBoardId(boardId).stream()
				.map(comment -> {
					CommentResponse response = new CommentResponse();
					response.setCommentId(comment.getCommentId());
					response.setNickname(comment.getUser().getNickname());
					response.setUserId(comment.getUser().getUserId());
					response.setContent(comment.getContent());
					response.setCreatedDate(comment.getCreatedDate());
					response.setUpdatedDate(comment.getUpdatedDate());
					return response;
				})
				.collect(Collectors.toList());
	}

	@Transactional
	public void updateComment(Long commentId, String content) {
		Comment comment = findById(commentId);
		comment.setCommentContent(content);
		commentRepository.save(comment);
	}

	@Transactional
	public void deleteComment(Long commentId) {
		commentRepository.delete(findById(commentId));
	}

	public Comment findById(Long commentId) {
		return commentRepository.findById(commentId).orElseThrow(()
			-> new CustomException(ErrorCode.NO_SUCH_COMMENT));
	}
}
