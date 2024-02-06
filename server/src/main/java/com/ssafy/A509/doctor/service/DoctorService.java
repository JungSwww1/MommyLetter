package com.ssafy.A509.doctor.service;

import com.ssafy.A509.account.repository.AccountRepository;
import com.ssafy.A509.diary.dto.DiaryResponse;
import com.ssafy.A509.diary.model.Category;
import com.ssafy.A509.diary.repository.DiaryRepository;
import com.ssafy.A509.doctor.dto.ConsultResponse;
import com.ssafy.A509.doctor.dto.CreateConsultRequest;
import com.ssafy.A509.doctor.dto.PatientResponse;
import com.ssafy.A509.doctor.dto.ReserveResponse;
import com.ssafy.A509.doctor.model.Consult;
import com.ssafy.A509.doctor.repository.ConsultRepository;
import com.ssafy.A509.doctor.repository.ReserveRepository;
import com.ssafy.A509.exception.CustomException;
import com.ssafy.A509.exception.ErrorCode;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DoctorService {

	private final AccountRepository accountRepository;
	private final ReserveRepository reserveRepository;
	private final ModelMapper modelMapper;
	private final DiaryRepository diaryRepository;
	private final ConsultRepository consultRepository;

	/**
	 * 의사 상담 예약 캘린더 조회
	 * {doctorId}를 가진 의사의 모든 예약일을 조회하여 List의 형태로 return한다.
	 * */
	public List<ReserveResponse> getReserveList(Long doctorId) {
		return reserveRepository.findAllByDoctorDoctorId(doctorId).stream()
			.map(reserve -> modelMapper.map(reserve, ReserveResponse.class)).collect(
				Collectors.toList());
	}

	private ConsultResponse getConsultResponse(Consult consult){
		return modelMapper.map(consult, ConsultResponse.class);
	}

	/**
	 * 상담 환자 리스트 조회
	 * {doctorId}를 가진 의사의 모든 환자 리스트를 조회하여 List의 형태로 return한다.
	 * */
	public List<PatientResponse> getPatientList(Long doctorId){
		List<PatientResponse> patientResponses = accountRepository.findPatientByReserveDoctorId(doctorId)
			.stream()
			.map(patient -> modelMapper.map(patient, PatientResponse.class))
			.toList();

		return patientResponses;
	}

	/**
	 * 상담 환자 상세 정보
	 * {reserveId} 상담 예약한 환자의 정보를 가져온다
	 * */
	public PatientResponse getPatientInfo(Long reserveId){
		PatientResponse patientResponse = accountRepository
			.findPatientByReserveReserveId(reserveId);
		if(patientResponse == null){
   			throw new CustomException(ErrorCode.NO_PATIENT_INFO, "reserveId: " + reserveId);
		}

		long reserveCount =
			getReserveCount(patientResponse.getUserId(), patientResponse.getDoctorId());
		patientResponse.setCountReserve(reserveCount);

		boolean consulted = consultRepository.existsByReserveReserveId(reserveId);
		patientResponse.setConsulted(consulted);

		return patientResponse;
	}

	/**
	 * 특정 의사에게 진료를 받은 환자의 진료 횟수
	 * */
	public Long getReserveCount(Long userId, Long doctorId){
		return reserveRepository.countByUserUserIdAndDoctorDoctorId(userId, doctorId);
	}

	/**
	 * 산모 일기 조회
	 * {userId}를 가진 산모의 모든 일기를 조회하여 List의 형태로 return한다.
	 * */
	public List<DiaryResponse> getDiaryList(Long userId){
		return diaryRepository.findAllByUserUserIdAndCategory(userId, Category.Mom).stream()
			.map(diary -> modelMapper.map(diary, DiaryResponse.class))
			.collect(Collectors.toList());
	}

	/**
	 * 처방전 작성
	 * consult 테이블에 삽입한다
	 * */
	@Transactional
	public ConsultResponse createConsult(CreateConsultRequest consultRequest){
		Consult newConsult = Consult.builder()
			.user(accountRepository.findById(consultRequest.getUserId())
				.orElseThrow(() -> new CustomException(ErrorCode.NO_SUCH_ACCOUNT)))
			.reserve(reserveRepository.findById(consultRequest.getReserveId())
				.orElseThrow(() -> new CustomException(ErrorCode.NO_SUCH_RESERVE)))
			.prescriptionPath(consultRequest.getPrescriptionPath())
			.build();

		return getConsultResponse(consultRepository.save(newConsult));

	}


}
