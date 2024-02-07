package com.ssafy.A509.consult.service;

import com.ssafy.A509.account.repository.AccountRepository;
import com.ssafy.A509.account.repository.UserInfoRepository;
import com.ssafy.A509.consult.dto.ConsultDetailResponse;
import com.ssafy.A509.consult.dto.CreateReserveResponse;
import com.ssafy.A509.consult.dto.DoctorConsultCardResponse;
import com.ssafy.A509.doctor.dto.ReserveResponse;
import com.ssafy.A509.doctor.model.Consult;
import com.ssafy.A509.doctor.model.Reserve;
import com.ssafy.A509.doctor.repository.ConsultRepository;
import com.ssafy.A509.doctor.repository.DoctorRepository;
import com.ssafy.A509.doctor.repository.ReserveRepository;
import com.ssafy.A509.exception.CustomException;
import com.ssafy.A509.exception.ErrorCode;
import jakarta.transaction.Transactional;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
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
				.user(accountRepository.findById(reserveResponse.getUserId())
					.orElseThrow(() -> new CustomException(ErrorCode.NO_SUCH_ACCOUNT, "userId: " + reserveResponse.getUserId())))
				.doctor(doctorRepository.findById(reserveResponse.getDoctorId())
					.orElseThrow(() -> new CustomException(ErrorCode.NO_SUCH_DOCTOR, "reserveId: " + reserveResponse.getDoctorId())))
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
		if(!consultRepository.existsByReserveReserveId(reserveId)){
			throw new CustomException(ErrorCode.RESERVE_CONSULT_EXIST);
		}
		reserveRepository.delete(findReserveByReserveId(reserveId));
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

		if(cardResponse == null){
			throw new CustomException(ErrorCode.NO_CONSULT_DETAIL, "counselingId" + counselingId);
		}

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
//	@Async
//	public InputStreamResource downloadPrescription(String prescriptionPath){
//		//prescriptionPath 예: "/pdf/sample.pdf"
//		//절대경로
//		try{
//			Path filePath = Path.of(prescriptionPath);
//			Resource file = new UrlResource(filePath.toUri());
//
//			if(!file.exists()){
//				throw new CustomException(ErrorCode.NO_SUCH_FILE_FROM_PATH, "경로: " + prescriptionPath);
//			}
//
//			InputStream inputStream = new FileInputStream(prescriptionPath);
//
//			return new InputStreamResource(inputStream);
//
//		}catch (MalformedURLException e){
//			throw new CustomException(ErrorCode.NO_SUCH_FILE_FROM_PATH, "경로: " + prescriptionPath);
//		}catch (FileNotFoundException e){
//			throw new CustomException(ErrorCode.NO_SUCH_PRESCRIPTION, "경로: " + prescriptionPath);
//		}
//	}

	private Reserve findReserveByReserveId(Long reserveId) {
		return reserveRepository.findById(reserveId).orElseThrow(()
			-> new CustomException(ErrorCode.NO_SUCH_RESERVE, "reserveId : " + reserveId));
	}

}
