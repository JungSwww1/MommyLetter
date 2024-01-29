import styled from "tailwind-styled-components";


// 헤더영역
export const HeaderLayout=styled.div`
    sticky
    top-0
    self-start
    h-[10%]
    z-10
`;

export const HeaderItem=styled.div`
    flex
    justify-between
    items-center
    w-[100%]
    h-[100%]
    rounded-bl-[15px]
    rounded-br-[15px]
    bg-user
`;



// 글 쓸때 보이는 영역
export const WriteLayout=styled.div`
    sticky
    top-0
    self-start
    h-[5%]
    z-10
    mb-5
`;

export const WriteItem=styled.div`
    flex
    justify-between
    flex-wrap
    items-center
    w-[100%]
    h-[100%]
`;



//네비 영역
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