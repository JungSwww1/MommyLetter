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
    h-[65px]
    `
export const Button=styled.button`
    button
    flex
    flex-col
    justify-end
    items-center
    h-[50%]
    `