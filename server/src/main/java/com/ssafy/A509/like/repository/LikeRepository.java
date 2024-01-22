package com.ssafy.A509.like.repository;

import com.ssafy.A509.like.model.Like;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository<T extends Like> extends JpaRepository<T, Long> {

}
