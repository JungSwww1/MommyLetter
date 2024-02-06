package com.ssafy.A509.diary.controller;

import com.ssafy.A509.diary.dto.CreateDiaryRequest;
import com.ssafy.A509.diary.dto.DiaryResponse;
import com.ssafy.A509.diary.dto.UpdateDiaryRequest;
import com.ssafy.A509.diary.service.DiaryService;
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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/diary")
@Tag(name = "Diary", description = "Diary API")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class DiaryController {
    private final DiaryService diaryService;

    @Operation(
        summary = "일기 리스트 전체 조회",
        description = "{userId}를 통해서 산모 및 육아 일기 전체를 조회한다."
    )
    @GetMapping("user/{userId}")
    public ResponseEntity<List<DiaryResponse>> getAllDiary(@NotBlank @PathVariable Long userId) {
        return new ResponseEntity<>(diaryService.getAllDiary(userId), HttpStatus.OK);
    }

    @Operation(
        summary = "일기 조회",
        description = "{diaryId}를 통해서 특정 날짜의 일기를 조회한다."
    )
    @GetMapping("/{diaryId}")
    public ResponseEntity<DiaryResponse> getDiary(@NotBlank @PathVariable Long diaryId) {
        return new ResponseEntity<>(diaryService.getDiary(diaryId), HttpStatus.OK);
    }

    @Operation(
        summary = "일기 작성",
        description = "userId, content, category, emoji, createdDate, photoList, emoticon의 내용이 입력되어야 한다"
    )
//    @PostMapping
//    public ResponseEntity<DiaryResponse> createDiary(@Valid @RequestBody CreateDiaryRequest diaryRequest) {
//		return new ResponseEntity<>(diaryService.createDiary(diaryRequest),HttpStatus.CREATED);
//    }

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<DiaryResponse> createDiary(@Valid @RequestPart CreateDiaryRequest diaryRequest, @RequestPart(required = false) List<MultipartFile> uploadFiles) {
        return new ResponseEntity<>(diaryService.createDiary(diaryRequest, uploadFiles),HttpStatus.CREATED);
    }

    @Operation(
        summary = "일기 수정",
        description = "{diaryId}를 통해서 수정할 일기를 찾는다. content, emoji, photoList, emoticon이 수정될 수 있다.\n"
            + "Request Body 안에도 diaryId가 들어갈 것"
    )
    @PatchMapping("/{diaryId}")
    public ResponseEntity<Void> updateDiary(@Valid @RequestBody UpdateDiaryRequest diaryRequest) {
        diaryService.updateDiary(diaryRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(
        summary = "일기 삭제",
        description = "{diaryId}를 통해서 일기를 삭제한다."
    )
    @DeleteMapping("/{diaryId}")
    public ResponseEntity<Void> deleteDiary(@NotBlank @PathVariable Long diaryId) {
        diaryService.deleteDiary(diaryId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
