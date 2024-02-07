import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import {DoctorListSection, HistoryListLayout} from "@/pages/History/HistoryList/styles";
import DoctorListCardComponent from "@/components/DoctorListCard";
import {HistoryListProps} from "@/pages/type/types";
import {fetchHistoryList} from "@/apis/history/HistoryAPI";

interface Auth{
    nickname:string;
    userId:number;
}

const HistoryListPage = () => {

    const [user, setUser] = useState<Auth>()
    const [historyList, setHistoryList] = useState<HistoryListProps[]>();
    useEffect(() => {
        const storedAuth = localStorage.getItem('Auth');
        if (storedAuth) {
            setUser(JSON.parse(storedAuth));
        }

        console.log(user);
        if(user && user.userId){
            fetchHistoryList(user.userId).then((historyList) => {
                setHistoryList(historyList);
            })
        }
    }, [user?.userId])

    return (<HistoryListLayout>
        <DoctorListSection>
            {historyList?.map((history: HistoryListProps) => (

                <Link key={history.counselingId} to={history.counselingId.toString()}><DoctorListCardComponent name={history.name}
                                                                                    department={history.department}
                                                                                    img={history.profilePhoto}
                                                                                    date={history.reserveDate.substring(2, 10)}/></Link>))}
        </DoctorListSection>
    </HistoryListLayout>);
};

export default HistoryListPage;