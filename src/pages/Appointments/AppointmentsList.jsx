import React, { useState, useEffect } from 'react';

import AvailableDate from './AvailableDate';
import { ReactComponent as Remove } from '../../svgs/remove.svg';

import { removeAppointments } from './fireAppointments';

import './appointments.scss';

const AppointmentsList = props => {
    const [availableAppointments, setAvailableAppointments] = useState([]);
    const [appointmentsToRemove, setAppointmentsToRemove] = useState([]);

    useEffect(() => {
        const newList = [];
        props.current.map(time => {
            if (newList.some(t => t.date === time.date)) {
                const index = newList.map(e => e.date).indexOf(time.date);
                return newList[index].times.push({
                    time: time.time,
                    unix: time.unixTime
                })
            } else {
                return newList.push({
                    date: time.date,
                    times: [{
                        time: time.time,
                        unix: time.unixTime
                    }]
                })
            }
        })
        setAvailableAppointments(newList);
    }, [props]);

    // console.log(availableAppointments);
    console.log("to remove: ", appointmentsToRemove);

    return (
        <section className="appointments-schedule">
            <p>This is a view of the available appointments on the app. You can remove dates from the app by selecting them here and then submitting them to be removed when the button pops up.</p>
            {availableAppointments.map(date => {
                return <AvailableDate date={date} remove={appointmentsToRemove} setRemove={setAppointmentsToRemove} key={date.date}/>
            })}
            { appointmentsToRemove.length !== 0 ? (
                <div className="appoint-buttons">
                    <div 
                        className="submit-appoint-button"
                        onClick={() => {
                            console.log("remove appointments");
                            removeAppointments(appointmentsToRemove);
                        }}
                    >
                        <p>Remove Appointments</p>
                    </div>
                    <div className="remove-appoint-button"
                        onClick={() => setAppointmentsToRemove([])}
                    >
                        <Remove />
                        <p>undo</p>
                    </div>
                </div>
                ) : null
            }
        </section>
    )
}

export default AppointmentsList;