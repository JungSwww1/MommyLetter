package com.ssafy.A509.diary.service;

import com.ssafy.A509.account.repository.AccountRepository;
import com.ssafy.A509.diary.dto.CreateDiaryRequest;
import com.ssafy.A509.diary.dto.DiaryResponse;
import com.ssafy.A509.diary.dto.UpdateDiaryRequest;
import com.ssafy.A509.diary.model.Diary;
import com.ssafy.A509.diary.repository.DiaryRepository;
import com.ssafy.A509.photo.dto.CreatePhotoRequest;
import com.ssafy.A509.photo.model.Photo;
import com.ssafy.A509.photo.repository.PhotoRepository;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
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
    private final PhotoRepository photoRepository;

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
            .createdDate(diaryRequest.getCreatedDate())
            .build();

        addPhotos(newDiary, diaryRequest);

        Diary save = diaryRepository.save(newDiary);

        return getDiaryResponse(save);
    }

    @Transactional
    public void updateDiary(UpdateDiaryRequest diaryRequest){
        Diary diary = findById(diaryRequest.getDiaryId());
        diary.setContent(diaryRequest.getContent());
        diary.setEmoji(diaryRequest.getEmoji());

        //사진리스트 수정
        List<Photo> photoList = new ArrayList<>(diary.getPhotoList());
        List<String> newPhotoList = Optional.ofNullable(diaryRequest.getPhotoList())
            .orElseGet(ArrayList::new);
        List<Photo> deletePhotoList = new ArrayList<>();

        //사진 추가
        newPhotoList.stream()
            .filter(newPhoto -> photoList.stream()
                .noneMatch(existingPhoto -> existingPhoto.getPath().equals(newPhoto)))
            .map(newPhoto -> Photo.builder().path(newPhoto).build())
            .forEach(diary::addPhoto);

        //사진 삭제
        photoList.stream()
            .filter(existingPhoto -> newPhotoList.stream()
                .noneMatch(newPhoto -> newPhoto.equals(existingPhoto.getPath())))
            .forEach(
                photo -> {
                    diary.getPhotoList().remove(photo);
                    deletePhotoList.add(photo);
                }
            );

        if(!deletePhotoList.isEmpty()){
            photoRepository.deleteAllInBatch(deletePhotoList);
        }

        diaryRepository.save(diary);
    }

    @Transactional
    public void deleteDiary(Long diaryId){
        diaryRepository.delete(findById(diaryId));
    }

    private void addPhotos(Diary diary, CreateDiaryRequest diaryRequest) {
        Optional.ofNullable(diaryRequest.getPhotoList()).ifPresent(list -> {
            for(CreatePhotoRequest photoRequest : list) {
                Photo photo = Photo.builder()
                    .path(photoRequest.getPath())
                    .build();

                diary.addPhoto(photo);
            }
        });
    }

    private Diary findById(Long diaryId){
        return diaryRepository.findById(diaryId).orElseThrow(()
            -> new NoSuchElementException("No such Diary"));
    }

}
