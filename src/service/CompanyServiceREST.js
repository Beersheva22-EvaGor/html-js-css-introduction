import { count } from "../util/number-functions.js";

const URL = 'http://localhost:3500/employees';
export default class CompanyService {

    async addEmployee(employee) {
        return getRequest(URL, request('POST', JSON.stringify(employee)));
    }

    async getStatistics(field, interval) {
        const currentYear = new Date().getFullYear();
        return fetch(URL).then(response => response.json()).
            then(array => {
                if (field == 'birthYear') {
                    array = array.map(e => ({ 'age': currentYear - e.birthYear }));
                    field = 'age';
                }
                const statisticsObj = count(array, field, interval);
                return Object.entries(statisticsObj).map(e => {
                        const min = e[0] * interval;
                        const max = min + interval - 1;
                        return { min, max, count: e[1] };
                    })
            })
    }
    async getAllEmployees() {
        return fetch(URL).then(response => response.json());
    }
    async removeEmployee(id) {
        return getRequest(`${URL}/${id}`, request('DELETE'));
    }

    async updateEmployee(employee) {
        return getRequest(URL, request('PUT', JSON.stringify(employee)));
    }
}

function request(method, body) {
    return {
        method,
        headers: { "Content-Type": "application/json" },
        body
    }
}

async function getRequest(url, request) {
    return fetch(url, request).then(response => response.json());
}