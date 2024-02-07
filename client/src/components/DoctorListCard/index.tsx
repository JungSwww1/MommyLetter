import React from "react";
import {ButtonBox, CardBox, CardListLayout, Img, Item, List} from "@/components/DoctorListCard/styles";
import {ReactComponent as RightButton} from "@/assets/icons/chevron-right.svg";

import {DoctorListCardComponentProps} from "@/components/type/types";

const DoctorListCardComponent = ({img, date, name, department}: DoctorListCardComponentProps) => {
    return (

        <CardListLayout >
            <CardBox >

                <Img src={img} alt="User"/>
                <List>
                    <div className="flex flex-col text-sm w-[50%]">
                        <Item className="font-bold">{name}</Item>
                        <Item className="">{date}</Item>
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
