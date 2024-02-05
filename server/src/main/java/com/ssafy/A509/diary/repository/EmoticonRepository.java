package com.ssafy.A509.diary.repository;

import com.ssafy.A509.diary.model.Emoticon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmoticonRepository extends JpaRepository<Emoticon, Long> {

	Emoticon findByDiaryDiaryId(Long diaryId);
}
