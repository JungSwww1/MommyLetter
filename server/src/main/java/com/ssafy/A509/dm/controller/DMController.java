package com.ssafy.A509.dm.controller;

import com.ssafy.A509.dm.dto.DMRequest;
import com.ssafy.A509.dm.dto.DMResponse;
import com.ssafy.A509.dm.dto.DMUserResponse;
import com.ssafy.A509.dm.service.DMService;
import com.ssafy.A509.kafka.dto.KafkaDMRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@Tag(name = "DM", description = "1:1 채팅 API")
@Slf4j
@RequestMapping("/dm")
public class DMController {

	private final KafkaTemplate<String, KafkaDMRequest> kafkaTemplate;
	private final DMService dmService;
	private final ModelMapper modelMapper;


	//
//	@MessageMapping("/message")
//	@Payload
	@PostMapping
	@Operation(
		summary = "dm 보내기",
		description = """
			메세지를 받아서 kafka에 송신, db에 저장
			DMRequest로는 sender, receiver, content, chatGroupId만 채워서 보내주면 됨
			url/app/message로 보내야 함"""
	)
	public void sendMessage(@Valid @RequestBody DMRequest dmRequest) {
		log.info("dmRequest={}", dmRequest);
		dmRequest.createTimeStamp();
		KafkaDMRequest kafkaDMRequest = modelMapper.map(dmRequest, KafkaDMRequest.class);
		kafkaTemplate.send("dm", dmRequest.getReceiverId().toString(), kafkaDMRequest);
		dmService.saveDm(dmRequest);
	}

	@Operation(
		summary = "dm 시작",
		description = "dm이 시작되면 chatGroup 생성(향후 참여 중인 채팅방 리스트 관리에 사용)"
	)
	@GetMapping("/start/{user1Id}/{user2Id}")
	public ResponseEntity<Void> startDM(@NotNull @PathVariable Long user1Id, @NotNull @PathVariable Long user2Id) {
		String chatGroupName = getMessageKey(user1Id, user2Id);
		dmService.createChatGroup(user1Id, user2Id, chatGroupName);
		return ResponseEntity.ok().build();
	}

	@Operation(
		summary = "채팅방에 입장",
		description = "채팅방에 들어오면 실시간으로 알림을 보냄"
	)
	@GetMapping("/enter/{userId}/{otherUserId}")
	public ResponseEntity<Void> enterDM(@PathVariable Long userId, @PathVariable Long otherUserId) {
		KafkaDMRequest dmRequest = KafkaDMRequest.builder()
			.senderId(userId)
			.receiverId(otherUserId)
			.content(userId + "_ENTER_CHATTING_TO_" + otherUserId)
			.build();

		kafkaTemplate.send("enter", otherUserId.toString(), dmRequest);
		return ResponseEntity.ok().build();
	}

	@Operation(
		summary = "채팅방에서 퇴장",
		description = "채팅방에서 나가면 실시간으로 알림을 보냄"
	)
	@GetMapping("/leave/{userId}/{otherUserId}")
	public ResponseEntity<Void> leaveDM(@PathVariable Long userId, @PathVariable Long otherUserId) {
		KafkaDMRequest dmRequest = KafkaDMRequest.builder()
			.senderId(userId)
			.receiverId(otherUserId)
			.content(userId + "_LEAVE_CHATTING_TO_" + otherUserId)
			.build();

		kafkaTemplate.send("leave", otherUserId.toString(), dmRequest);
		return ResponseEntity.ok().build();
	}

	@Operation(
		summary = "참여 중인 dm 리스트 조회",
		description = "1:1 채팅 리스트 조회"
	)
	@GetMapping("/{userId}")
	public ResponseEntity<Set<DMUserResponse>> getDMChatGroupList(@NotNull @PathVariable Long userId) {
		return ResponseEntity.ok(dmService.findAllDMGroupList(userId));
	}

	@Operation(
		summary = "채팅 기록 조회",
		description = "사용자 아이디 2개로 dm 채팅 기록 조회"
	)
	@GetMapping("/list/{user1Id}/{user2Id}")
	public ResponseEntity<List<DMResponse>> getListByUsers(@NotNull @PathVariable Long user1Id,
		@NotNull @PathVariable Long user2Id) {
		return ResponseEntity.ok(dmService.getListByUsers(user1Id, user2Id));
	}

	private String getMessageKey(Long user1Id, Long user2Id) {
		return "chat_" + Math.min(user1Id, user2Id) + "_" + Math.max(
			user1Id, user2Id);
	}
}
