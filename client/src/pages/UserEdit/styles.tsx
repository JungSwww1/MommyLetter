import styled from "tailwind-styled-components";

export const ProfileImg = styled.img`
    w-[150px] h-[150px]
    mb-[8%]
    rounded-full
`

// 프로필 사진 밑의 밑줄
export const underline = styled.svg`
  viewBox: 0 0 385 1;
  fill: none;
  xmlns: http://www.w3.org/2000/svg;
  preserveAspectRatio: xMidYMid meet;
  margin-bottom: 5%;
  
  line {
    x1: -4.37114e-8;
    y1: 0.500031;
    x2: 385;
    y2: 0.499997;
    stroke: black;
  }
`;
