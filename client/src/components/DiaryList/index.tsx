import React from "react";
import {Content, Date, DiaryList, Feeling, Image, Images, Time} from './styles';
import sample1 from '@/assets/sample1.jpg'
import sample2 from '@/assets/sample2.jpg'


const DiaryPage = () => {
    return (<div>
        <DiaryList>
            <Date>2024.01.01 <Feeling>기분나쁨</Feeling></Date>
            <Time>13:23</Time>
            <Content>오늘은 고승민이란 남편이 너무나도 귀찮게 굴어서 화가 났다.\n</Content>
        </DiaryList>
        <Images>
            <Image src={sample1}/>
            <Image src={sample2}/>

            <Image src={sample1}/>
            <Image src={sample2}/>
            <Image src={sample2}/>

        </Images>
    </div>);
}

export default DiaryPage;