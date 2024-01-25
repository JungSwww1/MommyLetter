package com.ssafy.A509.doctor.controller;

import com.ssafy.A509.diary.dto.DiaryResponse;
import com.ssafy.A509.doctor.dto.ConsultResponse;
import com.ssafy.A509.doctor.dto.CreateConsultRequest;
import com.ssafy.A509.doctor.dto.PatientResponse;
import com.ssafy.A509.doctor.dto.ReserveResponse;
import com.ssafy.A509.doctor.service.DoctorService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/doctors")
public class DoctorController {

	private final DoctorService doctorService;

	/**
	 * 예약된 날짜 호출
	 * */
	@GetMapping("/calender/{doctorId}")
	public ResponseEntity<List<ReserveResponse>> getReserveList(@NotBlank @PathVariable Long doctorId){
		return new ResponseEntity<>(doctorService.getReserveList(doctorId), HttpStatus.OK);
	}

	/**
	 * 환자 리스트 호출
	 * */
	@GetMapping("/{doctorId}")
	public ResponseEntity<List<PatientResponse>> getPatientList(@NotBlank @PathVariable Long doctorId){
		return new ResponseEntity<>(doctorService.getPatientList(doctorId), HttpStatus.OK);
	}

	/**
	 * 산모 일기 조회
	 * {userId}를 가지는 환자의 모든 일기 가져오기
	 * */
	@GetMapping("/diary/{userId}")
	public ResponseEntity<List<DiaryResponse>> getDiaryList(@NotBlank @PathVariable Long userId){
		return new ResponseEntity<>(doctorService.getDiaryList(userId), HttpStatus.OK);
	}

	/**
	 * 환자의 상세정보 호출
	 * */
	@GetMapping("/patient/{reserveId}")
	public ResponseEntity<PatientResponse> getPatientInfo(@NotBlank @PathVariable Long reserveId){
		return new ResponseEntity<>(doctorService.getPatientInfo(reserveId), HttpStatus.OK);
	}

	/**
	 * 처방전 작성
	 * */
	@PostMapping
	public ResponseEntity<ConsultResponse> createConsult(@Valid @RequestBody CreateConsultRequest consultRequest){
		return new ResponseEntity<>(doctorService.createConsult(consultRequest), HttpStatus.CREATED);
	}

}
