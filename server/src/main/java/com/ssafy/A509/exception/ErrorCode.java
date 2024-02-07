package com.ssafy.A509.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {

    /**
     * ******************************* Global Error CodeList ***************************************
     * HTTP Status Code
     * 400 : Bad Request
     * 401 : Unauthorized
     * 403 : Forbidden
     * 404 : Not Found
     * 500 : Internal Server Error
     * *********************************************************************************************
     */
    // 잘못된 서버 요청
    BAD_REQUEST_ERROR(400, "G001", "Bad Request Exception"),

    // @RequestBody 데이터 미 존재
    REQUEST_BODY_MISSING_ERROR(400, "G002", "Required request body is missing"),

    // 유효하지 않은 타입
    INVALID_TYPE_VALUE(400, "G003", " Invalid Type Value"),

    // Request Parameter 로 데이터가 전달되지 않을 경우
    MISSING_REQUEST_PARAMETER_ERROR(400, "G004", "Missing Servlet RequestParameter Exception"),

    // 입력/출력 값이 유효하지 않음
    IO_ERROR(400, "G005", "I/O Exception"),

    // com.fasterxml.jackson.core Processing Error
    JACKSON_PROCESS_ERROR(400, "G006", "com.fasterxml.jackson.core Exception"),

    // 권한이 없음
    FORBIDDEN_ERROR(403, "G007", "Forbidden Exception"),

    // 서버로 요청한 리소스가 존재하지 않음
    NOT_FOUND_ERROR(404, "G008", "Not Found Exception"),

    // NULL Point Exception 발생
    NULL_POINT_ERROR(404, "G009", "Null Point Exception"),

    // @RequestBody 및 @RequestParam, @PathVariable 값이 유효하지 않음
    NOT_VALID_ERROR(404, "G010", "Handle Validation Exception"),

    // @RequestBody 및 @RequestParam, @PathVariable 값이 유효하지 않음
    NOT_VALID_HEADER_ERROR(404, "G011", "Header에 데이터가 존재하지 않는 경우 "),

    // 서버가 처리 할 방법을 모르는 경우 발생
    INTERNAL_SERVER_ERROR(500, "G999", "Internal Server Error Exception"),

    // 데이터 중복
    DUPLICATE_KEY_ERROR(400, "G012", "이미 존재하는 값입니다"),

    //******************************* Custom Error CodeList ***************************************

    INSERT_ERROR(200, "1000", "Insert Transaction Error Exception"),

    UPDATE_ERROR(200, "1001", "Update Transaction Error Exception"),

    DELETE_ERROR(200, "1002", "Delete Transaction Error Exception"),

    NO_SUCH_DIARY(200, "1003", "DiaryId에 대응하는 Diary가 존재하지 않습니다"),

    NO_SUCH_ACCOUNT(200, "1004", "UserId에 대응하는 User가 존재하지 않습니다"),

    NO_SUCH_RESERVE(200, "1005", "ReserveId에 대응하는 Reserve가 존재하지 않습니다"),

    NO_SUCH_DOCTOR(200, "1006", "DoctorId에 대응하는 Doctor가 존재하지 않습니다"),

    NO_SUCH_PRESCRIPTION(200, "1007", "해당 경로에 Prescription이 존재하지 않습니다"),

    NO_SUCH_FILE_FROM_PATH(200, "1008", "해당 경로에 파일이 존재하지 않습니다"),

    NO_CONSULT_DETAIL(200, "1009", "CounselingId에 해당하는 의사 정보가 없습니다"),

    NO_PATIENT_INFO(200, "1010", "ReserveId에 해당하는 환자의 정보가 존재하지 않습니다"),

    CONTENT_TYPE_FILE_MISMATCH(200, "1011", "해당 파일의 content type이 올바르지 않습니다"),

    UNABLE_TO_UPLOAD_FILE(200, "1012", "해당 경로에 파일을 업로드할 수 없습니다"),

    NO_SUCH_PROFILE(200, "1013", "UserId에 대응하는 Profile이 존재하지 않습니다"),

    NOT_DOCTOR(200, "1014", "UserId에 대응하는 Doctor가 없습니다"),

    ROLE_IS_NOT_COMMON(200, "1015", "해당 User의 Role이 Common이 아닙니다"),

    // 비밀번호가 일치하지 않는 경우
    ILLEGAL_ARGUMENT_ERROR(401, "1016", "비밀번호가 일치하지 않습니다"),

    NO_USER_INFO_CREATED(200, "1017", "UserId에 대응하는 UserInfo가 없습니다"),

    NO_SUCH_USER_INFO(200, "1018", "UserInfoId에 대응하는 UserInfo가 없습니다"),

    NO_SUCH_BOARD(200, "1019", "boardId에 대응하는 게시글이 존재하지 않습니다"),

    NO_COMMENT_USER(200, "1020", "해당 댓글을 작성한 사용자를 알 수 없습니다"),

    NO_SUCH_COMMENT(200, "1021", "commentId에 대응하는 댓글이 존재하지 않습니다"),

    NO_SUCH_FOLLOWER(200, "1202", "followerUserId에 대응하는 팔로워가 없습니다"),

    UNABLE_FOLLOW_YOURSELF(200, "1203", "자시 자신을 follow할 수 없습니다"),

    ALREADY_FOLLOWING_USER(200, "1204", "해당 유저를 이미 follow 중입니다"),

    NOT_FOLLOWING_USER(200, "1205", "해당 유저와 follow 중이 아닙니다"),

    NO_SUCH_BOARD_LIKE(200, "1206", "해당 게시물의 좋아요는 없습니다"),

    NO_SUCH_COMMENT_LIKE(200, "1207", "해당 댓글의 좋아요는 없습니다"),

    FILE_DELETE_FAILED(200, "1208", "파일의 삭제가 정상적으로 이루어지지 않았습니다"),

    RESERVE_MISMATCH_USER(400, "1209", "상담을 받는 유저와 처방을 받는 유저가 일치하지 않습니다"),

    RESERVE_CONSULT_EXIST(400, "1210", "이미 상담을 받았습니다"),

    ; // End


    //******************************* Error Code Constructor ***************************************

    // 에러 코드의 '코드 상태'를 반환한다.
    private final int status;

    // 에러 코드의 '코드간 구분 값'을 반환한다.
    private final String divisionCode;

    // 에러 코드의 '코드 메시지'를 반환한다.
    private final String message;

    // 생성자 구성
    ErrorCode(final int status, final String divisionCode, final String message) {
        this.status = status;
        this.divisionCode = divisionCode;
        this.message = message;
    }
}
