//package com.ssafy.A509.like.service;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.junit.jupiter.api.Assertions.assertEquals;
//
//import com.ssafy.A509.account.repository.AccountRepository;
//import com.ssafy.A509.like.dto.CreateLikeRequest;
//import com.ssafy.A509.like.model.CommentLike;
//import com.ssafy.A509.like.repository.CommentLikeRepository;
//import jakarta.transaction.Transactional;
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//
//@ExtendWith(SpringExtension.class)
//@SpringBootTest
//@Transactional
//class CommentLikeServiceTest {
//
//	@Autowired
//	CommentLikeService commentLikeService;
//
//	@Autowired
//	AccountRepository accountRepository;
//
//	@Autowired
//	CommentLikeRepository commentLikeRepository;
//
//	private CreateLikeRequest likeRequest;
//
//	@BeforeEach
//	void beforeEach() {
//		likeRequest = CreateLikeRequest.builder()
//			.commentId(1L)
//			.userId(103L)
//			.build();
//	}
//
//	@AfterEach
//	void afterEach() {
//
//	}
//
//	@Test
//	@DisplayName("댓글 좋아요 생성")
//	void createBoardLike() {
//		// given
//
//		// when
//		Long likeId = commentLikeService.createLike(likeRequest);
//
//		// then
//		CommentLike save = commentLikeRepository.findById(likeId).get();
//		assertEquals(save.getComment().getCommentId(), 1L);
//		assertEquals(save.getUser().getUserId(), 103L);
//	}
//
//	@Test
//	@DisplayName("댓글 좋아요 삭제")
//	void deleteCommentLike() {
//		// given
//		Long likeId = commentLikeService.createLike(likeRequest);
//
//		// when
//		commentLikeService.deleteLike(likeId);
//
//		// then
//		assertThat(commentLikeRepository.findById(likeId)).isEmpty();
//	}
//}