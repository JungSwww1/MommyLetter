package com.ssafy.A509.dm.repository;

import com.ssafy.A509.dm.model.DmGroup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupRepository extends JpaRepository<DmGroup, Long> {
}
