package com.ssafy.A509.diary.repository;

import com.ssafy.A509.comment.model.Comment;
import com.ssafy.A509.diary.model.Diary;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
  List<Diary> findAllByUserId(Long userId);
}
