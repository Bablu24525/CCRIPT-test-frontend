import React, { useEffect, useState } from 'react'
import Header from '../component/header'
import CalendarComponent from '../component/calendar-component';
import { PrivateInstance } from '../config/axios';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { convertFromUTC } from '../config/helper';

export default function Home() {

    const [data, setData] = useState([]);

    const [weeks, setWeeks] = useState(["Monday", "Tudesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]);

    const getAppointments = async () => {
        let res = await PrivateInstance({
            url: "/api/get",
            method: "GET"
        });

        if (res.data.success) {
            let resData = res?.data?.data?.map((item) => {
                let myres = {
                    day: weeks[dayjs(convertFromUTC(item.start)).day()]?.toLowerCase(),
                    start: parseInt(dayjs(convertFromUTC(item.start)).format("h")),
                    end: parseInt(dayjs(convertFromUTC(item.end)).format("h")),
                    username: item.user_name,
                    reason: item.reason
                };
                return myres;
            })
            setData(resData);
        } else {
            toast.error(res.data.message);
        }
    }

    useEffect(() => {
        getAppointments();
    }, []);


    return (
        <main className=''>
            <Header />
            <div className="my-20 w-11/12 mx-auto">
                <CalendarComponent
                    data={data}
                    getAppointments={getAppointments}
                />
            </div>
        </main>
    )
}
