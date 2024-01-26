package com.ssafy.A509.diary.model;

import com.ssafy.A509.account.model.User;
import com.ssafy.A509.photo.model.Photo;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Diary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long diaryId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String content;

    @Enumerated(EnumType.STRING)
    private Category category;

    private int emoji;

    @CreatedDate
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime updatedDate;

    @OneToMany(mappedBy = "diary", cascade = CascadeType.ALL)
    private List<Photo> photoList = new ArrayList<>();

    @Builder
    public Diary(User user, String content, Category category, int emoji, LocalDateTime createdDate) {
        this.user = user;
        this.content = content;
        this.category = category;
        this.emoji = emoji;
        this.createdDate = createdDate;
    }

    public void setContent(String content) {
      this.content = content;
    }

    public void setEmoji(int emoji){
      this.emoji = emoji;
    }

    public void addPhoto(Photo photo) {
        this.photoList.add(photo);
        photo.setDiary(this);
    }

}
