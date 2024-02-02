//package com.ssafy.A509.like.service;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.junit.jupiter.api.Assertions.assertEquals;
//
//import com.ssafy.A509.account.repository.AccountRepository;
//import com.ssafy.A509.like.dto.CreateLikeRequest;
//import com.ssafy.A509.like.model.BoardLike;
//import com.ssafy.A509.like.repository.BoardLikeRepository;
//import jakarta.transaction.Transactional;
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
//public class BoardLikeServiceTest {
//
//	@Autowired
//	BoardLikeService boardLikeService;
//
//	@Autowired
//	AccountRepository accountRepository;
//
//	@Autowired
//	BoardLikeRepository boardLikeRepository;
//
//	private CreateLikeRequest likeRequest;
//
//	@BeforeEach
//	void beforeEach() {
//		likeRequest = CreateLikeRequest.builder()
//			.boardId(1L)
//			.userId(103L)
//			.build();
//	}
//
//	@Test
//	@DisplayName("피드 좋아요 생성")
//	void createBoardLike() {
//		// given
//
//		// when
//		Long likeId = boardLikeService.createLike(likeRequest);
//
//		// then
//		BoardLike save = boardLikeRepository.findById(likeId).get();
//		assertEquals(save.getBoard().getBoardId(), 1L);
//		assertEquals(save.getUser().getUserId(), 103L);
//	}
//
//	@Test
//	@DisplayName("피드 좋아요 삭제")
//	void deleteBoardLike() {
//		// given
//		Long likeId = boardLikeService.createLike(likeRequest);
//
//		// when
//		boardLikeService.deleteLike(likeId);
//
//		// then
//		assertThat(boardLikeRepository.findById(likeId)).isEmpty();
//	}
//}
