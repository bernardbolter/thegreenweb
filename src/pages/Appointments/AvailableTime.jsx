import React, { useState, useEffect } from 'react';

const AvailableTime = props => {
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        if (props.remove.length === 0) {
            setSelected(false);
        }
    }, [props.remove])

    return (
        <div 
            className={selected ? "avail-time avail-time-selected" : "avail-time"}
            onClick={() => {
                setSelected(!selected);
                !selected 
                ? props.setRemove([...props.remove, props.time.unix])
                : props.setRemove(props.remove.filter(time => time !== props.time.unix))
            }}
        >
            <p>{props.time.time}</p>
        </div>
    )
}

export default AvailableTime