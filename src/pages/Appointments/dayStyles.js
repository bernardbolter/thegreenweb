export function beforeToday(day) {
    return day.isBefore(new Date(), "day")
}

export function handleEvenOdd(dayOfYear, i) {
    let divider = i;
    if (dayOfYear%2 === 0) {
        divider++
    } 
    return divider%2 === 0;
}