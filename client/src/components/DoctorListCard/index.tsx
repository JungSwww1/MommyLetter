import React, {useState} from "react";
import {ButtonBox, CardBox, CardListLayout, Img, Item, List} from "@/components/DoctorListCard/styles";
import {ReactComponent as RightButton} from "@/assets/icons/chevron-right.svg";

import {DoctorListCardComponentProps} from "@/components/type/types";

const DoctorListCardComponent = ({img, date, name, department}: DoctorListCardComponentProps) => {
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth()+1;
    const day = new Date(date).getDate();
    const hour = new Date(date).getHours();
    const minute = new Date(date).getMinutes();
    const isTwoletter = (num:number) =>{
        if(num.toString().length>1) return num;
        return `0${num.toString()}`;

    }
    return (

        <CardListLayout >
            <CardBox >

                <Img src={img}/>
                <List>
                    <div className="flex flex-col text-sm w-[50%]">
                        <Item className="font-bold">{name}</Item>
                        <Item className=""> {date &&`${isTwoletter(month)}월 ${isTwoletter(day)}일 ${isTwoletter(hour)}: ${isTwoletter(minute)}`}</Item>
                        <Item>{department}</Item>
                    </div>
                </List>
            </CardBox>
        </CardListLayout>);

}


export default DoctorListCardComponent;
