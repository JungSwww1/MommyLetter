import styled from "tailwind-styled-components";

export const AppMain = styled.div`
    flex-col
    w-[50%]
    h-[100%]
    bg-white 

`

export const AppBody=styled.div`
    h-[93%]
    // 이건 차후에 AppBody로 들어갈지 AppMain으로 갈지 다른 곳으로 갈지 결정
    max-h-[739px] overflow-y-scroll
    max-w-[850px] overflow-x-hidden
`
export const AppNavi=styled.div`
    h-[7%]
`