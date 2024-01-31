package com.ssafy.A509.dm.controller;

import com.ssafy.A509.dm.dto.DMResponse;
import com.ssafy.A509.dm.dto.GroupDMRequest;
import com.ssafy.A509.dm.dto.GroupDMResponse;
import com.ssafy.A509.dm.dto.KafkaDMRequest;
import com.ssafy.A509.dm.service.GroupDMService;
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
@Tag(name = "GroupDM", description = "GroupDM API")
@RequestMapping("/dm/group")
public class GroupDMController {
	private final KafkaTemplate<String, KafkaDMRequest> kafkaTemplate;
	private final GroupDMService groupDMService;
	private final ModelMapper modelMapper;

	@PostMapping
	public void sendMessageToGroup(@Valid @RequestBody GroupDMRequest groupDMRequest) {
		groupDMRequest.createTimeStamp();
		groupDMService.saveGroupDm(groupDMRequest);
		KafkaDMRequest kafkaDMRequest = modelMapper.map(groupDMRequest, KafkaDMRequest.class);
		kafkaDMRequest.setRoomId(groupDMRequest.getRoomId().toString());
		kafkaTemplate.send(kafkaDMRequest.getRoomId(), kafkaDMRequest);
	}

	@GetMapping("/list/{userId}")
	public ResponseEntity<Set<GroupDMResponse>> groupListByUser(@PathVariable Long userId) {
		return ResponseEntity.ok(groupDMService.getGroupList(userId));
	}

	@GetMapping("/{groupId}")
	public ResponseEntity<List<DMResponse>> getGroupDM(@PathVariable Long groupId) {
		return ResponseEntity.ok(groupDMService.getListByGroupId(groupId));
	}

	@GetMapping("/enter/{groupId}/{userId}")
	public ResponseEntity<Void> enterGroup(@NotNull @PathVariable Long groupId, @NotNull @PathVariable Long userId) {
		groupDMService.enterGroup(groupId, userId);
		return ResponseEntity.noContent().build();
	}

	@DeleteMapping("/leave/{groupId}/{userId}")
	public ResponseEntity<Void> leaveGroup(@NotNull @PathVariable Long groupId, @NotNull @PathVariable Long userId) {
		groupDMService.leaveGroup(groupId, userId);
		return ResponseEntity.noContent().build();
	}

	@PostMapping("/create")
	public ResponseEntity<URI> createGroup(@NotNull Long userId, @NotNull @RequestBody String roomName) {
		Long groupId = groupDMService.createGroup(userId, roomName);
		KafkaDMRequest kafkaDMRequest = new KafkaDMRequest();
		kafkaDMRequest.setRoomId(groupId.toString());
		kafkaDMRequest.setContent(roomName + " 채팅방이 개설되었습니다");
		kafkaTemplate.send(groupId.toString(), kafkaDMRequest);
		return ResponseEntity.created(URI.create("/group/" + groupId)).build();
	}


	@GetMapping("/info/{groupId}")
	public ResponseEntity<GroupDMResponse> getGroupInfo(@NotNull @PathVariable Long groupId) {
		return ResponseEntity.ok(groupDMService.getGroupById(groupId));
	}

	// 방장 바꾸기
}
