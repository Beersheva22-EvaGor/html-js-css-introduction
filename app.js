/* // const person = {name: 'Vasya', id: 123, birthYear: 1990, 
// address: {country: 'Israel', city: 'Tel-Aviv', street: 'Bney barak'}};

function createPerson(id, name, birthYear, country, city, street){
    return {id, name, birthYear, address: {country, city}};
}

const person1 = createPerson(123, 'Vasya', 1999, 'Israel', 'Rehovot');
const person2 = createPerson(123, 'Vasya', 1999, 'Israel', 'Rehovot');
// console.log(`person1 == person2 is ${person1 == person2}`);
// console.log(person1.name);
// console.log(person1['id']);
// console.log(person1['address']['city']);
function displayKeyValue(person, key1, key2){
    if (key2){
        console.log(`1 ${key1}, key2 ${key2} is ${person[key1][key2]}`);
    } else{
        console.log(`key ${key1} is ${person[key1]}`);      //person.key - won't work because key is an expression, if there's no such field it'll return undefined
    }
}
displayKeyValue(person1, 'address', 'city');
//Method 'keys' of Object returns array of key values
console.log("keys", Object.keys(person1));
//Method 'values' of Object returns array of values
console.log("values", Object.values(person1));
//Method 'entries' of Object returns array of arrays [key, value]
console.log("entries", Object.entries(person1));

const x = {};
x["ab"] = 2;
console.log(x["ab"]); */


//display strings with counter of occurencies in descender order of this counting
//if counts are equaled then in ascending order of values

// function displayOccurencies(array){
//     // const occureces = array.reduce ((obj, s) => {
//     //     obj[s] = obj[s] ? obj[s] + 1 : 1;
//     //     return obj;
//     // }, {})

//     const occurences = array.reduce ((obj, s) => ({...obj, [s]: obj[s] ? obj[s] + 1 : 1}), {})   // shortes description

//     Object.entries(occurences).sort((e1, e2) => e1[1]==e2[1] ? 
//     e1[0].localeCompare(e2[0]): e2[1] - e1[1])
//     .forEach(e => console.log(`${e[0]} -> ${e[1]}`));
// }

// displayOccurencies(["lmn", "ab", "lmn", "lmn", "c", "d", "ab", "a", "a","c", "cd", "cd"]) ;


// const y = {x: 0};
// delete y.x;     // it's an operator
// console.log(y.x); // call field (y[x] == y['x']- Exception Reference because x is not defined)

//anagramm

const getOccurences = array => array.reduce ((obj, s) => ({...obj, [s]: obj[s] ? obj[s] + 1 : 1}), {}) ;

function isAnagram (word, anagram){    
    let res = false;
    if (word.length === anagram.length){
        word = word.toLowerCase();
        anagram = anagram.toLowerCase();
        const occurences = getOccurences(Array.from(word));
        res = Array.from(anagram).every(s => occurences[s]-- > 0);
    }
    return res;
}

console.log(isAnagram('s-striings', 's-isngsstr'));
