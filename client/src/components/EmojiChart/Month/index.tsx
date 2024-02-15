import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { fetchDiary } from "@/apis/diary/DiaryAPI";
import { DiaryReadResponseProps } from "@/pages/type/types";
import { Line } from 'react-chartjs-2';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import { CategoryScale } from 'chart.js';

interface EmojiDataByMonth {
    [key: number]: number[];
}

const MonthEmojiChartComponent: React.FC = () => {
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

    const emojiDataByMonth: EmojiDataByMonth = diaryList.reduce((acc, diary) => {
        const month = new Date(diary.createdDate).getMonth();
        if (!acc[month]) {
            acc[month] = [];
        }
        acc[month].push(diary.emoji);
        return acc;
    }, {} as EmojiDataByMonth);

    const emojiLabels = Object.keys(emojiDataByMonth).map(month => {
        const monthIndex = parseInt(month);
        return `${monthIndex + 1}월`;
    });

    const data = {
        labels: emojiLabels,
        datasets: [
            {
                label: '기분 흐름 월별',
                data: Object.values(emojiDataByMonth).map(monthData =>
                    monthData.reduce((sum: any, value: any) => sum + value, 0) / monthData.length
                ),
                fill: false,
                borderColor: '#FFDF6D', // #FFDF6D 노란색 적용
                tension: 0.1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: '',
                    font: {
                        weight: 'bold' as 'bold'
                    }
                },
                ticks: {
                    font: {
                        weight: 'bold' as 'bold'
                    }
                }
            },
            y: {
                title: {
                    display: true,
                    text: '',
                    font: {
                        weight: 'bold' as 'bold'
                    }
                },
                ticks: {
                    font: {
                        weight: 'bold' as 'bold'
                    }
                }
            },
        },
    };

    return (
        <div className="w-[100%] h-[100%]">
            <Line data={data} options={options} />
        </div>
    );
};

export default MonthEmojiChartComponent;