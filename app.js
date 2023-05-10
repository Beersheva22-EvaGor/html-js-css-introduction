// const ar = [];
// ar[10] = 100;
// ar[0] = 'hello';
// ar[3] = [];
// ar.length=0;
// []  && console.log(true);

// // add at array end
// ar[ar.length] = 10;
// ar[2] = [];
// console.log(1[0]);

// ar[3] = 'hello';
// ar[3] [0] = '*';
// ar[2][0] = 10;
// console.log(ar[3][0]);
// console.log(ar[2][0]);
// // console.log(a(0));
// ar2 = [1, 2, 3];
// let s = ar.push(...ar2); // add array contains 3 elements
// ar.forEach(console.log);
// ar[10];

// method "map" - returns array with the same dimentions but with "mapped" values
// console.log([1, 2 ,3].map(n => n ** 2));

//task: function that returns random int in a given diapason
function getRandomIntNumber(min, max, minInclusive = true, maxInclusive = false) {
    if (!minInclusive) {
        min++;
    }
    if (!maxInclusive) {
        max++;
    }
    max = Math.trunc(max);
    min = Math.trunc(min);
    return Math.round(Math.random() * (max - min) + min);
}

function getNumber(number, inclusive, isMax) {
    if (Math.round(number) == number) {
        return inclusive ? number : (isMax ? number + 1 : number - 1);
    } else {
        return isMax ? number.ceil() : number.floor();
    }
}
// returns an array of non-unique randoms using map
function getArrayRandomIntNumbers(nNumbers, min, max, minInclusive = true, maxInclusive = false) {
    const ar = [];
    ar.length = nNumbers;
    return [...ar].map(() => getRandomIntNumber(min, max, minInclusive, maxInclusive));
}

//test
console.log(getArrayRandomIntNumbers(5, -20, 2));

// let ar = [];
// ar.push(1, 2, 3);
// ar.length = 10;
// ar = [...ar];
// console.log(ar);

// ordered list where every li includes a random number

function getOrderedList(ar) {
    ar = [...ar];
    let res = '<ol>\n';
    ar = ar.map(n => setLi(n));
    res += ar.join('');
    res += '</ol>\n';
    return res;
}

function setLi(n){
    return `${' '.repeat(4)}<li>${n}</li>\n`;
}

//test
console.log(getOrderedList([1, 2, 3]));