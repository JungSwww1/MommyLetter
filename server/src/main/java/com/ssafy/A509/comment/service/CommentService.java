package com.ssafy.A509.comment.service;

import com.ssafy.A509.account.model.User;
import com.ssafy.A509.account.repository.AccountRepository;
import com.ssafy.A509.board.service.BoardService;
import com.ssafy.A509.comment.dto.CommentResponse;
import com.ssafy.A509.comment.dto.CreateCommentRequest;
import com.ssafy.A509.comment.model.Comment;
import com.ssafy.A509.comment.repository.CommentRepository;
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
			.orElseThrow(() -> new NoSuchElementException("No value present"));

		Comment buildComment = Comment.builder()
			.content(commentRequest.getContent())
			.user(user)
			.board(boardService.findById(commentRequest.getBoardId()))
			.build();

		return commentRepository.save(buildComment).getCommentId();
	}

	public List<CommentResponse> getBoardComment(Long boardId) {
		return commentRepository.findAllByBoardBoardId(boardId).stream()
			.map(comment -> modelMapper.map(comment, CommentResponse.class)).collect(
				Collectors.toList());
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
		return commentRepository.findById(commentId).orElseThrow(() -> new NoSuchElementException("no such comment"));
	}
}