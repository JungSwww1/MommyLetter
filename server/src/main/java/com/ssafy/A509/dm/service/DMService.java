package com.ssafy.A509.dm.service;

import com.ssafy.A509.account.model.User;
import com.ssafy.A509.account.repository.AccountRepository;
import com.ssafy.A509.dm.dto.DMRequest;
import com.ssafy.A509.dm.dto.DMResponse;
import com.ssafy.A509.dm.dto.GroupDMRequest;
import com.ssafy.A509.dm.dto.OtherUserResponse;
import com.ssafy.A509.dm.model.DirectMessage;
import com.ssafy.A509.dm.model.DmGroup;
import com.ssafy.A509.dm.repository.DMRepository;
import com.ssafy.A509.dm.repository.GroupRepository;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
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
	private final GroupRepository groupRepository;

	public Long createGroup(Long userId, String dmGroupName) {
		User user = getUserById(userId);
		DmGroup group = DmGroup.builder()
			.dmGroupName(dmGroupName)
			.host(user)
			.build();

		group.addUser(user);
		DmGroup save = groupRepository.save(group);
		return save.getDmGroupId();
	}

	public DmGroup getGroupById(Long groupId) {
		return groupRepository.findById(groupId).orElseThrow(() -> new EntityNotFoundException("no such group"));
	}

	public List<OtherUserResponse> findAllDMList(Long userId) {
		return dmRepository.findRecentMessagesByUserId(userId).stream()
			.map(dm -> modelMapper.map(dm, OtherUserResponse.class)).collect(
				Collectors.toList());
	}

	public List<DMResponse> getListByUsers(Long user1Id, Long user2Id) {
		return dmRepository.getDmListByUsers(user1Id, user2Id, Sort.by(Sort.Direction.DESC, "createdDate")).stream()
			.map(dm -> modelMapper.map(dm, DMResponse.class))
			.collect(
				Collectors.toList());
	}

	public void saveDm(DMRequest dmRequest) {
		DirectMessage directMessage = DirectMessage.builder()
			.content(dmRequest.getContent())
			.senderId(dmRequest.getSenderId())
			.receiverId(dmRequest.getReceiverId())
			.roomId(dmRequest.getRoomId())
			.createdDate(dmRequest.getCreatedDate())
			.build();
		dmRepository.save(directMessage);
	}

	public void enterGroup(Long groupId, Long userId) {

	}

	public void saveGroupDm(GroupDMRequest groupDMRequest) {
		DirectMessage directMessage = DirectMessage.builder()
			.content(groupDMRequest.getContent())
			.roomId(groupDMRequest.getRoomId().toString())
			.senderId(groupDMRequest.getSenderId())
			.createdDate(groupDMRequest.getCreatedDate())
			.build();
		dmRepository.save(directMessage);
	}

	private User getUserById(Long userId) {
		return accountRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("no such user"));
	}
}
