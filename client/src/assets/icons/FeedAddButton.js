import React from 'react';

const FeedAddButton = () => {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="24" fill="#533C00"/>
            <g filter="url(#filter0_d_0_1)">
                <path
                    d="M25.143 12C25.6953 12 26.143 12.4477 26.143 13V20.7386C26.143 21.2909 26.5907 21.7386 27.143 21.7386H35C35.5523 21.7386 36 22.1863 36 22.7386V24.6153C36 25.1676 35.5523 25.6153 35 25.6153H27.143C26.5907 25.6153 26.143 26.063 26.143 26.6153V35C26.143 35.5523 25.6953 36 25.143 36H22.857C22.3047 36 21.857 35.5523 21.857 35V26.6153C21.857 26.063 21.4093 25.6153 20.857 25.6153H13C12.4477 25.6153 12 25.1676 12 24.6153V22.7386C12 22.1863 12.4477 21.7386 13 21.7386H20.857C21.4093 21.7386 21.857 21.2909 21.857 20.7386V13C21.857 12.4477 22.3047 12 22.857 12H25.143Z"
                    fill="white"/>
            </g>
            <defs>
                <filter id="filter0_d_0_1" x="8" y="12" width="32" height="32" filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                   result="hardAlpha"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape"/>
                </filter>
            </defs>
        </svg>

    )
}

export default FeedAddButton
