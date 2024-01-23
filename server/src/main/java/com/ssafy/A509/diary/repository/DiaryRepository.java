package com.ssafy.A509.diary.repository;

import com.ssafy.A509.diary.model.Category;
import com.ssafy.A509.diary.model.Diary;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
    List<Diary> findAllByUserUserId(Long userId);

    List<Diary> findAllByUserUserIdAndCategory(Long userId, Category category);
}
