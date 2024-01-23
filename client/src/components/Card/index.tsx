import React,{FC} from "react";
import sample1 from "@/assets/images/sample1.jpg";
import { CardListLayout, CardBox, Img, List, Span, Item, ButtonBox, Button } from "@/components/Card/styles";
import { ReactComponent as RightButton } from "@/assets/icons/chevron-right.svg";

// ICard 인터페이스
interface ICard {
    img: string;
    name: string;
    gender: string;
    age: number;
    time: string;
    reserveTime: string;
}

// CardItem 함수형 컴포넌트를 생성하고 ICard를 프로퍼티로 받음
const CardItem: FC<{ card: ICard }> = ({ card }) => (
    <CardBox>
        <figure><Img src={card.img} alt="User" /></figure>
        <List>
            <div>
                <Span>{card.name}</Span>
                <Item>{`${card.gender} ${card.age}세`}</Item>
                <Item>{card.time}</Item>
                <Item>{card.reserveTime}</Item>
            </div>
            <ButtonBox>
                <Button><RightButton /></Button>
            </ButtonBox>
        </List>
    </CardBox>
);

// CardList 함수형 컴포넌트
export const CardList: React.FC = () => {
    // 예시 데이터
    const exampleCard: ICard = {
        img: sample1,
        name: "고승민",
        gender: "여성",
        age: 29,
        time: "2024. 01. 23",
        reserveTime: "09:00",
    };

    return (
        <CardListLayout>
            {/* CardItem 컴포넌트에 예시 데이터를 전달 */}
            <CardItem card={exampleCard} />
        </CardListLayout>
    );
};