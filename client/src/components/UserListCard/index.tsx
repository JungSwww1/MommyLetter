import React from "react";
import {Button, ButtonBox, CardBox, CardListLayout, Img, Item, List, Span} from "@/components/UserListCard/styles";
import {ReactComponent as RightButton} from "@/assets/icons/chevron-right.svg";
import {UserListCardComponentProps} from "@/components/type/types";

const UserListCardComponent = ({img, name, gender, age, time, reserveTime}: UserListCardComponentProps) => {
    return (
        <CardListLayout>
            <CardBox>
                <figure><Img src={img} alt="User"/></figure>
                <List>
                    <div>
                        <Span>{name}</Span>
                        <Item>{`${gender} ${age}세`}</Item>
                        <Item>{time}</Item>
                        <Item>{reserveTime}</Item>
                    </div>
                    <ButtonBox>
                        <Button><RightButton/></Button>
                    </ButtonBox>
                </List>
            </CardBox>
        </CardListLayout>);
}
export default UserListCardComponent;