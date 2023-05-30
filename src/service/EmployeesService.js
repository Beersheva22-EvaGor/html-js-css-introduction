import config from "../config/service-config.json" assert {type: 'json'};

const age = year =>+(new Date().toISOString().substring(0,4)) - year;
export default class EmpolyeesService {
    #employees
    #birthYearEmployees
    constructor() {
        this.#employees = [];
        this.#birthYearEmployees =Array.from( new Array(config.maxAge - config.minAge), function() { return []; } );
    }

    addEmployee(employee) {
        this.#employees.push(employee);
        let arEmployees = this.#birthYearEmployees[age(employee.birthYear) - config.minAge - 1];
        try{arEmployees.push(employee);
        } catch(e){
            console.log(e, employee);
        }
    }

    async getAgeStatistics(minAge, maxAge){
        const filtered = this.#birthYearEmployees.slice(minAge, maxAge).filter(o => o.length > 0);
        if (filtered.length == 0){
            return [];
        }
        return filtered.flat();
    }
}