package com.ssafy.A509.account.service;

import com.ssafy.A509.account.dto.CustomOAuth2User;
import com.ssafy.A509.account.dto.GoogleResponse;
import com.ssafy.A509.account.dto.NaverResponse;
import com.ssafy.A509.account.dto.OAuth2Response;
import com.ssafy.A509.account.model.User;
import com.ssafy.A509.account.repository.AccountRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final AccountRepository accountRepository;

    public CustomOAuth2UserService(AccountRepository accountRepository){
        this.accountRepository = accountRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest); // 상위 클래스의 메서드를 호출하여 OAuth2User 객체를 로드
        System.out.println(oAuth2User.getAttributes()); // 로드된 사용자 속성을 콘솔에 출력 (디버깅 목적)

        String registrationId = userRequest.getClientRegistration().getRegistrationId(); // 공급자 식별자 (예: "google", "naver")
        OAuth2Response oAuth2Response = null;

        // 공급자에 따라 적절한 OAuth2Response 객체를 생성
        if (registrationId.equals("naver")) {
            oAuth2Response = new NaverResponse(oAuth2User.getAttributes());
        } else if (registrationId.equals("google")) {
            oAuth2Response = new GoogleResponse(oAuth2User.getAttributes());
        } else {
            return null; // 지원되지 않는 공급자인 경우 null 반환
        }

        String nickname = oAuth2Response.getProvider() + " " + oAuth2Response.getProviderId(); // 공급자명과 공급자 ID를 조합하여 닉네임 생성
        User existData = accountRepository.findByNickname(nickname); // 닉네임으로 기존 사용자 데이터 조회

        String role = null;
        if (existData == null) {
            // 사용자가 새로운 경우, 사용자 정보를 생성하여 데이터베이스에 저장
            User userEntity = User.createUser();
            userEntity.setNickname(nickname);
            userEntity.setEmail(oAuth2Response.getEmail());
            accountRepository.save(userEntity);
        }
        else {
            // 기존 사용자가 있는 경우, 사용자 정보 업데이트
            existData.setNickname(nickname);
            existData.setEmail(oAuth2Response.getEmail());
            accountRepository.save(existData);
        }

        role = "Common"; // 기본 사용자 권한 설정

        // CustomOAuth2User 객체를 생성하여 반환 (사용자 정보와 권한 포함)
        return new CustomOAuth2User(oAuth2Response, role);
    }

}
