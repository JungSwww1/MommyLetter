package com.ssafy.A509.doctor.repository;

import com.ssafy.A509.consult.dto.DoctorConsultCardResponse;
import com.ssafy.A509.doctor.model.Consult;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsultRepository extends JpaRepository<Consult, Long> {

  @Query(
      "SELECT NEW com.ssafy.A509.consult.dto.DoctorConsultCardResponse(c.counselingId as counselingId, "
          + "c.user.userId as userId, d.name as name, d.location as location, d.department as department, "
          + "p.profilePhoto as profilePhoto, r.reserveDate as reserveDate ) "
          + "FROM Consult c "
          + "LEFT JOIN Reserve r ON c.reserve.reserveId = r.reserveId "
          + "LEFT JOIN Doctor d ON r.doctor.doctorId = d.doctorId "
          + "LEFT JOIN User u ON d.user.userId = u.userId "
          + "LEFT JOIN Profile p On u.userId = p.userId "
          + "WHERE c.user.userId = :userId "
          + "ORDER BY c.counselingId DESC ")
  List<DoctorConsultCardResponse> findDoctorByConsultUserId(Long userId);

	@Query(
		"SELECT NEW com.ssafy.A509.consult.dto.DoctorConsultCardResponse(c.counselingId as counselingId, "
			+ "c.user.userId as userId, d.name as name, d.location as location, d.department as department, "
			+ "p.profilePhoto as profilePhoto, r.reserveDate as reserveDate, c.prescriptionPath as prescriptionPath ) "
			+ "FROM Consult c "
			+ "LEFT JOIN Reserve r ON c.reserve.reserveId = r.reserveId "
			+ "LEFT JOIN Doctor d ON r.doctor.doctorId = d.doctorId "
			+ "LEFT JOIN User u ON d.user.userId = u.userId "
			+ "LEFT JOIN Profile p On u.userId = p.userId "
			+ "WHERE c.counselingId = :counselingId " )
	DoctorConsultCardResponse findDoctorByCounselingId(Long counselingId);

	boolean existsByReserveReserveId(Long reserveId);
}
