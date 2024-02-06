//package com.ssafy.A509.board.service;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.junit.jupiter.api.Assertions.assertEquals;
//
//import com.ssafy.A509.board.dto.CreateBoardRequest;
//import com.ssafy.A509.board.dto.UpdateBoardRequest;
//import com.ssafy.A509.board.model.Access;
//import com.ssafy.A509.board.model.Board;
//import com.ssafy.A509.board.repository.BoardRepository;
//import com.ssafy.A509.hashtag.model.Hashtag;
//import com.ssafy.A509.hashtag.repository.HashtagRepository;
//import jakarta.transaction.Transactional;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Set;
//import java.util.stream.Collectors;
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
//class BoardServiceTest {
//
//	@Autowired
//	BoardService boardService;
//
//	@Autowired
//	BoardRepository boardRepository;
//
//	@Autowired
//	HashtagRepository hashtagRepository;
//
//	private CreateBoardRequest boardRequestSample;
//
//	@BeforeEach
//	@DisplayName("피드 객체 만들기")
//	void beforeEach() {
//		List<String> hashtagList = new ArrayList<>();
////		List<CreatePhotoRequest> photoRequestList = new ArrayList<>();
//
//		// 해시테그 추가
//		hashtagList.add("test1");
//		hashtagList.add("test2");
//		hashtagList.add("test3");
//
//		// 사진 추가
////		CreatePhotoRequest photo = CreatePhotoRequest.builder()
////			.path("우리집")
////			.build();
////		photoRequestList.add(photo);
//
//		// 게시글 생성
//		boardRequestSample = CreateBoardRequest.builder()
//			.access(Access.All)
//			.hashtagList(hashtagList)
////			.photoList(photoRequestList)
//			.content("test")
//			.userId(1L)
//			.build();
//	}
//
//	@Test
//	@DisplayName("피드 생성 테스트")
//	void createBoardTest() {
//		// Given
//		CreateBoardRequest boardRequest = boardRequestSample;
//		// when
//		Long boardId = boardService.createBoard(boardRequest);
//		// then
//		Board board = boardRepository.findById(boardId).get();
//		assertEquals(board.getContent(), "test");
//		assertEquals(board.getAccess(), Access.All);
//		assertEquals(board.getHashtagList().get(0).getContent(), "test1");
//	}
//
//	@Test
//	@DisplayName("피드 수정 테스트")
//	void updateBoardTest() {
//		// Given
//		CreateBoardRequest boardRequest = boardRequestSample;
//		Long boardId = boardService.createBoard(boardRequest);
//		UpdateBoardRequest updateBoardRequest = UpdateBoardRequest.builder()
//			.hashtagList(boardRequest.getHashtagList())
//			.content("수정")
//			.build();
//
//		// when
//		boardService.updateBoard(boardId, updateBoardRequest);
//
//		// then
//		Board board = boardRepository.findById(boardId).get();
//		assertEquals(board.getContent(), "수정");
//	}
//
//	@Test
//	@DisplayName("피드 삭제 테스트")
//	void deleteBoardTest() {
//		// Given
//		CreateBoardRequest boardRequest = boardRequestSample;
//		Long boardId = boardService.createBoard(boardRequest);
//
//		// when
//		boardService.deleteBoard(boardId);
//
//		// then
//		assertThat(boardRepository.findById(boardId)).isEmpty();
//	}
//
//	@Test
//	@DisplayName("해시태그 추가 테스트")
//	void addHashtagTest() {
//		// Given
//		CreateBoardRequest boardRequest = boardRequestSample;
//		Long boardId = boardService.createBoard(boardRequest);
//
//		List<String> hashtagList = boardRequest.getHashtagList();
//		hashtagList.add("addHashtag");
//
//		UpdateBoardRequest updateBoardRequest = UpdateBoardRequest.builder()
//			.content(boardRequest.getContent())
//			.hashtagList(hashtagList)
//			.build();
//
//		// when
//		boardService.updateBoard(boardId, updateBoardRequest);
//
//		// then
//		Board board = boardRepository.findById(boardId).get();
//
//		// Set으로 타입 변경
//		Set<String> hashtagContents = board.getHashtagList().stream().map(Hashtag::getContent)
//			.collect(Collectors.toSet());
//
//		assertThat(hashtagContents.contains("test1")).isTrue();
//		assertThat(hashtagContents.contains("test2")).isTrue();
//		assertThat(hashtagContents.contains("test3")).isTrue();
//		assertThat(hashtagContents.contains("addHashtag")).isTrue();
//	}
//
//
//	@Test
//	@DisplayName("해시태그 삭제 테스트")
//	void deleteHashtagTest() {
//		// Given
//		CreateBoardRequest boardRequest = boardRequestSample;
//		Long boardId = boardService.createBoard(boardRequest);
//
//		Board savedBoard = boardRepository.findById(boardId).get();
//		List<Hashtag> hashtags = savedBoard.getHashtagList();
//
//		// 삭제할 해시태그
//		Hashtag hashtag = hashtags.get(0);
//
//		List<String> hashtagList = boardRequest.getHashtagList();
//		hashtagList.remove(hashtag.getContent());
//
//		UpdateBoardRequest updateBoardRequest = UpdateBoardRequest.builder()
//			.content(boardRequest.getContent())
//			.hashtagList(hashtagList)
//			.build();
//
//		// when
//		boardService.updateBoard(boardId, updateBoardRequest);
//
//		// then
//		Board board = boardRepository.findById(boardId).get();
//		List<Hashtag> newHashtags = board.getHashtagList();
//
//		assertThat(newHashtags.contains(hashtag)).isFalse();
//		assertThat(newHashtags.size()).isEqualTo(2);
//
//		assertThat(hashtagRepository.findAll().contains(hashtag)).isFalse();
//	}
//
//	@Test
//	@DisplayName("해시태그 전체 삭제 테스트")
//	void deleteHashtagAllTest() {
//		// Given
//		CreateBoardRequest boardRequest = boardRequestSample;
//		Long boardId = boardService.createBoard(boardRequest);
//
//		Board savedBoard = boardRepository.findById(boardId).get();
//		// 기존 해시태그
//		List<Hashtag> hashtags = new ArrayList<>(savedBoard.getHashtagList());
//
//		UpdateBoardRequest updateBoardRequest = UpdateBoardRequest.builder()
//			.content(boardRequest.getContent())
//			.hashtagList(null)
//			.build();
//
//		// when
//		boardService.updateBoard(boardId, updateBoardRequest);
//
//		// then
//		Board board = boardRepository.findById(boardId).get();
//		// 새로운 해시태그
//		List<Hashtag> newHashtags = board.getHashtagList();
//
//		assertThat(newHashtags.contains(hashtags.get(0))).isFalse();
//		assertThat(newHashtags.contains(hashtags.get(1))).isFalse();
//		assertThat(newHashtags.contains(hashtags.get(2))).isFalse();
//		assertThat(newHashtags.size()).isEqualTo(0);
//	}
//
//	@Test
//	@DisplayName("해시태그 추가 및 삭제 테스트")
//	void updateHashtagTest() {
//		// Given
//		CreateBoardRequest boardRequest = boardRequestSample;
//		Long boardId = boardService.createBoard(boardRequest);
//
//		List<String> hashtagList = boardRequest.getHashtagList();
//		// 해시태그 삭제
//		hashtagList.remove("test1");
//		// 해시태그 추가
//		hashtagList.add("addHashtag");
//
//		UpdateBoardRequest updateBoardRequest = UpdateBoardRequest.builder()
//			.content(boardRequest.getContent())
//			.hashtagList(hashtagList)
//			.build();
//
//		// when
//		boardService.updateBoard(boardId, updateBoardRequest);
//
//		// then
//		Board board = boardRepository.findById(boardId).get();
//
//		// Set으로 타입 변경
//		Set<String> hashtagContents = board.getHashtagList().stream().map(Hashtag::getContent)
//			.collect(Collectors.toSet());
//
//		assertThat(hashtagContents.contains("test1")).isFalse();
//		assertThat(hashtagContents.contains("test2")).isTrue();
//		assertThat(hashtagContents.contains("test3")).isTrue();
//		assertThat(hashtagContents.contains("addHashtag")).isTrue();
//	}
//}