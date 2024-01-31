package com.ssafy.A509.consult.service;

import com.ssafy.A509.account.repository.AccountRepository;
import com.ssafy.A509.account.repository.UserInfoRepository;
import com.ssafy.A509.consult.dto.ConsultDetailResponse;
import com.ssafy.A509.consult.dto.CreateReserveResponse;
import com.ssafy.A509.consult.dto.DoctorConsultCardResponse;
import com.ssafy.A509.doctor.dto.ReserveResponse;
import com.ssafy.A509.doctor.model.Reserve;
import com.ssafy.A509.doctor.repository.ConsultRepository;
import com.ssafy.A509.doctor.repository.DoctorRepository;
import com.ssafy.A509.doctor.repository.ReserveRepository;
import jakarta.transaction.Transactional;
import java.io.File;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ConsultService {

	private final ModelMapper modelMapper;
	private final ConsultRepository consultRepository;
	private final ReserveRepository reserveRepository;
	private final AccountRepository accountRepository;
	private final DoctorRepository doctorRepository;
	private final UserInfoRepository userInfoRepository;

	/*
	  상담 예약하기
	  */
	@Transactional
	public ReserveResponse createReserve(CreateReserveResponse reserveResponse){
		Reserve newReserve =
			Reserve.builder()
				.user(accountRepository.findById(reserveResponse.getUserId()).orElseThrow())
				.doctor(doctorRepository.findById(reserveResponse.getDoctorId()).orElseThrow())
				.reserveDate(reserveResponse.getReserveDate())
				.build();

		Reserve save = reserveRepository.save(newReserve);

		return getReserveResponse(save);
	}

	private ReserveResponse getReserveResponse(Reserve reserve){
		return modelMapper.map(reserve, ReserveResponse.class);
	}

	/*
	* 상담 취소하기
	* */
	@Transactional
	public void deleteReserve(Long reserveId){
		reserveRepository.deleteById(reserveId);
	}

	/*
	* 상담 기록 전체 조회
	* -> 유저가 자신의 기록을 조회
	* */
	public List<DoctorConsultCardResponse> getConsultList(Long userId){

		return consultRepository
			.findDoctorByConsultUserId(userId)
			.stream()
			.map(consult -> modelMapper.map(consult, DoctorConsultCardResponse.class))
			.toList();
	}

	/*
	* 상담 기록 상세 조회
	* -> 유저가 자신의 기록을 상세 조회
	* */
	public ConsultDetailResponse getConsultDetail(Long counselingId){
		//의사 및 상담 정보
		DoctorConsultCardResponse cardResponse = consultRepository.findDoctorByCounselingId(counselingId);

		ConsultDetailResponse detailResponse = ConsultDetailResponse.builder()
			.counselingId(cardResponse.getCounselingId())
			.userId(cardResponse.getUserId())
			.doctorName(cardResponse.getName())
			.location(cardResponse.getLocation())
			.department(cardResponse.getDepartment())
			.profilePhoto(cardResponse.getProfilePhoto())
			.reserveDate(cardResponse.getReserveDate())
			.prescriptionPath(cardResponse.getPrescriptionPath())
			.userName(userInfoRepository.findByUserUserId(cardResponse.getUserId()).getName())
			.build();

		return detailResponse;

	}
	
	/*
	* 처방전 다운로드
	* */
	@Async
	public InputStreamResource downloadPrescription(String prescriptionPath){
		try{
			//resources 폴더 안
			File file = new ClassPathResource(prescriptionPath).getFile();

			if(file.exists() && !file.isDirectory()){
				System.out.println("There is a file");
			}else{
				System.out.println("There is no file");
			}
		}catch (Exception e){
			e.printStackTrace();
		}
		//prescriptionPath 예: "/pdf/sample.pdf"
		return new InputStreamResource(
			Objects.requireNonNull(getClass().getResourceAsStream(prescriptionPath)));
	}

}
