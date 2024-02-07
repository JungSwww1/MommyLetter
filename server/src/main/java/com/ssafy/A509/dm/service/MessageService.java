package com.ssafy.A509.dm.service;

import com.ssafy.A509.dm.model.DirectMessage;
import com.ssafy.A509.dm.repository.DMRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageService {
	private final DMRepository dmRepository;
	@Transactional
	public void readMessage(String id) {
		DirectMessage directMessage = dmRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("no such dm"));
		directMessage.reduceReadCount();
		dmRepository.save(directMessage);
	}
}
