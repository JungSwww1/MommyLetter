package com.ssafy.A509.doctor.repository;

import com.ssafy.A509.doctor.model.Reserve;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReserveRepository extends JpaRepository<Reserve, Long> {
	List<Reserve> findAllByDoctorId(Long doctorId);
}
