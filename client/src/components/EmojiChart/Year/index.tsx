import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { fetchDiary } from "@/apis/diary/DiaryAPI";
import { DiaryReadResponseProps } from "@/pages/type/types";
import { Bar } from 'react-chartjs-2';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import { CategoryScale } from 'chart.js';

interface EmojiDataByYear {
    [key: number]: number[];
}

const YearEmojiChartComponent: React.FC = () => {
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

    const emojiDataByYear: EmojiDataByYear = diaryList.reduce((acc, diary) => {
        const year = new Date(diary.createdDate).getFullYear();
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(diary.emoji);
        return acc;
    }, {} as EmojiDataByYear);

    const emojiLabels = Object.keys(emojiDataByYear).map(year => {
        return year;
    });

    const data = {
        labels: emojiLabels,
        datasets: [
            {
                label: '기분 흐름 연도별',
                data: Object.values(emojiDataByYear).map(yearData =>
                    yearData.reduce((sum: any, value: any) => sum + value, 0) / yearData.length
                ),
                backgroundColor: '#FFDF6D', // #FFDF6D 노란색 적용
                borderWidth: 1,
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
                    text: 'Year',
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
                    text: 'Average Emoji',
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
            <Bar data={data} options={options} />
        </div>
    );
};

export default YearEmojiChartComponent;
