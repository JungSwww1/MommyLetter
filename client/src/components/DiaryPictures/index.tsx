import React, { FC } from 'react';

interface Props {
    pictures: string[];
}

const DiaryPictures: FC<Props> = ({ pictures }) => {
    return (
        <div className="flex">
            {pictures.map((picture, index) => (
                <img
                    key={index}
                    className="w-[200px] h-[150px] mt-5 mr-3"
                    src={picture}
                    alt={`Picture ${index + 1}`}
                />
            ))}
        </div>
    );
};

export default DiaryPictures;
