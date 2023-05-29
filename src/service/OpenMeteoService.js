export default class OpenMeteoService {
    #baseUrl;
    constructor(baseUrl) {
        this.#baseUrl = baseUrl;
    }

    #getUrl(lat, long, startDate, endDate) {
        return `${this.#baseUrl}latitude=${lat}&longitude=${long}&hourly=temperature_2m,apparent_temperature&timezone=IST&start_date=${startDate}&end_date=${endDate}`
    }

    async getTemperatures(lat, long, startDate, endDate, hourFrom, hourTo) {
        const url = this.#getUrl(lat, long, startDate, endDate);
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
}

function getDataForHours(array, hourFrom, hourTo) {
    return array.filter((__, index) => {
        const remainder = index % 24;
        return remainder >= hourFrom && remainder <= hourTo;
    });
}