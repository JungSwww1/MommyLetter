import React from 'react';

interface HashtagProps {
    content: string;
}

const HashTagComponent: React.FC<{ hashtagList: HashtagProps[] }> = ({hashtagList}) => {
    return (<div className="w-[100%]">

            {hashtagList.map((hashtagItem, index) => (
                <div key={index} className="flex ml-5 h-[25%] w-[100%]">
                    <span># {hashtagItem.content}</span>
                </div>))}
    </div>);
};

export default HashTagComponent;
