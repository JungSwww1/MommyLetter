package com.ssafy.A509.consult.controller;

import com.ssafy.A509.consult.dto.ConsultDetailResponse;
import com.ssafy.A509.consult.dto.CreateReserveResponse;
import com.ssafy.A509.consult.dto.DoctorConsultCardResponse;
import com.ssafy.A509.consult.service.ConsultService;
import com.ssafy.A509.doctor.dto.ReserveResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/consults")
@Tag(name = "Consults", description = "Consult APIs")
public class ConsultController {

	private final ConsultService consultService;

	@Operation(
		summary = "상담 예약하기",
		description = "특정 날짜에 특정 의사에게 예약을 신청한다"
	)
	@PostMapping("/reserve")
	public ResponseEntity<ReserveResponse> createReserve(@Valid @RequestBody CreateReserveResponse reserveResponse){
		return new ResponseEntity<>(consultService.createReserve(reserveResponse), HttpStatus.CREATED);
	}

	@Operation(
		summary = "상담 취소하기",
		description = "{reserveId}의 예약을 취소한다"
	)
	@DeleteMapping("/reserve/{reserveId}")
	public ResponseEntity<Void> deleteReserve(@NotNull @PathVariable Long reserveId){
		consultService.deleteReserve(reserveId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@Operation(
		summary = "상담 완료 리스트 불러오기",
		description = "{userId}를 통해서 현재 완료된 상담 리스트를 불러온다"
	)
	@GetMapping("/{userId}")
	public ResponseEntity<List<DoctorConsultCardResponse>> getConsultList(@NotNull @PathVariable Long userId){
		return new ResponseEntity<>(consultService.getConsultList(userId), HttpStatus.OK);
	}

	@Operation(
		summary = "상담 상세 정보 불러오기",
		description = "{counselingId}를 통해서 상담 상세 정보를 불러온다"
	)
	@GetMapping("/list/{counselingId}")
	public ResponseEntity<ConsultDetailResponse> getConsultDetail(@NotNull @PathVariable Long counselingId){
		return new ResponseEntity<>(consultService.getConsultDetail(counselingId), HttpStatus.OK);
	}

	@Operation(
		summary = "처방전을 불러온다",
		description = "{prescriptionPath}를 통해서 처방전을 불러온다"
	)
	@GetMapping("/files")
	public ResponseEntity<InputStreamResource> getPrescription(@NotBlank String prescriptionPath){
		consultService.downloadPrescription(prescriptionPath);

		InputStreamResource pdf = consultService.downloadPrescription(prescriptionPath);

    return ResponseEntity.ok()
		.contentType(MediaType.valueOf("application/pdf"))
		.body(pdf);
	}


}
