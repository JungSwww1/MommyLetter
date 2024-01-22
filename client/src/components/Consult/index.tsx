import React from "react";
import sample1 from "@/assets/sample1.jpg"
import {ConsultListLayout,CardBox,Img,List,Span,Item,ButtonBox,Button} from "@/components/Consult/styles";

export const ConsultList = () => {
    return (
        <ConsultListLayout>
            <CardBox>
                <figure><Img src={sample1} alt="User"/></figure>
                <List>
                    <Span>고승민</Span>
                    <Item>여성 29세</Item>
                    <Item>2024. 01. 23</Item>
                    <Item>09:00</Item>
                    <ButtonBox>
                        <Button>상세보기</Button>
                    </ButtonBox>
                </List>
            </CardBox>
            <CardBox>
                <figure><Img src={sample1} alt="User"/></figure>
                <List>
                    <Span>고승민</Span>
                    <Item>여성 29세</Item>
                    <Item>2024. 01. 23</Item>
                    <Item>09:00</Item>
                    <ButtonBox>
                        <Button>상세보기</Button>
                    </ButtonBox>
                </List>
            </CardBox>
            <CardBox>
                <figure><Img src={sample1} alt="User"/></figure>
                <List>
                    <Span>고승민</Span>
                    <Item>여성 29세</Item>
                    <Item>2024. 01. 23</Item>
                    <Item>09:00</Item>
                    <ButtonBox>
                        <Button>상세보기</Button>
                    </ButtonBox>
                </List>
            </CardBox>
    </ConsultListLayout>);
}
