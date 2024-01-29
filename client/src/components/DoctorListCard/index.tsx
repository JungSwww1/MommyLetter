import React from "react";
import {Button, ButtonBox, CardBox, CardListLayout, Img, Item, List} from "@/components/DoctorListCard/styles";
import {ReactComponent as RightButton} from "@/assets/icons/chevron-right.svg";

import {DoctorListCardComponentProps} from "@/components/type/types";

const DoctorListCardComponent = ({img, date, name, department}: DoctorListCardComponentProps) => {
    return (

        <CardListLayout>
            <CardBox>

                <figure><Img src={img} alt="User"/></figure>
                <List>
                    <div className="flex flex-col justify-center text-sm">
                        <Item className="font-bold ">{date}</Item>
                        <Item className="font-bold ">{name}</Item>
                        <Item>{department}</Item>
                    </div>
                    <ButtonBox>
                        <Button><RightButton/></Button>
                    </ButtonBox>
                </List>
            </CardBox>
        </CardListLayout>);

}


export default DoctorListCardComponent;
