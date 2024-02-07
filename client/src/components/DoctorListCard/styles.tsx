import styled from "tailwind-styled-components";

export const CardListLayout= styled.div`
    flex
    flex-col
    items-center
    rounded-[100px]
`;

export const CardBox=styled.div`
    flex
    justify-center
    items-center
    card
    card-side
    bg-base-70
    shadow-xl
    h-[25%]
    w-[100%]
    mb-3
    p-2
`;

export const Img = styled.img`
    rounded-[100%]
    h-[100%]
    w-[25%]
`;

export const List = styled.ul`
    flex
    flex-row
    w-[50%]
    card-body
`;

export const Item = styled.li`
        {/* 이곳에 회원정보를 꾸며줌*/}
`;
export const ButtonBox=styled.div`
    card-actions
    flex
    flex-col
    w-[50%]
    justify-center
    items-end
`;
