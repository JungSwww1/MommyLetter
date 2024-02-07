package com.ssafy.A509.signaling.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class SignalingController {

	@MessageMapping("/peer/offer/{camKey}/{roomId}")
	@SendTo("/sub/peer/offer/{camKey}/{roomId}")
	public String PeerHandleOffer(@Payload String offer, @DestinationVariable(value = "roomId") String roomId,
		@DestinationVariable(value = "camKey") String camKey) {
		log.info("offer: {} : {}", camKey, offer);
		return offer;
	}

	@MessageMapping("/peer/iceCandidate/{camKey}/{roomId}")
	@SendTo("/sub/peer/iceCandidate/{camKey}/{roomId}")
	public String PeerHandleIceCandidate(@Payload String candidate,
		@DestinationVariable(value = "roomId") String roomId,
		@DestinationVariable(value = "camKey") String camKey) {
		log.info("iceCandidate {} : {}", camKey, candidate);
		return candidate;
	}

	@MessageMapping("/peer/answer/{camKey}/{roomId}")
	@SendTo("/sub/peer/answer/{camKey}/{roomId}")
	public String PeerHandleAnswer(@Payload String answer, @DestinationVariable(value = "roomId") String roomId,
		@DestinationVariable(value = "camKey") String camKey) {
		log.info("answer: {} : {}", camKey, answer);
		return answer;
	}

	//camKey 주세요
	@MessageMapping("/call/key")
	@SendTo("/sub/call/key")
	public String callKey(@Payload String message) {
		return message;
	}

	//자신의 camKey를 모든 연결된 세션에 보냄
	@MessageMapping("/send/key")
	@SendTo("/sub/send/key")
	public String sendKey(@Payload String message) {
		return message;
	}
}