//package com.ssafy.A509.comment.service;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.assertj.core.api.Assertions.assertThat;
//
//import com.ssafy.A509.comment.dto.CreateCommentRequest;
//import com.ssafy.A509.comment.model.Comment;
//import com.ssafy.A509.comment.repository.CommentRepository;
//import jakarta.transaction.Transactional;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//
//@ExtendWith({SpringExtension.class, MockitoExtension.class})
//@SpringBootTest
//@Transactional
//class CommentServiceTest {
//
//	@Autowired
//	CommentService commentService;
//
//	@Autowired
//	CommentRepository commentRepository;
//	private CreateCommentRequest commentRequestSample;
//
//	@BeforeEach
//	void beforeEach() {
//		commentRequestSample = CreateCommentRequest.builder()
//			.boardId(1L)
//			.userId(101L)
//			.content("test")
//			.build();
//	}
//
//	@Test
//	@DisplayName("댓글 작성 테스트")
//	void createCommentTest() {
//		// given
//		CreateCommentRequest commentRequest = commentRequestSample;
//
//		// when
//		Long commentId = commentService.createComment(commentRequest);
//		Comment comment = commentRepository.findById(commentId).get();
//
//		// then
//		assertEquals(comment.getContent(), "test");
//		assertThat(comment.getCreatedDate()).isNotNull();
//	}
//
//	@Test
//	@DisplayName("댓글 삭제 테스트")
//	void deleteCommentTest() {
//		// given
//		CreateCommentRequest commentRequest = commentRequestSample;
//		Long commentId = commentService.createComment(commentRequest);
//		Comment comment = commentRepository.findById(commentId).get();
//
//		// when
//		commentService.deleteComment(commentId);
//
//		// then
//		assertThat(commentRepository.findById(comment.getCommentId())).isEmpty();
//	}
//
//	@Test
//	@DisplayName("댓글 수정 테스트")
//	void updateCommentTest() {
//		// given
//		CreateCommentRequest commentRequest = commentRequestSample;
//		Long commentId = commentService.createComment(commentRequest);
//		Comment comment = commentRepository.findById(commentId).get();
//		String content = "수정";
//
//		// when
//		commentService.updateComment(commentId, content);
//
//		// then
//		Comment updatedComment = commentRepository.findById(comment.getCommentId()).get();
//		assertEquals(updatedComment.getCommentId(), commentId);
//		assertEquals(updatedComment.getContent(), "수정");
//		assertThat(updatedComment.getUpdatedDate()).isNotNull();
//	}
//
//}