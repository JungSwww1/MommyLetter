package com.ssafy.A509.dm.service;

import com.ssafy.A509.account.model.User;
import com.ssafy.A509.account.repository.AccountRepository;
import com.ssafy.A509.dm.dto.DMRequest;
import com.ssafy.A509.dm.dto.DMResponse;
import com.ssafy.A509.dm.dto.OtherUserResponse;
import com.ssafy.A509.dm.model.DirectMessage;
import com.ssafy.A509.dm.repository.DMRepository;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DMService {

	private final DMRepository dmRepository;

	private final ModelMapper modelMapper;
	private final AccountRepository accountRepository;

	public List<OtherUserResponse> findAllDMList(Long userId) {
		return dmRepository.findRecentMessagesByUserId(userId).stream()
			.map(dm -> modelMapper.map(dm, OtherUserResponse.class)).collect(
				Collectors.toList());
	}

	public List<DMResponse> getListByUsers(Long user1Id, Long user2Id) {
		return dmRepository.getDmListByUsers(user1Id, user2Id).stream().map(dm -> modelMapper.map(dm, DMResponse.class))
			.collect(
				Collectors.toList());
	}

	public void saveDm(DMRequest dmRequest) {
		DirectMessage directMessage = DirectMessage.builder()
			.content(dmRequest.getContent())
			.sender(getUserById(dmRequest.getSenderId()))
			.receiver(getUserById(dmRequest.getReceiverId()))
			.roomId(dmRequest.getRoomId())
			.createdDate(dmRequest.getCreatedDate())
			.build();
		dmRepository.save(directMessage);
	}

	private User getUserById(Long userId) {
		return accountRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("not exist user"));
	}
}
