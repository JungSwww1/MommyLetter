package com.ssafy.A509.dm.controller;

import com.ssafy.A509.dm.dto.DMRequest;
import com.ssafy.A509.dm.dto.DMResponse;
import com.ssafy.A509.dm.service.DMService;
import com.ssafy.A509.kafka.dto.KafkaDMRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.util.List;
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


	// url/app/message로 들어오면 sub/dm을 구독하고 있는 사람에게 전송
//	@MessageMapping("/message")
//	@Payload
	@PostMapping
	@Operation(
		summary = "dm 보내기",
		description = "메세지를 받아서 kafka에 송신, db에 저장"
	)
	public void sendMessage(@Valid @RequestBody DMRequest dmRequest) {
		log.info("dmRequest={}", dmRequest);
		String roomId = getRoomId(dmRequest);
		dmRequest.createTimeStamp();
		dmRequest.setRoomId(roomId);
		KafkaDMRequest kafkaDMRequest = modelMapper.map(dmRequest, KafkaDMRequest.class);
		kafkaTemplate.send("dm", dmRequest.getReceiverId().toString(), kafkaDMRequest);
		log.info("send={}", dmRequest);
		dmService.saveDm(dmRequest);
	}

	@Operation(
		summary = "dm 시작",
		description = "dm이 시작되면 chatGroup 생성(향후 참여 중인 채팅방 관리)"
	)
	@GetMapping("/{user1Id}/{user2Id}")
	public ResponseEntity<Void> startDM(@NotNull @PathVariable Long user1Id, @NotNull @PathVariable Long user2Id) {
		String roomId = getMessageKey(user1Id, user2Id);
		dmService.createChatRoom(user1Id, user2Id, roomId);
		return ResponseEntity.ok().build();
	}

	//	@GetMapping("/{userId}")
//	public ResponseEntity<List<DMResponse>> getDMList(@NotNull @PathVariable Long userId) {
//		return ResponseEntity.ok(dmService.findAllDMList(userId));
//	}
	@Operation(
		summary = "채팅 기록 조회",
		description = "dm 채팅 기록 조회"
	)
	@GetMapping("/list/{user1Id}/{user2Id}")
	public ResponseEntity<List<DMResponse>> getListByUsers(@NotNull @PathVariable Long user1Id,
		@NotNull @PathVariable Long user2Id) {
		return ResponseEntity.ok(dmService.getListByUsers(user1Id, user2Id));
	}


	private String getRoomId(DMRequest dmRequest) {
		return "chat_" + Math.min(dmRequest.getSenderId(), dmRequest.getReceiverId()) + "_" + Math.max(
			dmRequest.getSenderId(), dmRequest.getReceiverId());
	}

	private String getMessageKey(Long user1Id, Long user2Id) {
		return "chat_" + Math.min(user1Id, user2Id) + "_" + Math.max(
			user1Id, user2Id);
	}
}
