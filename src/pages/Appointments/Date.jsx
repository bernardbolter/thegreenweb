import React, { useState, useEffect } from 'react';

import './appointments.scss';

const handleClick = (selected, set, unix, appointment, date, time, props) => {
    if (selected) {
        set(!selected);
        props.set(props.list.filter(appoint => appoint.unixTime !== unix));
    } else {
        set(!selected);
        props.set([...props.list, {
                unixTime: unix,
                appointmentTime: appointment,
                date: date,
                time: time
            }
        ])
    }
}

const status = (selected) => {
    if (selected) {
        return "ready to submit"
    } else {
        return "empty"
    }
}

export default function Date(props) {
    useEffect(() => {
        if (props.list.length === 0) {
            setSelected(false);
        }
    }, [props.list]);

    useEffect(() => {
        props.current.map(available => {
            if (available.unixTime === props.time.format("X")) {
                return setAvailable(true);
            }
        })
    }, [props.current])

    // console.log(props);
    const time = props.time.format("h:mm a");
    const date = props.time.format("ddd LL");
    const unixTime = props.time.format("X");
    const appointmentTime = props.time.format("LLLL");
    const [selected, setSelected] = useState(false);
    const [available, setAvailable] = useState(false);
    // const [booked, setBooked] = useState(false);
    return(
        <section 
            className="date-container" 
            style={{background: props.even ? "#efefef" : "#fefefe"}}
            onClick={() => !props.before && !available ? handleClick(selected, setSelected, unixTime, appointmentTime, date, time, props) : null}
        >
            {selected ? <div className="selected" /> : null}
            {available ? <div className="available" /> : null}
            <h5>{time}</h5>
            <p>{status(selected)}</p>
        </section>     
    )
}