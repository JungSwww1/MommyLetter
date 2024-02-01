package com.ssafy.A509.search.controller;

import com.ssafy.A509.account.repository.AccountRepository;
import com.ssafy.A509.hashtag.dto.HashtagResponse;
import com.ssafy.A509.hashtag.repository.HashtagRepository;
import com.ssafy.A509.profile.dto.UserProfileResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/search")
@Tag(name = "Search", description = "Search API")
public class SearchController {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private HashtagRepository hashtagRepository;

    /* User의 nickname으로 검색
    * /search/nickname?nickname=searchTerm
    * */
    @GetMapping("/nickname")
    public List<UserProfileResponse> searchUsers(@RequestParam String nickname) {
        return accountRepository.findUserProfilesByNickname(nickname);
    }

    /* 해시태그 검색
    * /search/hashtags?content=content
    * */
    @GetMapping("/hashtags")
    public List<HashtagResponse> getDistinctHashtags(@RequestParam String content) {
        return hashtagRepository.findDistinctHashtagsContainingIgnoreCase(content);
    }

    /* 검색한 해시태그의 content로 해당 해시태그가 달린 게시글 List GET
    * /search/boards?content=searchTerm
    * 추후에 BoardId 만 반환하는 부분을 필요한 DTO에 맞게 수정해서 반환 할 수 있도록 할 예정
    * */
    @GetMapping("/boards")
    public List<Long> searchBoardsByHashTag(@RequestParam String content) {
        return hashtagRepository.findBoardsByHashtagContent(content);
    }
}
