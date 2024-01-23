package com.ssafy.A509.doctor.repository;

import com.ssafy.A509.doctor.model.Reserve;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReserveRepository extends JpaRepository<Reserve, Long> {
	List<Reserve> findAllByDoctorDoctorId(Long doctorId);

//	@Query(value =
//		"select u.user_id, ui.name, profile_photo, ui.phone, ui.SSN, gender, "
//			+ "ui.pregnancy_status, ui.extra, ui.diary_open, r.reserve_date "
//			+ "from reserve r "
//			+ "left join user u on u.user_id = r.user_id "
//			+ "left join profile p on p.user_id = u.user_id "
//			+ "left join user_info ui on ui.user_id = u.user_id "
//			+ "where r.doctor_id = :doctorId "
//		, nativeQuery = true)
//	List<Reserve> findPatientByReserveDoctorId(@Param(value = "doctorId") Long doctorId);

}
