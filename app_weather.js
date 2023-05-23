const startDateElement = document.getElementById('startDate');
const daysElement = document.getElementById('days');
const hourFromElement = document.getElementById('hourFrom');
const hourToElement = document.getElementById('hourTo');
const resElement = document.getElementById('table-res');
const goBtn = document.getElementById('go');


async function getTemperatures(lat, long, startDateStr, days, hourFrom, hourTo) {
    const endDate = getEndDate(startDateStr, days);
    const url = getUrl(lat, long, startDateStr, endDate);
    const response = await fetch(url);
    const data = await response.json();
    const dates = getDataForHours(data.hourly.time, hourFrom, hourTo);
    const temps = getDataForHours(data.hourly.temperature_2m, hourFrom, hourTo);
    const apparentTemperatures = getDataForHours(data.hourly.apparent_temperature, hourFrom, hourTo);

    return dates.map((d, index) => {
        const tokens = d.split('T');
        const date = tokens[0];
        const time = tokens[1];
        return { date, time, temperature: temps[index], apparent_temperature: apparentTemperatures[index] };
    })
}

function getEndDate(startDateStr, days) {
    const s = new Date(startDateStr);
    const endDate = new Date(s.setDate(s.getDate() + +days));
    const res = endDate.toISOString().substring(0, 10);
    return res;
}

function getUrl(lat, long, startDate, endDate) {
    return `https://api.open-meteo.com/v1/gfs?latitude=${lat}&longitude=${long}&hourly=temperature_2m,apparent_temperature&timezone=IST&start_date=${startDate}&end_date=${endDate}`
}

function getDataForHours(array, hourFrom, hourTo) {
    return array.filter((__, index) => {
        const remainder = index % 24;
        return remainder >= hourFrom && remainder <= hourTo;
    });
}

goBtn.addEventListener('click', () => {
    const startDate = startDateElement.value;
    const days = daysElement.value;
    const hourFrom = hourFromElement.value;
    const hourTo = hourToElement.value;
    return getTemperatures(31.29, 34.72, startDate, days, hourFrom, hourTo).
    then(res => res.error ? console.log('error in request') : resElement.innerHTML = displayObj(res))
});

const displayObj = array => '<tr> <th>date</th><th>time</th><th>temperature</th><th>apparent_temperature</th> </tr>' +
array.map(el => `<tr> <th>${el.date}</th><th>${el.time}</th><th>${el.temperature}</th><th>${el.apparent_temperature}</th> </tr>`).join('\n')
