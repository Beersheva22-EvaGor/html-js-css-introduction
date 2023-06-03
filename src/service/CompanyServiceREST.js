// import { count } from "../util/number-functions.js";
// import {addEmployee as addEmployeeREST} from '../../../json-server/dbFunctionality.js'
// import {removeEmployee as removeEmployeeREST} from '../../../json-server/dbFunctionality.js'
// import {updateEmployee as updateEmployeeREST} from '../../../json-server/dbFunctionality.js'
// import {getAllEmployees as getAllEmployeesREST} from '../../../json-server/dbFunctionality.js'

const URL = 'http://localhost:3500/employees';

export default class CompanyService {
    constructor() {        
    }
    #getRequest(method, body){
        fetch(URL, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(employee)
        }).then(response => response.json())
    }


    async addEmployee(employee) {
        return await fetch(URL, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(employee)
        }).then(response => response.json());
    }

    
    getStatistics(field, interval) {
        let array = Object.values(getAllEmployees());
        const currentYear = new Date().getFullYear();
        
        if (field == 'birthYear') {
            array = array.map(e => ({'age': currentYear - e.birthYear}));
            field = 'age';
        }
        const statisticsObj = count(array, field, interval);
        return getPromise(Object.entries(statisticsObj).map(e => {
            const min = e[0] * interval;
            const max = min + interval - 1;
            return {min, max, count: e[1]};
        }), 5000)
    }
    async getAllEmployees() {
        return fetch(URL).then(response => response.json());
    }

    async removeEmployee(id){
        return fetch(`${URL}/${id}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        }).then(response => response.json());
    }

    async updateEmployee(employee){
        return fetch(URL, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(employee)
        }).then(response => response.json())
    }
}