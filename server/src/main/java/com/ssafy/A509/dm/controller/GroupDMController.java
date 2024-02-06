package com.ssafy.A509.dm.controller;

import com.ssafy.A509.dm.dto.GroupDMRequest;
import com.ssafy.A509.dm.dto.GroupDMResponse;
import com.ssafy.A509.dm.service.GroupDMService;
import com.ssafy.A509.kafka.dto.KafkaDMRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@Tag(name = "GroupChat", description = "그룹채팅 API")
@RequestMapping("/dm/group")
public class GroupDMController {

	private final KafkaTemplate<String, KafkaDMRequest> kafkaTemplate;
	private final GroupDMService groupDMService;
	private final ModelMapper modelMapper;

	// url/pub/message로 들어오면 sub/groupChat을 구독하고 있는 사람에게 전송
//	@MessageMapping("/message")
//	@Payload
	@Operation(
		summary = "그룹 채팅 발신",
		description = "kafka 채팅 송신, db 저장"
	)
	@PostMapping
	public void sendMessageToGroup(@Valid @RequestBody GroupDMRequest groupDMRequest) {
		groupDMRequest.createTimeStamp();
		KafkaDMRequest kafkaDMRequest = modelMapper.map(groupDMRequest, KafkaDMRequest.class);
		kafkaDMRequest.setRoomId(groupDMRequest.getRoomId().toString());
		kafkaTemplate.send("group-chat", kafkaDMRequest.getRoomId(), kafkaDMRequest);
		groupDMService.saveGroupDm(groupDMRequest);
	}

	@Operation(
		summary = "채팅방 리스트 조회",
		description = "참여 중인 채팅방 리스트 조회"
	)
	@GetMapping("/list/{userId}")
	public ResponseEntity<Set<GroupDMResponse>> groupListByUser(@PathVariable Long userId) {
		return ResponseEntity.ok(groupDMService.getGroupList(userId));
	}

	@Operation(
		summary = "채팅 조회",
		description = "채팅방의 채팅 목록 조회"
	)
	@GetMapping("/{groupId}")
	public ResponseEntity<List<GroupDMRequest>> getGroupDM(@PathVariable Long groupId) {
		return ResponseEntity.ok(groupDMService.getListByGroupId(groupId));
	}

	@Operation(
		summary = "채팅방 참여",
		description = "채팅방 인원에 추가"
	)
	@GetMapping("/enter/{groupId}/{userId}")
	public ResponseEntity<Void> enterGroup(@NotNull @PathVariable Long groupId, @NotNull @PathVariable Long userId) {
		groupDMService.enterGroup(groupId, userId);
		return ResponseEntity.noContent().build();
	}

	@Operation(
		summary = "채팅방 나가기",
		description = "채팅방 인원에서 삭제"
	)
	@DeleteMapping("/leave/{groupId}/{userId}")
	public ResponseEntity<Void> leaveGroup(@NotNull @PathVariable Long groupId, @NotNull @PathVariable Long userId) {
		groupDMService.leaveGroup(groupId, userId);
		return ResponseEntity.noContent().build();
	}

	@Operation(
		summary = "그룹채팅 생성",
		description = "그룹 채팅방 개설 및 호스트 등록"
	)
	@PostMapping("/create")
	public ResponseEntity<URI> createGroup(@NotNull Long userId, @NotNull @RequestBody String roomName) {
		Long groupId = groupDMService.createGroup(userId, roomName);
		KafkaDMRequest kafkaDMRequest = new KafkaDMRequest();
		kafkaDMRequest.setRoomId(groupId.toString());
		kafkaDMRequest.setContent(roomName + " 채팅방이 개설되었습니다");
		kafkaTemplate.send(groupId.toString(), kafkaDMRequest);
		return ResponseEntity.created(URI.create("/group/" + groupId)).build();
	}

	@Operation(
		summary = "그룹 정보 가져오기",
		description = "호스트, 참여인원 등"
	)
	@GetMapping("/info/{groupId}")
	public ResponseEntity<GroupDMResponse> getGroupInfo(@NotNull @PathVariable Long groupId) {
		return ResponseEntity.ok(groupDMService.getGroupById(groupId));
	}

	// 방장 바꾸기
}
