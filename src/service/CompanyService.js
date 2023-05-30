import { count } from "../util/number-functions.js";
import { getRandomInt } from "../util/random.js";

export default class CompanyService {
    #employees;
    #minId;
    #maxId
    constructor(minId, maxId) {
        this.#employees = {};
        this.#minId = minId;
        this.#maxId = maxId;

    }
    addEmployee(employee) {
        const id = this.#getId();
        this.#employees[id] = {...employee, id};

    }
    #getId() {
        let id;
        do {
            id = getRandomInt(this.#minId, this.#maxId);
        }while(this.#employees[id]);
        return id;
    }
    getStatistics(field, interval) {
        let array = Object.values(this.#employees);
        const currentYear = new Date().getFullYear();
        
        if (field == 'birthYear') {
            array = array.map(e => ({'age': currentYear - e.birthYear}));
            field = 'age';
        }
        const statisticsObj = count(array, field, interval);
        return Object.entries(statisticsObj).map(e => {
            const min = e[0] * interval;
            const max = min + interval - 1;
            return {min, max, count: e[1]};
        })
    }
}