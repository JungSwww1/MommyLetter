import styled from "tailwind-styled-components";

export const Diary = styled.div`
    flex
    flex-wrap
    justify-between
    items-center
    h-10
    pl-4
`;
export const Title = styled.b`
    flex-grow
    text-xl
    font-bold
    text-black
`;
export const Input = styled.div`
    {/* 체크버튼 관련 이미지 css */}
`;

export const Select = styled.select`
    w-[200px]
    h-[42px]
    justify-center
    text-center
    `;

export const Img = styled.img`
    w-[50px]
    h-[50px]
    `

export const Label = styled.label`
    input-file-button
    px-4
    py-2
    bg-yellow-500
    rounded
    cursor-pointer
    `