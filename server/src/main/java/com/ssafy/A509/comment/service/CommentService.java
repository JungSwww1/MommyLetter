package com.ssafy.A509.comment.service;

import com.ssafy.A509.board.repository.BoardRepository;
import com.ssafy.A509.comment.dto.CommentResponse;
import com.ssafy.A509.comment.dto.CreateCommentRequest;
import com.ssafy.A509.comment.dto.UpdateCommentRequest;
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

	private final CommentRepository commentRepository;
	private final BoardRepository boardRepository;
	private final ModelMapper modelMapper;

	@Transactional
	public CommentResponse createComment(CreateCommentRequest commentRequest) {
		Comment buildComment = Comment.builder()
			.content(commentRequest.getContent())
			.user(commentRequest.getUser())
			.board(boardRepository.findById(commentRequest.getBoardId())
				.orElseThrow())
			.build();

		Comment comment = commentRepository.save(buildComment);
		return getCommentResponse(comment);
	}

	private CommentResponse getCommentResponse(Comment comment) {
		return modelMapper.map(comment, CommentResponse.class);
	}

	public List<CommentResponse> getBoardComment(Long boardId) {
		return commentRepository.findAllByBoardBoardId(boardId).stream()
			.map(comment -> modelMapper.map(comment, CommentResponse.class)).collect(
				Collectors.toList());
	}

	@Transactional
	public void updateComment(UpdateCommentRequest commentRequest) {
		commentRepository.findById(commentRequest.getCommentId())
			.ifPresentOrElse(comment -> {
				comment.setCommentContent(commentRequest.getContent());
				commentRepository.save(comment);
			}, () -> {
				throw new NoSuchElementException("No value present");
			});
	}

	@Transactional
	public void deleteComment(Long id) {
		commentRepository.findById(id)
			.ifPresentOrElse(commentRepository::delete, () -> {
				throw new NoSuchElementException("No value present");
			});
	}
}
