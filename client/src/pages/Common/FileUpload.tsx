// 허용가능한 확장자 목록!
const ALLOW_FILE_EXTENSION = "jpg,jpeg,png";
const FILE_SIZE_MAX_LIMIT = 10 * 1024 * 1024;  // 5MB
export const fileExtensionValid = ({name,size} : {name : string; size:number}):boolean =>{
    // 파일 확장자
    const extension = removeFileName(name);
    if(!(ALLOW_FILE_EXTENSION.indexOf(extension) > -1) || extension === '') {
        alert("올릴 수 없는 파일입니다.")
        return false;
    }
    if (size > FILE_SIZE_MAX_LIMIT) {
        alert("파일 크기가 5MB를 초과합니다.");
        return false;
    }
    return true;
}

export const removeFileName = (originalFileName:string):string => {
    // 마지막 .의 위치를 구한다
    // 마지막 .의 위치다음이 파일 확장자를 의미한다
    const lastIndex = originalFileName.lastIndexOf(".");

    // 파일 이름에서 .이 존재하지 않는 경우이다.
    // 이경우 파일 확장자가 존재하지 않는경우(?)를 의미한다.
    if(lastIndex < 0) {
        return "";
    }

    // substring을 함수를 이용해 확장자만 잘라준다
    // lastIndex의 값은 마지막 .의 위치이기 때문에 해당 위치 다음부터 끝까지 문자열을 잘라준다.
    // 문자열을 자른 후 소문자로 변경시켜 확장자 값을 반환 해준다.
    return originalFileName.substring(lastIndex+1).toLowerCase();
}