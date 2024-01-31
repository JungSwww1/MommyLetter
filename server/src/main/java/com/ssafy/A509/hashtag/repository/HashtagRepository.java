package com.ssafy.A509.hashtag.repository;

import com.ssafy.A509.hashtag.dto.HashtagResponse;
import com.ssafy.A509.hashtag.model.Hashtag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HashtagRepository extends JpaRepository<Hashtag, Long> {

    @Query("SELECT DISTINCT NEW com.ssafy.A509.hashtag.dto.HashtagResponse(h.content) as content FROM Hashtag h WHERE h.content LIKE %:content%")
    List<HashtagResponse> findDistinctHashtagsContainingIgnoreCase(@Param("content") String content);

    /*
    추후에 BoardId 만 반환하는 부분을 필요한 DTO에 맞게 수정해서 반환 할 수 있도록 할 예정
     */
    @Query("SELECT DISTINCT h.board.boardId FROM Hashtag h WHERE h.content = :content")
    List<Long> findBoardsByHashtagContent(@Param("content") String content);
}
