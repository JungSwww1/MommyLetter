package com.ssafy.A509.dm.service;

import com.ssafy.A509.account.model.User;
import com.ssafy.A509.account.repository.AccountRepository;
import com.ssafy.A509.dm.dto.DMRequest;
import com.ssafy.A509.dm.dto.DMResponse;
import com.ssafy.A509.dm.dto.DMUserResponse;
import com.ssafy.A509.dm.model.ChatGroup;
import com.ssafy.A509.dm.model.DirectMessage;
import com.ssafy.A509.dm.repository.ChatGroupRepository;
import com.ssafy.A509.dm.repository.DMRepository;
import com.ssafy.A509.unreadNotification.service.UnreadNotificationService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DMService {

	private final DMRepository dmRepository;
	private final ModelMapper modelMapper;
	private final AccountRepository accountRepository;
	private final ChatGroupRepository chatGroupRepository;
	private final UnreadNotificationService notificationService;

	public Set<DMUserResponse> findAllDMGroupList(Long userId) {
		User user = getUserById(userId);
		Set<DMUserResponse> chatGroupList = new HashSet<>();
		user.getGroups().forEach(chatGroup -> {
			String chatRoomName = chatGroup.getChatRoomName();
			if (chatRoomName.startsWith("chat_")) {
				chatGroupList.add(modelMapper.map(chatGroup, DMUserResponse.class));
			}
		});
		return chatGroupList;
	}

	public List<DMResponse> getListByUsers(Long user1Id, Long user2Id) {
		return dmRepository.getDmListByUsers(user1Id, user2Id, Sort.by(Sort.Direction.DESC, "createdDate")).stream()
			.map(dm -> modelMapper.map(dm, DMResponse.class))
			.collect(
				Collectors.toList());
	}

	@Transactional
	public void saveDm(DMRequest dmRequest) {
		DirectMessage directMessage = DirectMessage.builder()
			.content(dmRequest.getContent())
			.senderId(dmRequest.getSenderId())
			.receiverId(dmRequest.getReceiverId())
			.chatGroupId(dmRequest.getChatGroupId())
			.createdDate(dmRequest.getCreatedDate())
			.readCount(2)
			.build();

		DirectMessage save = dmRepository.save(directMessage);
		notificationService.createUnread(save.getReceiverId(), save.getId());
	}

	@Transactional
	public void createChatGroup(Long user1Id, Long user2Id, String roomId) {
		ChatGroup chatGroup = ChatGroup.builder()
			.chatRoomName(roomId)
			.build();

		ChatGroup save = chatGroupRepository.save(chatGroup);
		enterGroup(user1Id, user2Id, save);
	}

	@Transactional
	public void enterGroup(Long user1Id, Long user2Id, ChatGroup chatGroup) {
		User user1 = getUserById(user1Id);
		User user2 = getUserById(user2Id);
		user1.addGroup(chatGroup);
		accountRepository.save(user1);
		user2.addGroup(chatGroup);
		accountRepository.save(user2);
	}

	protected User getUserById(Long userId) {
		return accountRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("no such user"));
	}

	private ChatGroup findById(Long groupId) {
		return chatGroupRepository.findById(groupId).orElseThrow(() -> new EntityNotFoundException("no such group"));
	}
}
