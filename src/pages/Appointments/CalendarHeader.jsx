import React from 'react';
import { ReactComponent as Arrow } from '../../svgs/arrow.svg';

export default function CalendarHeader({value, setValue}) {

    function weekBegin() {
        const begin = value.clone().startOf("week");
        return begin.format("Do MMM YYYY");
    }

    function weekEnd() {
        const end = value.clone().endOf("week");
        return end.format("Do MMM YYYY");
    }
    
    function prevWeek() {
        return value.clone().subtract(1, "week");
    }
    
    function nextWeek() {
        return value.clone().add(1, "week");
    }

    function thisWeek() {
        return value.isSame(new Date(), "week");
    }

    return (
        <div className="calendar-header">
            {!thisWeek() ? (
            <div
                className="calendar-header-link left"
                onClick={() => !thisWeek() && setValue(prevWeek())}
            >
                <Arrow />
                <p>Previous Week</p>
            </div>
            ) : <div className="calendar-header-link" />}

            <div className="calendar-header-text">
                <p><span>from</span>{weekBegin()}</p>
                <p><span>to</span>{weekEnd()}</p>
            </div>


            <div 
                className="calendar-header-link right"
                onClick={() => setValue(nextWeek())}
            >
                <Arrow />
                <p>Following Week</p>    
            </div>
        </div>
    )
}