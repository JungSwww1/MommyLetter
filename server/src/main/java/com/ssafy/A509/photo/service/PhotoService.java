package com.ssafy.A509.photo.service;

import com.ssafy.A509.exception.CustomException;
import com.ssafy.A509.exception.ErrorCode;
import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class PhotoService {

	@Value("${path.upload.url}")
	private String uploadPath;

	/*
	* 사진을 파일에 저장, 저장 경로 리스트를 반환
	* 사진이 없는 경우에는 Empty
	* 사진이 아닌 파일의 경우 null
	* */
	public List<String> getImagePathList(List<MultipartFile> uploadFiles, String newPath){

		List<String> resultPath = new ArrayList<>();

		//폴더 생성
		File uploadFolder = new File(uploadPath + newPath);
		if(!uploadFolder.exists()){
			boolean mkdir = uploadFolder.mkdirs();
			System.out.println("파일 생성: " + mkdir);
		}

		for(MultipartFile uploadFile : uploadFiles){

			Path savePath = makePath(uploadFile);

			//이미지 저장
			try{
				uploadFile.transferTo(savePath);
				resultPath.add(savePath.toString());
			} catch (Exception e) {
				e.printStackTrace();
				throw new CustomException(ErrorCode.UNABLE_TO_UPLOAD_FILE,
					"uploadPath: " + uploadPath);
			}

		}

		return resultPath;
	}

	public String getImagePath(MultipartFile uploadFile, String newPath){
		//폴더 생성
		File uploadFolder = new File(uploadPath + newPath);
		if(!uploadFolder.exists()){
			boolean mkdir = uploadFolder.mkdirs();
			System.out.println("파일 생성: " + mkdir);
		}

		Path savePath = makePath(uploadFile);

		try{
			uploadFile.transferTo(savePath);
			return savePath.toString();
		} catch (Exception e) {
			e.printStackTrace();
			throw new CustomException(ErrorCode.UNABLE_TO_UPLOAD_FILE,
				"uploadPath: " + uploadPath);
		}
	}

	private Path makePath(MultipartFile uploadFile){
		// 이미지 파일만 업로드
		if (!Objects.requireNonNull(uploadFile.getContentType()).startsWith("image")) {
			throw new CustomException(ErrorCode.CONTENT_TYPE_IMAGE_MISMATCH,
				"Content Type: " + uploadFile.getContentType());
		}

		//파일 원본 이름
		String originalName = uploadFile.getOriginalFilename();
		//중복을 회피하기 위한 파일 이름 변경
		String savedName = UUID.randomUUID().toString() + "_" + originalName;
		return Paths.get(uploadPath + File.separator + savedName);
	}


}
