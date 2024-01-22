package com.ssafy.A509.doctor.repository;

import com.ssafy.A509.account.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {}
