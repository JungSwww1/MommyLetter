import React from 'react';
import {HashTagComponentProps} from "@/components/type/types"

const HashTagComponent = ({title="", count=0}: HashTagComponentProps) => {
    if (!title && count === 0) {
        return null;
    }
    return (
        <div className="flex justify-around h-[100%] w-[100%]">
            <div>
            {title}
            </div>
            <div>
                {count}
            </div>
        </div>
    );
};

export default HashTagComponent;