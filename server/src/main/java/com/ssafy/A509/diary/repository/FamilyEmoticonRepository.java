package com.ssafy.A509.diary.repository;

import com.ssafy.A509.diary.model.FamilyEmoticon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FamilyEmoticonRepository  extends JpaRepository<FamilyEmoticon, Long> {}
