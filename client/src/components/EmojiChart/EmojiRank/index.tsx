import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { fetchDiary } from "@/apis/diary/DiaryAPI";
import { PhotoProps } from "@/pages/type/types";

interface DiaryReadResponseProps {
    category: string;
    content: string;
    diaryId: number;
    emoji: number;
    photoList: PhotoProps[];
    createdDate: string;
    emoticon: {
        emotionList: string[];
        familyList: string[];
        healthList: string[];
        peopleList: string[];
        weatherList: string[];
    } | null;
}

interface EmojiRanking {
    icon: string;
    count: number;
    rank: number;
}

const EmojiRank: React.FC = () => {
    const [userId, setUserId] = useState<number>();
    const [diaryList, setDiaryList] = useState<DiaryReadResponseProps[]>([]);
    const [emojiRankings, setEmojiRankings] = useState<EmojiRanking[]>([]);
    const param = useParams<{ userId: string }>();

    const path = "/assets/images/";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchDiary(Number(param.userId));
                setDiaryList(response);
            } catch (error) {
                console.error('Error fetching diary:', error);
            }
        };

        if (param.userId) {
            setUserId(Number(param.userId));
            fetchData();
        }
    }, [param]);

    // 주어진 일기 데이터에서 감정 아이콘 순위를 생성하는 함수
    useEffect(() => {
        // 감정 아이콘 배열 생성
        const emojiArr: string[] = [];
        const emotionImg = ["1sad.png", "2lonely.png", "3irritated.png", "4tired.png", "5angry.png", "6soso.png", "7delight.png", "8calm.png", "9delight.png", "10excited.png"];
        for (let i = 0; i < 10; i++) {
            emojiArr[i] = path + emotionImg[i];
        }
        if (diaryList.length > 0) {
            const emojiCounts: { [icon: string]: number } = {};
            diaryList.forEach(diary => {
                const icon = `${emojiArr[diary.emoji]}`; // 예시: "/assets/images/1.png"
                emojiCounts[icon] = (emojiCounts[icon] || 0) + 1;
            });

            const sortedEmojiRankings = Object.entries(emojiCounts)
                .map(([icon, count]) => ({ icon, count }))
                .sort((a, b) => b.count - a.count)
                .map((ranking, index) => ({ ...ranking, rank: index + 1 }));

            setEmojiRankings(sortedEmojiRankings);
        }
    }, [diaryList]);

    console.log(emojiRankings);
    return (
        <div className="w-[100%] h-[100%]">

            <div className="flex flex-col justify-center items-center">

                <hr/>
                <div className="font-bold">많이 기록한 기록한 아이콘들을 확인해보세요!</div>
                <br/>
                <div className="w-[80%] h-[20%] p-[40px] rounded-2xl bg-gray-200">
                    {emojiRankings.map(({icon, count, rank}) => (
                        <div key={icon} className="flex items-center justify-between mb-2">
                            <img src={icon} alt={`Emoji ${rank}`} className="w-[8%]"/>
                            <span>{` ${rank} 순위 : ${count}회`}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EmojiRank;
