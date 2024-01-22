package com.ssafy.A509.account.service;

import com.ssafy.A509.account.dto.CreateAccountRequest;
import com.ssafy.A509.account.dto.UpdateAccountRequest;
import com.ssafy.A509.account.dto.AccountResponse;
import com.ssafy.A509.account.model.User;
import com.ssafy.A509.account.repository.AccountRepository;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final ModelMapper modelMapper;

    //회원가입 기능
    //비밀번호 암호화 도입 X
    @Transactional
    public void createAccount(CreateAccountRequest accountRequest){
        User buildAccount = User.builder()
            .email(accountRequest.getEmail())
            .nickname(accountRequest.getNickname())
            .password(accountRequest.getPassword())
            .build();

        User account = accountRepository.save(buildAccount);
    }

    //User 모델과 AccountResponse dto를 매핑
    public AccountResponse getAccountResponse(User user){
        return modelMapper.map(user, AccountResponse.class);
    }

    // 특정 userId를 가진 유저를 검색
    public AccountResponse getAccount(Long userId){
        return accountRepository.findById(userId).map(this::getAccountResponse).
            orElseThrow(() -> new NoSuchElementException("No Such User"));
    }

    public List<AccountResponse> getAllAccount(){
        return accountRepository.findAll().stream().map(account -> modelMapper.map(account, AccountResponse.class)).collect(
            Collectors.toList());
    }

    // 계정 정보 수정
    @Transactional
    public void updateAccount(Long userId, UpdateAccountRequest accountRequest) {
        User user = accountRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("해당 userId를 가진 사용자가 없습니다."));

        if (accountRequest.getNickname() != null) {
            user.setNickname(accountRequest.getNickname());
        }
        if (accountRequest.getIntro() != null) {
            user.setIntro(accountRequest.getIntro());
        }

        accountRepository.save(user);
    }

    // 계정 비밀번호 수정
    // 암호화 도입 X
    @Transactional
    public void updateAccountPassword(Long userId, UpdateAccountRequest accountRequest) {
        User user = accountRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("해당 userId를 가진 사용자가 없습니다."));

        if (!user.getPassword().equals(accountRequest.getCurrentPassword())) {
            throw new IllegalArgumentException("현재 비밀번호가 일치하지 않습니다.");
        }

        user.setPassword(accountRequest.getNewPassword());
        accountRepository.save(user);
    }

    //계정 삭제
    @Transactional
    public void deleteAccount(Long userId){
        accountRepository.findById(userId)
            .ifPresentOrElse(accountRepository::delete, () -> {
              throw new NoSuchElementException("No such user");
            });
    }

    public boolean isEmailExists(String email) {
        return accountRepository.existsByEmail(email);
    }

    public boolean isNicknameExists(String nickname) {
        return accountRepository.existsByNickname(nickname);
    }
}
