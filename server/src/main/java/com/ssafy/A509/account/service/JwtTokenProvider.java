package com.ssafy.A509.account.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenProvider {

    private final String secretKey = "dddddddddddddddddddddddddddddddddddddddddddddd"; // 실제 서비스에서는 보안을 위해 복잡한 키로 지정해주세요!!
    private static final Logger log = LoggerFactory.getLogger(JwtTokenProvider.class); // Logger 추가

    public String createToken(Long userId) {
        Date now = new Date(); // 현재 시각
        long validityInMilliseconds = 3600000; // 토큰의 유효 시간 (1시간)

        // JWT 토큰 생성
        String token = Jwts.builder()
                .setSubject(String.valueOf(userId)) // 토큰의 주체 (subject) 설정
                .setIssuedAt(now) // 토큰 발행 시간 설정
                .setExpiration(new Date(now.getTime() + validityInMilliseconds)) // 토큰 만료 시간 설정
                .signWith(SignatureAlgorithm.HS256, secretKey) // 비밀 키와 알고리즘으로 서명
                .compact(); // JWT 문자열 생성

        log.info("Generated JWT token: {}", token); // 생성된 JWT 토큰 로깅

        return token;

    }

    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser() // JWT 파서 생성
                .setSigningKey(secretKey) // 서명 검증을 위한 비밀 키 설정
                .parseClaimsJws(token) // 토큰 파싱
                .getBody(); // 클레임(페이로드) 부분 추출

        return claims.getSubject(); // 클레임에서 주체(subject) 즉, 사용자 이름 추출
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secretKey) // 서명 검증을 위한 비밀 키 설정
                    .parseClaimsJws(token); // 토큰 파싱하여 유효성 검증
            return true; // 토큰이 유효한 경우 true 반환
        } catch (ExpiredJwtException e) {
            // 토큰이 만료된 경우 여기서 처리 (예: 로그 기록)
            return false; // 토큰이 만료되거나 잘못된 경우 false 반환
        }
    }
}
