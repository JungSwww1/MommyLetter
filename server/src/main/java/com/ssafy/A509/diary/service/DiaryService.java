package com.ssafy.A509.diary.service;

import com.ssafy.A509.account.repository.AccountRepository;
import com.ssafy.A509.diary.dto.CreateDiaryRequest;
import com.ssafy.A509.diary.dto.DiaryResponse;
import com.ssafy.A509.diary.dto.UpdateDiaryRequest;
import com.ssafy.A509.diary.model.Diary;
import com.ssafy.A509.diary.repository.DiaryRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DiaryService {

  private final DiaryRepository diaryRepository;
  private final ModelMapper modelMapper;
  private final AccountRepository accountRepository;

  //Diary와 DiaryResponse 매핑
  private DiaryResponse getDiaryResponse(Diary diary){
    return modelMapper.map(diary, DiaryResponse.class);
  }
  
  //일기 리스트 전체 조회
  public List<DiaryResponse> getAllDiary(Long userId){
    return diaryRepository.findAllByUserId(userId).stream()
        .map(diary -> modelMapper.map(diary, DiaryResponse.class))
        .collect(Collectors.toList());
  }

  //특정 일기 조회
  public DiaryResponse getDiary(Long diaryId){
    return diaryRepository
        .findById(diaryId)
        .map(this::getDiaryResponse)
        .orElseThrow(() -> new NoSuchElementException("No such Diary"));
  }

  @Transactional
  public DiaryResponse createDiary(CreateDiaryRequest diaryRequest){
    Diary newDiary = Diary.builder()
        .user(accountRepository.findById(diaryRequest.getUserId())
          .orElseThrow())
        .content(diaryRequest.getContent())
        .category(diaryRequest.getCategory())
        .emoji(diaryRequest.getEmoji())
        .build();

    Diary diary = diaryRepository.save(newDiary);

    return getDiaryResponse(diary);
  }

  @Transactional
  public void updateDiary(UpdateDiaryRequest diaryRequest){
    diaryRepository.findById(diaryRequest.getDiaryId())
        .ifPresentOrElse(diary -> {
          diary.setContent(diary.getContent());
          diary.setEmoji(diary.getEmoji());

          diaryRepository.save(diary);
        }, ()->{
          throw new NoSuchElementException("No such Diary");
        });
  }

  @Transactional
  public void deleteDiary(Long diaryId){
    diaryRepository.findById(diaryId)
        .ifPresentOrElse(
            diaryRepository::delete,
            () -> {throw new NoSuchElementException("No such Diary");}
        );
  }

}
