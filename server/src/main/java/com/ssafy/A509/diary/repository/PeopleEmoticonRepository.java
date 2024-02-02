package com.ssafy.A509.diary.repository;

import com.ssafy.A509.diary.model.PeopleEmoticon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PeopleEmoticonRepository  extends JpaRepository<PeopleEmoticon, Long> {}
