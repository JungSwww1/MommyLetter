package com.ssafy.A509.doctor.repository;

import com.ssafy.A509.doctor.model.Reserve;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReserveRepository extends JpaRepository<Reserve, Long> {
	List<Reserve> findAllByDoctorDoctorId(Long doctorId);

	Long countByUserUserIdAndDoctorDoctorId(Long userId, Long doctorId);

	List<Reserve> findAllByUserUserId(Long userId);
}
