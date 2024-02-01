package com.ssafy.A509.photo.service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class PhotoService {

	private String uploadPath = "/upload/";

	/*
	* 사진을 파일에 저장, 저장 경로 리스트를 반환
	* 사진이 없는 경우에는 Empty
	* 사진이 아닌 파일의 경우 null
	* */
	public List<String> getImagePath(List<MultipartFile> uploadFiles){

		List<String> resultPath = new ArrayList<>();

		for(MultipartFile uploadFile : uploadFiles){
			// 이미지 파일만 업로드
			if (!Objects.requireNonNull(uploadFile.getContentType()).startsWith("image")) {
				return null;
			}

			//파일 원본 이름
			String originalName = uploadFile.getOriginalFilename();
			//중복을 회피하기 위한 파일 이름 변경
			String savedName = UUID.randomUUID().toString() + "_" + originalName;

			//폴더 생성
			File uploadFolder = new File(uploadPath);
			if(!uploadFolder.exists()){
				uploadFolder.mkdir();
			}

		}

		String folder = "image";

		return new ArrayList<>();
	}

}
