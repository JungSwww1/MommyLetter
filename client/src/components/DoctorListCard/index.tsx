import React from "react";
import {ButtonBox, CardBox, CardListLayout, Img, Item, List} from "@/components/DoctorListCard/styles";
import {ReactComponent as RightButton} from "@/assets/icons/chevron-right.svg";

import {DoctorListCardComponentProps} from "@/components/type/types";

const DoctorListCardComponent = ({img, date, name, department}: DoctorListCardComponentProps) => {
    const elapsedTime = (date: number): string => {
        const start = new Date(date);
        const end = new Date();

        const seconds = Math.floor((end.getTime() - start.getTime()) / 1000);
        if (seconds < 60) return '방금 전';

        const minutes = seconds / 60;
        if (minutes < 60) return `${Math.floor(minutes)}분 전`;

        const hours = minutes / 60;
        if (hours < 24) return `${Math.floor(hours)}시간 전`;

        const days = hours / 24;
        if (days < 7) return `${Math.floor(days)}일 전`;

        return `${start.toLocaleDateString()}`;
    };
    return (

        <CardListLayout >
            <CardBox >

                <Img src={img}/>
                <List>
                    <div className="flex flex-col text-sm w-[50%]">
                        <Item className="font-bold">{name}</Item>
                        <Item className="">{date && elapsedTime(new Date(date).getTime())}</Item>
                        <Item>{department}</Item>
                    </div>
                    <ButtonBox>
                        <RightButton/>
                    </ButtonBox>
                </List>
            </CardBox>
        </CardListLayout>);

}


export default DoctorListCardComponent;
