

export const FormatDate = (dateString:string) => {
    const date = new Date(dateString);
    const now = new Date();
    const difference = now.getTime() - date.getTime();

    const minutes = Math.floor(difference / (1000 * 60));
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));

    if (minutes < 60) {
        return `${minutes}분 전`;
    } else if (hours < 24) {
        return `${hours}시간 전`;
    } else if (days < 7) {
        return `${days}일 전`;
    } else if (weeks < 4) {
        return `${weeks}주 전`;
    } else {
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
};