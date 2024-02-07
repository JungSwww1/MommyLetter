package com.ssafy.A509.dm.controller;

import com.ssafy.A509.dm.service.MessageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Tag(name = "Message", description = "dm, 그룹채팅 통합 메세지 관련 API")
public class MessageController {

	private final MessageService messageService;

	@Operation(
		summary = "채팅 읽음",
		description = "채팅 엔티티의 채팅 읽음 카운트 -1"
	)
	@GetMapping("/message/read/{dmId}/{userId}")
	public ResponseEntity<Void> reduceReadCount(@PathVariable String dmId, @PathVariable Long userId) {
		messageService.readMessage(dmId);
		return ResponseEntity.ok().build();
	}
}
