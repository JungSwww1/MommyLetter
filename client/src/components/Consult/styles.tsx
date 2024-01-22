import styled from "tailwind-styled-components";

export const ConsultListLayout= styled.div`
    flex
    flex-col
    justify-center
    items-center
    rounded-[100px]
`;

export const CardBox=styled.div`
    card
    card-side
    bg-base-100
    shadow-xl
    w-[70%]
    mb-3
`;

export const Img = styled.img`
    ml-3
    rounded-[100%]
    w-[200px]
    h-[80%]
`;

export const List = styled.ul`
    card-body
`;

export const Span=styled.span`
    card-title
`;
export const Item = styled.li`
        {/* 이곳에 회원정보를 꾸며줌*/}
`;
export const ButtonBox=styled.div`
    card-actions
    justify-end
`;
export const Button=styled.button`
    btn
    btn-primary
`;