import styled from "tailwind-styled-components";


{/*justify-between 되어있기때문에 헤더를 동일하게 사용해도 됨*/}
export const HeaderLayout=styled.div`
    sticky
    top-0
    self-start
    h-[20%]
`;
export const HeaderItem=styled.div`
    flex
    justify-between
    flex-wrap
    items-center
    w-[100%]
    h-[100%]
    rounded-bl-[15px]
    rounded-br-[15px]
    bg-[#6eb400]
`;
export const NavigationLayout = styled.div`
    h-[100%]
    w-[100%]
    bottom-0
    sticky
`;

export const NavigationItem=styled.div`
    flex
    justify-around
    items-center
    h-[100%]
    rounded-tr-[10px]
    rounded-tl-[10px]
`