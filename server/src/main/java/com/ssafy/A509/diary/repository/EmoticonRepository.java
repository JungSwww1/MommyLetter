<<<<<<< PATCH SET (c36cdb :art: Feat: Divide Emoticons into 5 Different Tables)
<<<<<<< PATCH SET (f73de4 :art: Feat: Divide Emoticons into 5 Different Tables)
package com.ssafy.A509.diary.repository;

import com.ssafy.A509.diary.model.Emoticon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmoticonRepository extends JpaRepository<Emoticon, Long> {

	Emoticon findByDiaryDiaryId(Long diaryId);
}
=======
>>>>>>> BASE      (064008 :bug: Fix: fix board, comment controller and add explanation)
=======
package com.ssafy.A509.diary.repository;

import com.ssafy.A509.diary.model.Emoticon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmoticonRepository extends JpaRepository<Emoticon, Long> {

}
>>>>>>> BASE      (12c0ba :art: Feat: Add Emoticon Features)
