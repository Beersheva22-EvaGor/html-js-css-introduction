export function getISODateStr(date){
    return getlocalISOTime(date).substring(0,10);
}

export function getEndDate(startDate, days) {
    const s = new Date(startDate);
    const endDate = new Date(s.setDate(s.getDate() + +days));
    return getISODateStr(endDate);
}

export function dateDiff(startDate, endDate){
    return Math.floor((new Date(endDate) - new Date(startDate)) / ms_per_day);
}
const ms_per_day = 1000 * 60 * 60 * 24;

function getlocalISOTime(date){
    const tzoffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
    return (new Date(date - tzoffset)).toISOString();
}