import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import firebase from '../../firebase/config';

import CalendarHeader from './CalendarHeader';
import Date from './Date';
import AppointmentsLists from './AppointmentsList';
import SubmitAppointments from './SubmitAppointments';

import './appointments.scss';

import buildCalendar from './buildCalendar';
import { beforeToday, handleEvenOdd } from './dayStyles';

export default function Appointments() {
    const [calendar, setCalendar] = useState([]);
    const [value, setValue] = useState(moment().tz("America/Chicago"));
    const [appointmentsList, setAppointmentsList] = useState([]);
    const [viewList, setViewList] = useState(false);
    const [currentAppointments, setCurrentAppointments] = useState([]);

    useEffect(() => {
        setCalendar(buildCalendar(value));
    }, [value]);

    useEffect(() => {
        firebase.firestore().collection('shorts').doc('appointments').onSnapshot(snap => {
            const appointList = snap.data();
            console.log("appointList: ", appointList);
            setCurrentAppointments(Object.values(appointList));
        })
    }, []);

    console.log("current: ", currentAppointments);

    return (
    <section className="appointments">
        <div className="calender">
        <CalendarHeader value={value} setValue={setValue} />
        { calendar.map((week, index) => {
            return (
                <div key={index} className="day">
                    {week.map((day, i) => {
                        return (
                        <div
                            key={day.format("D")}
                            className={beforeToday(day) ? "before" : ""}
                        >
                            <p className="date">{day.format("dddd Do")}</p>
                            {[...Array(24)].map((key, i) => {
                                const offSet = 480 + i * 30;
                                const newTime = day.clone().add(offSet, 'minutes');
                                const newKey = newTime.format("X");
                                const evenOdd = handleEvenOdd(day.format("DDD"), i);
                                return <Date 
                                    key={newKey} 
                                    time={newTime} 
                                    before={beforeToday(day)} 
                                    even={evenOdd}
                                    list={appointmentsList}
                                    set={setAppointmentsList}
                                    current={currentAppointments}
                                />
                            })}
                        </div>
                        )
                    })}
                </div>
            )})}
        </div>
        <div className="schedule-container">
            <div 
                className="select-view-current-appointments"
                onClick={() => setViewList(!viewList)}
            >
                <p>{viewList ? "Hide" : "View"} Current Scheduled Appointments</p>
            </div>
            {viewList ? (
                <AppointmentsLists current={currentAppointments} />
            ) : (
                <SubmitAppointments list={appointmentsList} set={setAppointmentsList} />
            )}
            
        </div>
    </section>
    )
}