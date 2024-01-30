package com.ssafy.A509.profile.dto;

import com.ssafy.A509.account.model.History;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
public class DoctorProfileResponse {

    @NotBlank
    private Long userId;
    @NotBlank
    private Long doctorId;
    @NotBlank
    private String name;
    @NotBlank
    private String location;
    @NotBlank
    private List<String> historyList;
    @NotBlank
    private String department;
    @NotBlank
    private String validTime;
    private String profilePhoto;
    private String backgroundPhoto;

    public DoctorProfileResponse(Long userId, Long doctorId, String name, String location, List<String> historyList, String department, String validTime, String profilePhoto, String backgroundPhoto) {
        this.userId = userId;
        this.doctorId = doctorId;
        this.name = name;
        this.location = location;
        this.historyList = historyList;
        this.department = department;
        this.validTime = validTime;
        this.profilePhoto = profilePhoto;
        this.backgroundPhoto = backgroundPhoto;
    }

    public void setHistoryList(List<History> histories) {
        // histories 리스트에서 각 History 객체의 content를 추출하여 historyList에 추가
        this.historyList = histories.stream()
                .map(History::getContent)
                .collect(Collectors.toList());
    }
}
