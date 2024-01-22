import styled from "tailwind-styled-components";


{/*justify-between 되어있기때문에 헤더를 동일하게 사용해도 됨*/}
export const HeaderLayout=styled.div`
    sticky
    top-0
    self-start
    h-[20%]
    pl-4
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
    flex
    h-[5%]
    bg-[#d9d9d9]
    mt-auto
`;