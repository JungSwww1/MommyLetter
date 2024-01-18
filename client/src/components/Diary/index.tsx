import React from "react";
import {Diary, Input, Title} from './styles';

const result = () => {
    return (<Diary>
        <Title>산모일기</Title>
        {/* On Off 버튼 */}
        <Input>체크버튼</Input><input type="checkbox"/>
    </Diary>);
}

export default result;