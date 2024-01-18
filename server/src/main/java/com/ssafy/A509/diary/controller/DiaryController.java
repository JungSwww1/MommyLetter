package com.ssafy.A509.diary.controller;

import com.ssafy.A509.diary.dto.CreateDiaryRequest;
import com.ssafy.A509.diary.dto.DiaryResponse;
import com.ssafy.A509.diary.dto.UpdateDiaryRequest;
import com.ssafy.A509.diary.repository.DiaryRepository;
import com.ssafy.A509.diary.service.DiaryService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/diary")
@Tag(name = "Diary", description = "Diary API")
public class DiaryController {
  private final DiaryService diaryService;

  //일기 리스트 전체 조회
  @GetMapping("user/{userId}")
  public ResponseEntity<List<DiaryResponse>> getAllDiary(@NotBlank @PathVariable Long userId){
    return new ResponseEntity<>(diaryService.getAllDiary(userId), HttpStatus.OK);
  }

  //특정 날짜 일기 조회
  @GetMapping("/{diaryId}")
  public ResponseEntity<DiaryResponse> getDiary(@NotBlank @PathVariable Long diaryId){
    return new ResponseEntity<>(diaryService.getDiary(diaryId), HttpStatus.OK);
  }

  //일기작성
  @PostMapping
  public ResponseEntity<Void> createDiary(@Valid @RequestBody CreateDiaryRequest diaryRequest){
    diaryService.createDiary(diaryRequest);
    return new ResponseEntity<>(HttpStatus.CREATED);
  }

  //일기수정
  @PatchMapping("/{diaryId}")
  public ResponseEntity<Void> updateDiary(@Valid UpdateDiaryRequest diaryRequest){
    diaryService.updateDiary(diaryRequest);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @DeleteMapping("/{diaryId}")
  public ResponseEntity<Void> deleteDiary(@NotBlank @PathVariable Long diaryId){
    diaryService.deleteDiary(diaryId);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }


}
