package com.ssafy.A509.account.repository;

import com.ssafy.A509.account.model.User;
import com.ssafy.A509.doctor.dto.PatientResponse;
import java.util.List;
import java.util.Optional;

import com.ssafy.A509.profile.dto.UserProfileResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    boolean existsByNickname(String nickname);

    @Query(
        "SELECT NEW com.ssafy.A509.doctor.dto.PatientResponse(r.reserveId as reserveId, u.userId as userId, "
            + "r.doctor.doctorId as doctorId, "
            + "ui.name as name, p.profilePhoto as profilePhoto, ui.phone as phone, ui.SSN as SSN, "
            + "u.gender as gender, ui.pregnancyStatus as status, ui.extra as extra, "
            + "ui.diaryOpen as diaryOpen, r.reserveDate as reserveDate ) "
            + "FROM User u "
            + "RIGHT JOIN Reserve r ON u.userId = r.user.userId "
            + "LEFT JOIN UserInfo ui ON u.userId = ui.user.userId "
            + "LEFT JOIN Profile p ON u.userId = p.userId "
            + "WHERE r.doctor.doctorId = :doctorId "
            + "ORDER BY r.reserveDate DESC ")
    List<PatientResponse> findPatientByReserveDoctorId(Long doctorId);

    @Query(
        "SELECT NEW com.ssafy.A509.doctor.dto.PatientResponse(r.reserveId as reserveId, u.userId as userId, "
            + "r.doctor.doctorId as doctorId, "
            + "ui.name as name, p.profilePhoto as profilePhoto, ui.phone as phone, ui.SSN as SSN, "
            + "u.gender as gender, ui.pregnancyStatus as status, ui.extra as extra, "
            + "ui.diaryOpen as diaryOpen, r.reserveDate as reserveDate ) "
            + "FROM User u "
            + "RIGHT JOIN Reserve r ON u.userId = r.user.userId "
            + "LEFT JOIN Profile p ON u.userId = p.userId "
            + "LEFT JOIN UserInfo ui ON u.userId = ui.user.userId "
            + "WHERE r.reserveId = :reserveId "
    )
    PatientResponse findPatientByReserveReserveId(Long reserveId);

    Optional<User> findByEmail(String email);
    User findByNickname(String nickname);

    @Query("SELECT NEW com.ssafy.A509.profile.dto.UserProfileResponse(u.userId, u.nickname, p.profilePhoto) FROM User u LEFT JOIN Profile p ON u.userId = p.userId WHERE u.nickname LIKE %:nickname%")
    List<UserProfileResponse> findUserProfilesByNickname(@Param("nickname") String nickname);

}
