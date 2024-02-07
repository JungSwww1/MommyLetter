package com.ssafy.A509.dm.service;

import com.ssafy.A509.account.dto.AccountSimpleResponse;
import com.ssafy.A509.account.model.User;
import com.ssafy.A509.account.repository.AccountRepository;
import com.ssafy.A509.dm.dto.GroupDMRequest;
import com.ssafy.A509.dm.dto.GroupDMResponse;
import com.ssafy.A509.dm.model.ChatGroup;
import com.ssafy.A509.dm.model.DirectMessage;
import com.ssafy.A509.dm.repository.ChatGroupRepository;
import com.ssafy.A509.dm.repository.DMRepository;
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
	public void saveGroupDm(GroupDMRequest groupDMRequest) {
		DirectMessage directMessage = DirectMessage.builder()
			.content(groupDMRequest.getContent())
			.roomId(groupDMRequest.getRoomId().toString())
			.senderId(groupDMRequest.getSenderId())
			.createdDate(groupDMRequest.getCreatedDate())
			.readCount(chatGroupRepository.countChatUserByChatGroupId(groupDMRequest.getRoomId()))
			.build();

		DirectMessage save = dmRepository.save(directMessage);
		ChatGroup group = findById(groupDMRequest.getRoomId());
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

	public List<GroupDMRequest> getListByGroupId(Long groupId) {
		String roomId = groupId.toString();
		return dmRepository.findAllByRoomId(roomId).stream()
			.map(dm -> modelMapper.map(dm, GroupDMRequest.class))
			.collect(
				Collectors.toList());
	}

	public Set<GroupDMResponse> getGroupList(Long userId) {
		User user = dmService.getUserById(userId);
		Set<GroupDMResponse> groups = new HashSet<>();
		user.getGroups().forEach(chatGroup -> groups.add(getGroupResponse(chatGroup)));
		return groups;
	}


	public GroupDMResponse getGroupById(Long groupId) {
		return getGroupResponse(findById(groupId));
	}

	private ChatGroup findById(Long groupId) {
		return chatGroupRepository.findById(groupId).orElseThrow(() -> new EntityNotFoundException("no such group"));
	}

	private GroupDMResponse getGroupResponse(ChatGroup chatGroup) {
		GroupDMResponse dmGroupResponse = GroupDMResponse.builder()
			.dpGroupName(chatGroup.getChatRoomName())
			.createdDate(chatGroup.getCreatedDate())
			.host(getUserResponse(chatGroup.getHost()))
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
