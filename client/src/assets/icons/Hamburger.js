import React from 'react';
import palette from '@/lib/styles/colorPalette'
const Hamburger = () => {
    return (
            <svg xmlns="http://www.w3.org/2000/svg"
                 width="25"
                 height="25"
                 viewBox="0 0 24 24"
                 fill="none"
                 stroke={palette.MenuColor}
                 strokeWidth="2"
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 className="feather feather-menu">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
    );
};

export default Hamburger;