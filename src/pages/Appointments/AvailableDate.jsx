import React, { useState } from 'react';

import AvailableTime from "./AvailableTime";
import { ReactComponent as Arrow } from '../../svgs/arrow.svg';

const AvailableDate = props => {
    const [dropped, setDropped] = useState(false);

    return (
        <div className="avail-date-container">
            <div className="avail-date-header" onClick={() => setDropped(!dropped)}>
                <p>{props.date.date}</p>
                <Arrow className={dropped ? "avail-arrow" : "avail-arrow avail-arrow-dropped"} />
            </div>
            <div className={dropped ? "avail-times-container avail-times-container-dropped" : "avail-times-container"}>
                {props.date.times.map(time => {
                    return (
                        <AvailableTime time={time} remove={props.remove} setRemove={props.setRemove} key={time.unix} />
                    )
                })}
            </div>
        </div>
    )
}

export default AvailableDate;