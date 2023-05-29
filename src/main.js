import openMeteoConfig from './config/service-config.json' assert {type: 'json'};
import OpenMeteoService from './service/OpenMeteoService.js';
import DataGrid from './ui/DataGrid.js';
import WeatherForm from './ui/WeatherForm.js';
import {getEndDate} from './util/date-functions.js'
//constants definition
const columns = [
    { field: 'date', headerName: 'Date' },
    { field: 'time', headerName: 'Time' },
    { field: 'temperature', headerName: 'Temperature' },
    { field: 'apparent_temperature', headerName: 'Fealt Temp' }
]

//objects
const form = new WeatherForm("form-place",
 Object.keys(openMeteoConfig.cities), openMeteoConfig.maxDays);
const openMeteoService = new OpenMeteoService(openMeteoConfig.baseUrl);
const table = new DataGrid("table-place", columns)

    async function run() {
        while(true) {
            const fromFormData = await form.getDataFromForm();
            const { startDate, days, hourFrom, hourTo, city } = fromFormData;
            const {lat, long} = openMeteoConfig.cities[city];
            const temperatures = await openMeteoService.getTemperatures(lat, long, startDate, getEndDate(startDate, days),
            hourFrom, hourTo);
            table.fillData(temperatures);
        }
    }
    run();