package com.ssafy.A509.dm.controller;

import com.ssafy.A509.dm.service.MessageService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Tag(name = "Message", description = "메세지 관련 API")
public class MessageController {
	private final MessageService messageService;

	@GetMapping("/message/read/{dmId}")
	public ResponseEntity<Void> reduceReadCount(@PathVariable String dmId) {
		messageService.readMessage(dmId);
		return ResponseEntity.ok().build();
	}
}
