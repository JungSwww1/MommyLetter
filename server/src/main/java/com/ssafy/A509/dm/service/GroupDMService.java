package com.ssafy.A509.dm.service;

import com.ssafy.A509.account.dto.AccountSimpleReponse;
import com.ssafy.A509.account.model.User;
import com.ssafy.A509.account.repository.AccountRepository;
import com.ssafy.A509.dm.dto.DMResponse;
import com.ssafy.A509.dm.dto.GroupDMRequest;
import com.ssafy.A509.dm.dto.GroupDMResponse;
import com.ssafy.A509.dm.model.DirectMessage;
import com.ssafy.A509.dm.model.DmGroup;
import com.ssafy.A509.dm.repository.DMRepository;
import com.ssafy.A509.dm.repository.GroupRepository;
import com.ssafy.A509.profile.dto.UserProfileResponse;
import com.ssafy.A509.profile.service.ProfileService;
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
	private final GroupRepository groupRepository;
	private final DMRepository dmRepository;
	private final ProfileService profileService;
	private final ModelMapper modelMapper;

	@Transactional
	public Long createGroup(Long userId, String dmGroupName) {
		User user = dmService.getUserById(userId);
		DmGroup group = DmGroup.builder()
			.dmGroupName(dmGroupName)
			.host(user)
			.build();

		DmGroup savedGroup = groupRepository.save(group);
		enterGroup(savedGroup.getDmGroupId(), userId);
		return savedGroup.getDmGroupId();
	}

	@Transactional
	public void saveGroupDm(GroupDMRequest groupDMRequest) {
		DirectMessage directMessage = DirectMessage.builder()
			.content(groupDMRequest.getContent())
			.roomId(groupDMRequest.getRoomId().toString())
			.senderId(groupDMRequest.getSenderId())
			.createdDate(groupDMRequest.getCreatedDate())
			.build();
		dmRepository.save(directMessage);
	}

	@Transactional
	public void enterGroup(Long groupId, Long userId) {
		DmGroup dmGroup = findById(groupId);
		User user = dmService.getUserById(userId);
		user.addGroup(dmGroup);
		accountRepository.save(user);
	}

	@Transactional
	public void leaveGroup(Long groupId, Long userId) {
		DmGroup dmGroup = findById(groupId);
		User user = dmService.getUserById(userId);
		user.removeGroup(dmGroup);
		accountRepository.save(user);
	}

	public List<DMResponse> getListByGroupId(Long groupId) {
		String roomId = groupId.toString();
		return dmRepository.findAllByRoomId(roomId).stream()
			.map(dm -> modelMapper.map(dm, DMResponse.class))
			.collect(
				Collectors.toList());
	}

	public Set<GroupDMResponse> getGroupList(Long userId) {
		User user = dmService.getUserById(userId);
		Set<GroupDMResponse> groups = new HashSet<>();
		user.getGroups().forEach(dmGroup -> groups.add(getGroupResponse(dmGroup)));
		return groups;
	}


	public GroupDMResponse getGroupById(Long groupId) {
		return getGroupResponse(findById(groupId));
	}

	private DmGroup findById(Long groupId) {
		return groupRepository.findById(groupId).orElseThrow(() -> new EntityNotFoundException("no such group"));
	}

	private GroupDMResponse getGroupResponse(DmGroup dmGroup) {
		GroupDMResponse dmGroupResponse = GroupDMResponse.builder()
			.dpGroupName(dmGroup.getDmGroupName())
			.createdDate(dmGroup.getCreatedDate())
			.host(getUserResponse(dmGroup.getHost()))
			.build();

		Set<AccountSimpleReponse> users = new HashSet<>();
		dmGroup.getUsers().forEach(user -> users.add(getUserResponse(user)));
		dmGroupResponse.setUsers(users);
		return dmGroupResponse;
	}

	private AccountSimpleReponse getUserResponse(User user) {
		UserProfileResponse userProfileResponse = profileService.getUserProfile(user.getUserId());
		return AccountSimpleReponse
			.builder()
			.userId(user.getUserId())
			.nickname(user.getNickname())
			.profilePhoto(Optional.ofNullable(userProfileResponse).map(UserProfileResponse::getProfilePhoto).orElse(null))
			.build();
	}
}
