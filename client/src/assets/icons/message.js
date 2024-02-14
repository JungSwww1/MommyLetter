import React from 'react';
import palette from '@/lib/styles/colorPalette'

const Message = (props) => {
    return (
        <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path id="Vector"
                  d="M0 23V0L25 11.5L0 23ZM2.63158 18.6875L18.2237 11.5L2.63158 4.3125V9.34375L10.5263 11.5L2.63158 13.6562V18.6875Z"
                  fill={props.fill}/>
        </svg>

    );
};

export default Message;