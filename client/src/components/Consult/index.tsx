import React from "react";
// import {Content, Date, DiaryList, Feeling, Image, Images, Time} from './styles';
import sample1 from "@/assets/sample1.jpg"


export const ConsultList = () => {
    return (<div>

        <div className="flex flex-col justify-center items-center rounded-[100px]">
            <div className="card card-side bg-base-100 shadow-xl w-[70%] mb-3">
                <figure><img className="ml-3 rounded-[100%] w-[200px] h-[80%]" src={sample1} alt="Movie"/>
                </figure>
                <div className="card-body">
                    <h2 className="card-title">고승민</h2>
                    <p>여성 29세</p>

                    <p>2024. 01. 23</p>
                    <p>09:00</p>

                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">상세보기</button>
                    </div>
                </div>
            </div>
            <div className="card card-side bg-base-100 shadow-xl w-[70%] mb-3">
                <figure><img className="ml-3 rounded-[100%] w-[200px] h-[80%]" src={sample1} alt="Movie"/>
                </figure>
                <div className="card-body">
                    <h2 className="card-title">고승민</h2>
                    <p>여성 29세</p>

                    <p>2024. 01. 23</p>
                    <p>09:00</p>

                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">상세보기</button>
                    </div>
                </div>
            </div>
            <div className="card card-side bg-base-100 shadow-xl w-[70%] mb-3">
                <figure><img className="ml-3 rounded-[100%] w-[200px] h-[80%]" src={sample1} alt="Movie"/>
                </figure>
                <div className="card-body">
                    <h2 className="card-title">고승민</h2>
                    <p>여성 29세</p>

                    <p>2024. 01. 23</p>
                    <p>09:00</p>

                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">상세보기</button>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}
