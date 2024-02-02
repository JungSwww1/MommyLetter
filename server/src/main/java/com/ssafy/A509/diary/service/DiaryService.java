package com.ssafy.A509.diary.service;
import com.ssafy.A509.account.repository.AccountRepository;
import com.ssafy.A509.diary.dto.CreateDiaryRequest;
import com.ssafy.A509.diary.dto.CreateEmoticonRequest;
import com.ssafy.A509.diary.dto.DiaryResponse;
import com.ssafy.A509.diary.dto.UpdateDiaryRequest;
import com.ssafy.A509.diary.dto.UpdateEmoticonRequest;
import com.ssafy.A509.diary.model.Diary;
import com.ssafy.A509.diary.model.Emoticon;
import com.ssafy.A509.diary.model.Emotion;
import com.ssafy.A509.diary.model.EmotionEmoticon;
import com.ssafy.A509.diary.model.Family;
import com.ssafy.A509.diary.model.FamilyEmoticon;
import com.ssafy.A509.diary.model.Health;
import com.ssafy.A509.diary.model.HealthEmoticon;
import com.ssafy.A509.diary.model.People;
import com.ssafy.A509.diary.model.PeopleEmoticon;
import com.ssafy.A509.diary.model.Weather;
import com.ssafy.A509.diary.model.WeatherEmoticon;
import com.ssafy.A509.diary.repository.DiaryRepository;
import com.ssafy.A509.diary.repository.EmoticonRepository;
import com.ssafy.A509.diary.repository.EmotionEmoticonRepository;
import com.ssafy.A509.diary.repository.FamilyEmoticonRepository;
import com.ssafy.A509.diary.repository.HealthEmoticonRepository;
import com.ssafy.A509.diary.repository.PeopleEmoticonRepository;
import com.ssafy.A509.diary.repository.WeatherEmoticonRepository;
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
    private final EmoticonRepository emoticonRepository;
    private final EmotionEmoticonRepository emotionEmoticonRepository;
    private final FamilyEmoticonRepository familyEmoticonRepository;
    private final HealthEmoticonRepository healthEmoticonRepository;
    private final PeopleEmoticonRepository peopleEmoticonRepository;
    private final WeatherEmoticonRepository weatherEmoticonRepository;

    //Diary와 DiaryResponse 매핑
    private DiaryResponse getDiaryResponse(Diary diary){
        return modelMapper.map(diary, DiaryResponse.class);
    }
    //일기 리스트 전체 조회
    public List<DiaryResponse> getAllDiary(Long userId){
        return diaryRepository.findAllByUserUserIdOrderByCreatedDate(userId).stream()
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
        addEmoticons(newDiary, diaryRequest);

        Diary save = diaryRepository.save(newDiary);
        return getDiaryResponse(save);
    }
    @Transactional
    public void updateDiary(UpdateDiaryRequest diaryRequest){
        Diary diary = findById(diaryRequest.getDiaryId());
        diary.setContent(diaryRequest.getContent());
        diary.setEmoji(diaryRequest.getEmoji());
        diary.setCreatedDate(diaryRequest.getCreatedDate());
        updatePhoto(diary, diaryRequest);
        updateEmoticon(diary, diaryRequest);
        diaryRepository.save(diary);
    }
    @Transactional
    public void deleteDiary(Long diaryId){
        diaryRepository.delete(findById(diaryId));
    }
    /*
    * 사진 업데이트
    * */
    public void updatePhoto(Diary diary, UpdateDiaryRequest diaryRequest){
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


    }
    
    /*
    * 이모티콘 업데이트
    * */
    public void updateEmoticon(Diary diary, UpdateDiaryRequest diaryRequest){
        //기존 이모티콘
        Emoticon emoticon = diary.getEmoticon();
        //들어온 이모티콘 리스트
        UpdateEmoticonRequest newEmoticon = diaryRequest.getEmoticonRequest();
        // 삭제할 이모티콘 리스트
        Emoticon deleteEmoticon = Emoticon.builder().build();


        updateEmotion(emoticon, newEmoticon,deleteEmoticon);
        updateFamily(emoticon, newEmoticon,deleteEmoticon);
        updateHealth(emoticon, newEmoticon,deleteEmoticon);
        updatePeople(emoticon, newEmoticon,deleteEmoticon);
        updateWeather(emoticon, newEmoticon,deleteEmoticon);
    }


    private void updateWeather(Emoticon emoticon, UpdateEmoticonRequest newEmoticon, Emoticon deleteEmoticon) {
        List<Weather> newWeatherList = newEmoticon.getWeatherList();
        List<WeatherEmoticon> weatherList = new ArrayList<>(emoticon.getWeatherEmoticon());
        newWeatherList.stream()
            .filter(newWeather-> emoticon.getWeatherEmoticon().stream()
                .noneMatch(existingWeather -> existingWeather.getWeather().equals(newWeather)))
            .map(newWeather -> WeatherEmoticon.builder().weather(newWeather).build())
            .forEach(emoticon::addWeather);
        weatherList.stream()
            .filter(existingWeather -> newWeatherList.stream()
                .noneMatch(newWeather -> newWeather.equals(existingWeather.getWeather())))
            .forEach(
                weatherEmoticon -> {
                    emoticon.getWeatherEmoticon().remove(weatherEmoticon);
                    deleteEmoticon.getWeatherEmoticon().add(weatherEmoticon);
                }
            );
        if(!deleteEmoticon.getWeatherEmoticon().isEmpty()){
            weatherEmoticonRepository.deleteAllInBatch(deleteEmoticon.getWeatherEmoticon());
        };
    }
    private void updatePeople(Emoticon emoticon, UpdateEmoticonRequest newEmoticon, Emoticon deleteEmoticon) {
        List<People> newPeopleList = newEmoticon.getPeopleList();
        List<PeopleEmoticon> peopleList = new ArrayList<>(emoticon.getPeopleEmoticon());
        newPeopleList.stream()
            .filter(newPeople-> emoticon.getPeopleEmoticon().stream()
                .noneMatch(existingPeople -> existingPeople.getPeople().equals(newPeople)))
            .map(newPeople -> PeopleEmoticon.builder().people(newPeople).build())
            .forEach(emoticon::addPeople);
        peopleList.stream()
            .filter(existingPeople -> newPeopleList.stream()
                .noneMatch(newPeople -> newPeople.equals(existingPeople.getPeople())))
            .forEach(
                peopleEmoticon -> {
                    emoticon.getPeopleEmoticon().remove(peopleEmoticon);
                    deleteEmoticon.getPeopleEmoticon().add(peopleEmoticon);
                }
            );
        if(!deleteEmoticon.getPeopleEmoticon().isEmpty()){
            peopleEmoticonRepository.deleteAllInBatch(deleteEmoticon.getPeopleEmoticon());
        };
        
    }
    private void updateHealth(Emoticon emoticon, UpdateEmoticonRequest newEmoticon, Emoticon deleteEmoticon) {
        List<Health> newHealthList = newEmoticon.getHealthList();
        List<HealthEmoticon> healthList = new ArrayList<>(emoticon.getHealthEmoticon());
        newHealthList.stream()
            .filter(
                newHealth ->
                    emoticon.getHealthEmoticon().stream()
                        .noneMatch(existingHealth -> existingHealth.getHealth().equals(newHealth)))
            .map(newHealth -> HealthEmoticon.builder().health(newHealth).build())
            .forEach(emoticon::addHealth);
        healthList.stream()
            .filter(existingHealth -> newHealthList.stream()
                .noneMatch(newHealth -> newHealth.equals(existingHealth.getHealth())))
            .forEach(
                healthEmoticon -> {
                    emoticon.getHealthEmoticon().remove(healthEmoticon);
                    deleteEmoticon.getHealthEmoticon().add(healthEmoticon);
                }
            );
        if(!deleteEmoticon.getHealthEmoticon().isEmpty()){
            healthEmoticonRepository.deleteAllInBatch(deleteEmoticon.getHealthEmoticon());
        };
    }
    private void updateEmotion(Emoticon emoticon, UpdateEmoticonRequest newEmoticon, Emoticon deleteEmoticon){
        List<Emotion> newEmotionList = newEmoticon.getEmotionList();
        List<EmotionEmoticon> emotionList = new ArrayList<>(emoticon.getEmotionEmoticon());
        //추가
        newEmotionList.stream()
            .filter(newEmotion -> emoticon.getEmotionEmoticon().stream()
                .noneMatch(existingEmotion -> existingEmotion.getEmotion().equals(newEmotion)))
            .map(newEmotion -> EmotionEmoticon.builder().emotion(newEmotion).build())
            .forEach(emoticon::addEmotion);
        //삭제
        emotionList.stream()
            .filter(existingEmotion -> newEmotionList.stream()
                .noneMatch(newEmotion -> newEmotion.equals(existingEmotion.getEmotion())))
            .forEach(
                emotionEmoticon -> {
                    emoticon.getEmotionEmoticon().remove(emotionEmoticon);
                    deleteEmoticon.getEmotionEmoticon().add(emotionEmoticon);
                }
            );
        if(!deleteEmoticon.getEmotionEmoticon().isEmpty()){
            emotionEmoticonRepository.deleteAllInBatch(deleteEmoticon.getEmotionEmoticon());
        };
    }
    private void updateFamily(Emoticon emoticon, UpdateEmoticonRequest newEmoticon, Emoticon deleteEmoticon){
        List<Family> newFamilyList = newEmoticon.getFamilyList();
        List<FamilyEmoticon> familyList = new ArrayList<>(emoticon.getFamilyEmoticon());
        newFamilyList.stream()
           .filter(
              newFamily ->
                  emoticon.getFamilyEmoticon().stream()
                      .noneMatch(existingFamily -> existingFamily.getFamily().equals(newFamily)))
          .map(newFamily -> FamilyEmoticon.builder().family(newFamily).build())
          .forEach(emoticon::addFamily);
        //삭제
        familyList.stream()
            .filter(existingFamily -> newFamilyList.stream()
                .noneMatch(newFamily -> newFamily.equals(existingFamily.getFamily())))
            .forEach(
                familyEmoticon -> {
                    emoticon.getFamilyEmoticon().remove(familyEmoticon);
                    deleteEmoticon.getFamilyEmoticon().add(familyEmoticon);
                }
            );
        if(!deleteEmoticon.getFamilyEmoticon().isEmpty()){
            familyEmoticonRepository.deleteAllInBatch(deleteEmoticon.getFamilyEmoticon());
        };

    }
    /*
    * 사진 추가
    * */
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


    /*
    * 이모티콘 추가
    * */
    private void addEmoticons(Diary diary, CreateDiaryRequest diaryRequest) {
        Optional.ofNullable(diaryRequest.getEmoticon()).ifPresent(emoticonRequest -> {
                Emoticon emoticon = Emoticon.builder().build();
                addEmotion(emoticon, emoticonRequest);
                addFamily(emoticon, emoticonRequest);
                addHealth(emoticon, emoticonRequest);
                addPeople(emoticon, emoticonRequest);
                addWeather(emoticon, emoticonRequest);
                diary.addEmoticon(emoticon);
        });
    }
    private void addEmotion(Emoticon emoticon, CreateEmoticonRequest emoticonRequest){
        Optional.ofNullable(emoticonRequest.getEmotionList()).ifPresent(list -> {
            for(Emotion emotion : list){
                EmotionEmoticon emotionEmoticon = EmotionEmoticon.builder()
                    .emotion(emotion)
                    .build();
                emoticon.addEmotion(emotionEmoticon);
            }
        });
    }
    private void addFamily(Emoticon emoticon, CreateEmoticonRequest emoticonRequest){
        Optional.ofNullable(emoticonRequest.getFamilyList()).ifPresent(list -> {
            for(Family family : list){
                FamilyEmoticon familyEmoticon = FamilyEmoticon.builder()
                    .family(family)
                    .build();
                emoticon.addFamily(familyEmoticon);
            }
        });
    }
    private void addHealth(Emoticon emoticon, CreateEmoticonRequest emoticonRequest){
        Optional.ofNullable(emoticonRequest.getHealthList()).ifPresent(list -> {
            for(Health health : list){
                HealthEmoticon healthEmoticon = HealthEmoticon.builder()
                    .health(health)
                    .build();
                emoticon.addHealth(healthEmoticon);
            }
        });
    }
    private void addPeople(Emoticon emoticon, CreateEmoticonRequest emoticonRequest){
        Optional.ofNullable(emoticonRequest.getPeopleList()).ifPresent(list -> {
            for(People people : list){
                PeopleEmoticon peopleEmoticon = PeopleEmoticon.builder()
                    .people(people)
                    .build();
                emoticon.addPeople(peopleEmoticon);
            }
        });
    }
    private void addWeather(Emoticon emoticon, CreateEmoticonRequest emoticonRequest){
        Optional.ofNullable(emoticonRequest.getWeatherList()).ifPresent(list -> {
            for(Weather weather : list){
                WeatherEmoticon weatherEmoticon = WeatherEmoticon.builder()
                    .weather(weather)
                    .build();
                emoticon.addWeather(weatherEmoticon);
            }
        });
    }

    private Diary findById(Long diaryId){
        return diaryRepository.findById(diaryId).orElseThrow(()
            -> new NoSuchElementException("No such Diary"));
    }
}