import React from 'react';

interface HashtagProps {
    content: string;
}

const HashTagComponent: React.FC<{ hashtagList: HashtagProps[] }> = ({hashtagList}) => {
    return (<div className="w-[100%]">

            {hashtagList.map((hashtagItem, index) => (
                <div key={index} className="flex ml-5 h-[10%] w-[100%]">
                    <span># {hashtagItem.content}</span>
                </div>))}
        {(!hashtagList) ||(hashtagList && hashtagList?.length<1) && <img src="/assets/images/not_found_search.jpg"/>}
    </div>);
};

export default HashTagComponent;
