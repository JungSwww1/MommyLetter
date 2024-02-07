import React, { useState } from 'react';

const HeartButton = (data) => {
    const [liked, setLiked] = useState(false);


    const toggleLike = () => {
        setLiked(!liked);
    };

    return (
        <button
            className={`${
                liked ? 'text-white' : 'text-red-500'
            }`}
            onClick={toggleLike}
        >
            {liked ? '❤️' : '🤍'}
        </button>
    );
};

export default HeartButton;
