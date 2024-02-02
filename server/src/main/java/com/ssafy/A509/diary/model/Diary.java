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
import jakarta.persistence.OneToOne;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
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

<<<<<<< PATCH SET (c36cdb :art: Feat: Divide Emoticons into 5 Different Tables)
<<<<<<< PATCH SET (f73de4 :art: Feat: Divide Emoticons into 5 Different Tables)
    @OneToOne(mappedBy = "diary", cascade = CascadeType.ALL)
    private Emoticon emoticon;

    @Setter
=======
>>>>>>> BASE      (064008 :bug: Fix: fix board, comment controller and add explanation)
=======
    @OneToMany(mappedBy = "diary", cascade = CascadeType.ALL)
    private List<Emoticon> emoticonList = new ArrayList<>();

    @Setter
>>>>>>> BASE      (12c0ba :art: Feat: Add Emoticon Features)
    private String content;

    @Enumerated(EnumType.STRING)
    private Category category;

    @Setter
    private int emoji;

    @Setter
    @CreatedDate
    private LocalDateTime createdDate;

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

    public void addPhoto(Photo photo) {
        this.photoList.add(photo);
        photo.setDiary(this);
    }

<<<<<<< PATCH SET (c36cdb :art: Feat: Divide Emoticons into 5 Different Tables)
<<<<<<< PATCH SET (f73de4 :art: Feat: Divide Emoticons into 5 Different Tables)
    public void addEmoticon(Emoticon emoticon){
        this.emoticon = emoticon;
        emoticon.setDiary(this);
    }

=======
>>>>>>> BASE      (064008 :bug: Fix: fix board, comment controller and add explanation)
=======
    public void addEmoticon(Emoticon emoticon){
        this.emoticonList.add(emoticon);
        emoticon.setDiary(this);
    }

>>>>>>> BASE      (12c0ba :art: Feat: Add Emoticon Features)
}
