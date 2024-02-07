package com.ssafy.A509.doctor.controller;

import com.ssafy.A509.diary.dto.DiaryResponse;
import com.ssafy.A509.doctor.dto.ConsultResponse;
import com.ssafy.A509.doctor.dto.CreateConsultRequest;
import com.ssafy.A509.doctor.dto.PatientResponse;
import com.ssafy.A509.doctor.dto.ReserveResponse;
import com.ssafy.A509.doctor.service.DoctorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/doctors")
@Tag(name = "Doctors", description = "Doctor APIs")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class DoctorController {

	private final DoctorService doctorService;

	@Operation(
		summary = "예약된 날짜 리스트 호출",
		description = "{doctorId}를 통해서 현재 예약된 날짜 리스트를 불러온다."
	)
	@GetMapping("/calender/{doctorId}")
	public ResponseEntity<List<ReserveResponse>> getReserveList(@NotBlank @PathVariable Long doctorId){
		return new ResponseEntity<>(doctorService.getReserveList(doctorId), HttpStatus.OK);
	}

	@Operation(
		summary = "환자 리스트 조회",
		description = "{doctorId}를 통해서 상담을 신청한 환자의 리스트를 불러온다."
			+ "정렬은 최신순이며 상담이 끝난 사람도 리스트에 올라온다"
	)
	@GetMapping("/{doctorId}")
	public ResponseEntity<List<PatientResponse>> getPatientList(@NotBlank @PathVariable Long doctorId){
		return new ResponseEntity<>(doctorService.getPatientList(doctorId), HttpStatus.OK);
	}
	
	@Operation(
		summary = "산모 일기 조회",
		description = "{userId}를 통해서 환자의 산모일기 리스트를 조회한다."
	)
	@GetMapping("/diary/{userId}")
	public ResponseEntity<List<DiaryResponse>> getDiaryList(@NotBlank @PathVariable Long userId){
		return new ResponseEntity<>(doctorService.getDiaryList(userId), HttpStatus.OK);
	}

	@Operation(
		summary = "환자의 상세정보 조회",
		description = "{reserveId}를 통해서 환자의 {userId}를 찾아내고 관련된 정보를 가져온다."
	)
	@GetMapping("/patient/{reserveId}")
	public ResponseEntity<PatientResponse> getPatientInfo(@NotBlank @PathVariable Long reserveId){
		return new ResponseEntity<>(doctorService.getPatientInfo(reserveId), HttpStatus.OK);
	}

	@Operation(
		summary = "처방전 작성",
		description = "처방전을 작성하여 등록한다. 돌아오는 response는 counselingId, prescriptionPath이다."
	)
	@PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<ConsultResponse> createConsult(@Valid @RequestPart CreateConsultRequest consultRequest,
		@RequestPart MultipartFile prescription){
		return new ResponseEntity<>(doctorService.createConsult(consultRequest, prescription), HttpStatus.CREATED);
	}

}
