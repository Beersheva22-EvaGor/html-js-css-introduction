import boyNames from '../config/boy-names.json' assert {type: 'json'};
import girlNames from '../config/girl-names.json' assert {type: 'json'};

const maleNames = boyNames.names.map(n => n.replace('_', ' '));
const femaleNames = girlNames.names.map(n => n.replace('_', ' '));
export function getRandomInt(min, max) {
    if(min == max) {
        max++;
    } else if (min > max) {
        [min, max] = [max, min]
    }
    return Math.trunc(min + Math.random() * (max - min))

}
export function getRandomElement(array) {
    return array[getRandomInt(0, array.length)]
}
export function getRandomEmployee(minSalary, maxSalary, minYear, maxYear, departments) {
   const gender = getRandomElement(['male', 'female']);
   const name = getRandomElement(gender == 'female' ? femaleNames:maleNames);
    const birthYear = getRandomInt(minYear, maxYear + 1);
    const salary = getRandomInt(minSalary, maxSalary) * 1000;
    const department = getRandomElement(departments);
    return {
         name, birthYear, gender,
        salary, department};
}
