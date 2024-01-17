package com.ssafy.A509.account.service;

import com.ssafy.A509.account.dto.CreateAccountRequest;
import com.ssafy.A509.account.dto.UpdateAccountRequest;
import com.ssafy.A509.account.dto.AccountResponse;
import com.ssafy.A509.account.model.User;
import com.ssafy.A509.account.repository.AccountRepository;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;

@RequiredArgsConstructor
@Service
public class AccountService {

  private final AccountRepository accountRepository;
  private final ModelMapper modelMapper;

  public void createAccount(CreateAccountRequest accountRequest){
    User buildAccount = User.builder()
        .email(accountRequest.getEmail())
        .nickname(accountRequest.getPassword())
        .password(accountRequest.getPassword())
        .build();

    User account = accountRepository.save(buildAccount);
  }

//  public void checkNickname(String nickname){
//    accountRepository.findByNickname()
//  }

  public AccountResponse getAccountResponse(User user){
    return modelMapper.map(user, AccountResponse.class);
  }

  public AccountResponse getAccount(Long userId){
    return accountRepository.findById(userId).map(this::getAccountResponse).
        orElseThrow(() -> new NoSuchElementException("No Such User"));
  }

  public void updateAccount(UpdateAccountRequest accountRequest){
    accountRepository.findById(accountRequest.getUserId())
        .ifPresentOrElse(user -> {
          user.setNickname(accountRequest.getNickname());
          user.setIntro(accountRequest.getIntro());

          accountRepository.save(user);
        }, () -> {
          throw new NoSuchElementException("No such account");
        });

  }

  public void updateAccountPassword(UpdateAccountRequest userRequest){
    accountRepository.findById(userRequest.getUserId())
        .ifPresentOrElse(user->{
          if(user.getPassword().equals(userRequest.getCurrentPassword())){
            user.setPassword(userRequest.getNewPassword());
            accountRepository.save(user);
          }else{
            throw new NoSuchElementException("Password does not match");
          }
        }, () -> {
          throw new NoSuchElementException("No such account");
        });
  }

  public void deleteAccount(Long userId){
    accountRepository.findById(userId)
        .ifPresentOrElse(accountRepository::delete, () -> {
          throw new NoSuchElementException("No such user");
        });
  }

}
