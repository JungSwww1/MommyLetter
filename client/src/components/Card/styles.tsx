import styled from "tailwind-styled-components";

export const CardListLayout= styled.div`
    flex
    flex-col
    justify-center
    items-center
    rounded-[100px]
h-[100%]
`;

export const CardBox=styled.div`
    card
    card-side
    bg-base-70
    shadow-xl
    h-[25%]
w-[70%]
mb-3
`;

export const Img = styled.img`
    ml-3
    rounded-[100%]
w-[65%]
h-[85%]
`;

export const List = styled.ul`
    flex
    flex-row
    justify-between
    w-[50%]
card-body

`;

export const Span=styled.span`
    card-title
    mb-3
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
export const Button=styled.button`
    btn
    btn-circle
`;