package com.ssafy.A509.doctor.repository;

import com.ssafy.A509.doctor.model.Consult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsultRepository extends JpaRepository<Consult, Long> {

	boolean existsByReserveReserveId(Long reserveId);
}
