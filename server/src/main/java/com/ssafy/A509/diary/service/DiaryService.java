package com.ssafy.A509.diary.service;

import com.ssafy.A509.account.repository.AccountRepository;
import com.ssafy.A509.diary.dto.CreateDiaryRequest;
import com.ssafy.A509.diary.dto.DiaryResponse;
import com.ssafy.A509.diary.dto.UpdateDiaryRequest;
import com.ssafy.A509.diary.model.Diary;
import com.ssafy.A509.diary.repository.DiaryRepository;
import com.ssafy.A509.photo.dto.CreatePhotoRequest;
import com.ssafy.A509.photo.model.Photo;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
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
        return diaryRepository.findAllByUserUserId(userId).stream()
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

        addPhotos(newDiary, diaryRequest);

        Diary save = diaryRepository.save(newDiary);

        return getDiaryResponse(save);
    }

    @Transactional
    public void updateDiary(UpdateDiaryRequest diaryRequest){
        System.out.println(diaryRequest.getDiaryId()+ " "  + diaryRequest.getEmoji() + diaryRequest.getContent());
        diaryRepository.findById(diaryRequest.getDiaryId())
            .ifPresentOrElse(diary -> {
                diary.setContent(diaryRequest.getContent());
                diary.setEmoji(diaryRequest.getEmoji());

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

    private void addPhotos(Diary diary, CreateDiaryRequest diaryRequest) {
        Optional.ofNullable(diaryRequest.getPhotoList()).ifPresent(list -> {
            for(CreatePhotoRequest photoRequest : list) {
                Photo photo = Photo.builder()
                    .path(photoRequest.getPath())
                    .size(100)
                    .build();

                diary.addPhoto(photo);
            }
        });
    }

}
