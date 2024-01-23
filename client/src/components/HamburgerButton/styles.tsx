import styled from "tailwind-styled-components";

export const HamburgerLayout = styled.div`
    dropdown
    dropdown-end
    
`;

export const List = styled.ul`
    menu
    dropdown-content
    z-10
    p-2
    shadow
    bg-base-100
    rounded-box
    w-60
    h-screen
    mt-4
    `;

export const Item=styled.li`
        {/*Daisy ui를 사용할거라 쓸일은 없을 것 같음.
         List와 Item을 구분하기 위해서 사용.*/}
    `
export const Button=styled.button`
    button
    flex
    flex-col
    justify-end
    items-center
    h-[50%]
    `