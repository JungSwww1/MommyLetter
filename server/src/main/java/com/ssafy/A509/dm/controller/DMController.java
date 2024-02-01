package com.ssafy.A509.dm.controller;

import com.ssafy.A509.dm.dto.DMRequest;
import com.ssafy.A509.dm.dto.DMResponse;
import com.ssafy.A509.dm.dto.KafkaDMRequest;
import com.ssafy.A509.dm.dto.OtherUserResponse;
import com.ssafy.A509.dm.service.DMService;
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
@Slf4j
@Tag(name = "DM", description = "DM API")
@RequestMapping("/dm")
public class DMController {

	private final KafkaTemplate<String, KafkaDMRequest> kafkaTemplate;
	private final DMService dmService;
	private final ModelMapper modelMapper;

	// url/app/message로 들어오면 topic/public을 구독하고 있는 사람에게 전송
//	@MessageMapping("/message")
//	@Payload
	@PostMapping
	public void sendMessage(@Valid @RequestBody DMRequest dmRequest) {
		log.info("content = {}", dmRequest.getContent());
		String roomId = getRoomId(dmRequest);
		dmRequest.createTimeStamp();
		dmRequest.setRoomId(roomId);
		dmService.saveDm(dmRequest);
		KafkaDMRequest kafkaDMRequest = modelMapper.map(dmRequest, KafkaDMRequest.class);
		kafkaTemplate.send(roomId, kafkaDMRequest);
	}


	@GetMapping("/{userId}")
	public ResponseEntity<List<OtherUserResponse>> getDMList(@NotNull @PathVariable Long userId) {
		return ResponseEntity.ok(dmService.findAllDMList(userId));
	}

	@GetMapping("/{user1Id}/{user2Id}")
	public ResponseEntity<List<DMResponse>> getListByUsers(@NotNull @PathVariable Long user1Id,
		@NotNull @PathVariable Long user2Id) {
		return ResponseEntity.ok(dmService.getListByUsers(user1Id, user2Id));
	}

	private String getRoomId(DMRequest dmRequest) {
		return "chat_" + Math.min(dmRequest.getSenderId(), dmRequest.getReceiverId()) + "_" + Math.max(
			dmRequest.getSenderId(), dmRequest.getReceiverId());
	}
}
