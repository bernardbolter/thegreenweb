import React, { useState, useEffect } from 'react';

import firebase from '../../firebase/config';

import { ReactComponent as Remove}  from '../../svgs/remove.svg';
import { saveAppointments } from './fireAppointments';

export default function SubmitAppointments(props) {
    const [formattedList, setFormattedList] = useState([]);

    useEffect(() => {
        const newList = [];
        props.list.map(item => {
            if (newList.some(e => e.date === item.date)) {
                const index = newList.map(e => e.date).indexOf(item.date);
                return newList[index].times.push(item.time);
            } else {
                return newList.push({
                            date: item.date,
                            times: [item.time]
                        })
            }
        })
        setFormattedList(newList);
    }, [props.list]);

    return (
        <section className="submit-appointments">
            { props.list.length !== 0 ? (
                <div className="appointments-list">
                    <div className="list-header">
                        <p>Appointments to be Submitted:</p>
                    </div>
                    {formattedList.map(date => {
                        // console.log(date);
                        return (
                            <div key={date.date} className="appoint-list-time">
                                <h5>{date.date}</h5>
                                <div className="appoint-times">
                                    {date.times.map(time => {
                                        return <p key={date.date + time}>{time}</p>
                                    })}
                                </div>
                            </div>
                            )
                        }
                    )}
                </div>
            ) : (
                <div className="no-appointments">
                    <p>No Appointments Selected</p>
                    <p>click on a time to add to the list and then submit them to be available on the app</p>
                </div>
            )}
            <div className="horo-line" />
            { props.list.length !== 0 ? (
                <div className="appoint-buttons">
                    <div 
                        className="submit-appoint-button"
                        onClick={() => {
                            console.log("subbit appointments");
                            saveAppointments(props.list);
                        }}
                    >
                        <p>Submit Appointments</p>
                    </div>
                    <div className="remove-appoint-button"
                        onClick={() => props.set([])}
                    >
                        <Remove />
                        <p>remove</p>
                    </div>
                </div>
                ) : null
            }
        </section>
    )
}