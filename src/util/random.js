import config from "../config/service-config.json" assert {type: 'json'};
import girlNames from "../config/girl-names.json" assert {type: 'json'};
import boyNames from "../config/boy-names.json" assert {type: 'json'};

const MIN = +(new Date().toISOString().substring(0,4)) - config.maxAge;
const MAX = +(new Date().toISOString().substring(0,4)) - config.minAge;

export function getRandomInt(min, max){
    if (min == max){
        max++;
    } else if (min > max){
        [min, max]=[max, min];
    }
    return Math.trunc(min + Math.random()*(max - min));
}

export function getRandomElement(array){
    return array[getRandomInt(0, array.length)];
}

export function getRandomEmployee(){
    const randomName =  getRandomName_Gender();
    return {id:getRandomInt(100_000, 1_000_000_000), 
        name: randomName.name.replace('_',' '), 
        birthYear: getRandomInt(MIN, MAX), 
        gender: randomName.gender, 
        salary:  roundSalary(getRandomInt(config.minSalary,config.maxSalary), 2), 
        department: getRandomElement(config.departments)};
} 
function roundSalary(salary, num){
    // num - number of digits from the end of salary amount to be rouned
    const pow = Math.pow(10, num);
    return Math.round(salary/pow) * pow;
}

function getRandomName_Gender(){
    let gender = 'male';
    let name;
    if ( Math.round(Math.random()) == 1 ){
        name = getRandomElement(boyNames.names);
    } else {
        gender = 'female';
        name = getRandomElement(girlNames.names);
    }
    return {name, gender};
}