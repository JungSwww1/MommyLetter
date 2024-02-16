import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { fetchDiary } from "@/apis/diary/DiaryAPI";
import { PhotoProps } from "@/pages/type/types";
import {Bar, Line} from 'react-chartjs-2';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import { CategoryScale } from 'chart.js';

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

interface EmojiDataByMonth {
    [key: number]: number[];
}

const HorizontalChart: React.FC = () => {
    const [userId, setUserId] = useState<number>();
    const [diaryList, setDiaryList] = useState<DiaryReadResponseProps[]>([]);
    const param = useParams<{ userId: string }>();

    Chart.register(CategoryScale);
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

    const emojiArr: string[] = [];
    const path = "/assets/images/"
    const emotionImg = ["1sad.png", "2lonely.png", "3irritated.png", "4tired.png", "5angry.png", "6soso.png", "7delight.png", "8calm.png", "9delight.png", "10excited.png"]
    for (let i = 0; i < 10; i++) {
        emojiArr[i] = path + emotionImg[i];
    }

    // 데이터 가공
    const emojiData: number[] = []; // 각 감정에 대한 데이터
    for (let i = 0; i < diaryList.length; i++) {
        emojiData[diaryList[i].emoji] = emojiData[diaryList[i].emoji] ? emojiData[diaryList[i].emoji] + 1 : 1;
    }

    const data = {
        labels: emojiArr.map(img => ({
            img,
            width: 40,
            height: 40
        })),
        datasets: [
            {
                label: 'Emotion Distribution',
                data: emojiData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 0, 255, 0.2)',
                    'rgba(0, 255, 0, 0.2)',
                    'rgba(0, 0, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 0, 255, 1)',
                    'rgba(0, 255, 0, 1)',
                    'rgba(0, 0, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        },
        scales: {
            x: {
                ticks: {
                    callback: (value: { img: string; width: number; height: number }) => {
                    }
                }
            }
        } as any // Type assertion here to overcome TypeScript error
    };

    return (
        <div className="w-[100%] h-[100%]">
            <Bar data={data} options={options} />
        </div>
    );
};

export default HorizontalChart;