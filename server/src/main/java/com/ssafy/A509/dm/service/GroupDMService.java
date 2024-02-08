package com.ssafy.A509.dm.service;

import com.ssafy.A509.account.dto.AccountSimpleResponse;
import com.ssafy.A509.account.model.User;
import com.ssafy.A509.account.repository.AccountRepository;
import com.ssafy.A509.dm.dto.GroupMessageRequest;
import com.ssafy.A509.dm.dto.ChatGroupResponse;
import com.ssafy.A509.dm.dto.GroupMessageResponse;
import com.ssafy.A509.dm.model.ChatGroup;
import com.ssafy.A509.dm.model.DirectMessage;
import com.ssafy.A509.dm.model.UserChatGroup;
import com.ssafy.A509.dm.repository.ChatGroupRepository;
import com.ssafy.A509.dm.repository.DMRepository;
import com.ssafy.A509.dm.repository.UserChatGroupRepository;
import com.ssafy.A509.profile.dto.UserProfileResponse;
import com.ssafy.A509.profile.service.ProfileService;
import com.ssafy.A509.unreadNotification.service.UnreadNotificationService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GroupDMService {

	private final DMService dmService;
	private final AccountRepository accountRepository;
	private final ChatGroupRepository chatGroupRepository;
	private final DMRepository dmRepository;
	private final ProfileService profileService;
	private final ModelMapper modelMapper;
	private final UnreadNotificationService notificationService;
	private final UserChatGroupRepository userChatGroupRepository;

	@Transactional
	public Long createGroup(Long userId, String chatGroupName) {
		User user = dmService.getUserById(userId);
		ChatGroup group = ChatGroup.builder()
			.chatRoomName(chatGroupName)
			.host(user)
			.build();

		ChatGroup savedGroup = chatGroupRepository.save(group);
		enterGroup(savedGroup.getChatGroupId(), userId);
		return savedGroup.getChatGroupId();
	}

	@Transactional
	public void saveGroupDm(GroupMessageRequest groupMessageRequest) {
		DirectMessage directMessage = DirectMessage.builder()
			.content(groupMessageRequest.getContent())
			.chatGroupId(groupMessageRequest.getChatGroupId())
			.senderId(groupMessageRequest.getSenderId())
			.createdDate(groupMessageRequest.getCreatedDate())
			.unreadCount(chatGroupRepository.countChatUserByChatGroupId(groupMessageRequest.getChatGroupId()))
			.build();

		DirectMessage save = dmRepository.save(directMessage);
		ChatGroup group = findById(groupMessageRequest.getChatGroupId());
		group.getUsers().forEach(user -> notificationService.createUnread(user.getUserId(), save.getId()));
	}

	@Transactional
	public void enterGroup(Long groupId, Long userId) {
		ChatGroup chatGroup = findById(groupId);
		User user = dmService.getUserById(userId);
		user.addGroup(chatGroup);
		accountRepository.save(user);
	}

	@Transactional
	public void leaveGroup(Long groupId, Long userId) {
		ChatGroup chatGroup = findById(groupId);
		User user = dmService.getUserById(userId);
		user.removeGroup(chatGroup);
		accountRepository.save(user);
	}

	public List<GroupMessageResponse> getListByGroupAndUser(Long groupId, Long userId) {
		UserChatGroup userChatGroup = userChatGroupRepository.findByUserUserIdAndChatGroupChatGroupId(userId,
			groupId);
		return dmRepository.findAllByChatGroupIdAndCreatedDateGreaterThanEqual(groupId, userChatGroup.getJoinDate())
			.stream()
			.map(dm -> modelMapper.map(dm, GroupMessageResponse.class))
			.collect(
				Collectors.toList());
	}

	public Set<ChatGroupResponse> getGroupList(Long userId) {
		User user = dmService.getUserById(userId);
		Set<ChatGroupResponse> groups = new HashSet<>();
		user.getGroups().forEach(chatGroup -> {
			if (!chatGroup.getChatRoomName().startsWith("chat_")) {
				groups.add(getGroupResponse(chatGroup));
			}
		});

		return groups;
	}


	public ChatGroupResponse getGroupById(Long groupId) {
		return getGroupResponse(findById(groupId));
	}

	private ChatGroup findById(Long groupId) {
		return chatGroupRepository.findById(groupId).orElseThrow(() -> new EntityNotFoundException("no such group"));
	}

	private ChatGroupResponse getGroupResponse(ChatGroup chatGroup) {
		ChatGroupResponse dmGroupResponse = ChatGroupResponse.builder()
			.chatGroupId(chatGroup.getChatGroupId())
			.dpGroupName(chatGroup.getChatRoomName())
			.createdDate(chatGroup.getCreatedDate())
			.host(chatGroup.getHost() == null ? null : getUserResponse(chatGroup.getHost()))
			.build();

		Set<AccountSimpleResponse> users = new HashSet<>();
		chatGroup.getUsers().forEach(user -> users.add(getUserResponse(user)));
		dmGroupResponse.setUsers(users);
		return dmGroupResponse;
	}

	private AccountSimpleResponse getUserResponse(User user) {
		UserProfileResponse userProfileResponse = profileService.getUserProfile(user.getUserId());
		return AccountSimpleResponse
			.builder()
			.userId(user.getUserId())
			.nickname(user.getNickname())
			.profilePhoto(
				Optional.ofNullable(userProfileResponse).map(UserProfileResponse::getProfilePhoto).orElse(null))
			.build();
	}
}
