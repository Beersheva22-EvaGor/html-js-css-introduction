const URL = 'http://localhost:3500/employees';

export default class CompanyService {
    constructor() {
    }

    async addEmployee(employee) {
        return getRequest(URL, request('POST', JSON.stringify(employee)));
    }

    getStatistics(field, interval) {
        let array = Object.values(getAllEmployees());
        const currentYear = new Date().getFullYear();

        if (field == 'birthYear') {
            array = array.map(e => ({ 'age': currentYear - e.birthYear }));
            field = 'age';
        }
        const statisticsObj = count(array, field, interval);
        return getPromise(Object.entries(statisticsObj).map(e => {
            const min = e[0] * interval;
            const max = min + interval - 1;
            return { min, max, count: e[1] };
        }), 5000)
    }
    async getAllEmployees() {
        return fetch(URL).then(response => response.json());
    }
     async  removeEmployee(id) {
        return getRequest(`${URL}/${id}`, request('DELETE') );
    }
    
     async  updateEmployee(employee) {
        return getRequest(URL, request('PUT',  JSON.stringify(employee)) );
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