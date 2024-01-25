package com.ssafy.A509.photo.repository;

import com.ssafy.A509.photo.model.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoRepository  extends JpaRepository<Photo, Long> {}
