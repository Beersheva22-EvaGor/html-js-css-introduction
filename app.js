// // const ar = [];
// // ar[10] = 100;
// // ar[0] = 'hello';
// // ar[3] = [];
// // ar.length=0;
// // []  && console.log(true);

// // // add at array end
// // ar[ar.length] = 10;
// // ar[2] = [];
// // console.log(1[0]);

// // ar[3] = 'hello';
// // ar[3] [0] = '*';
// // ar[2][0] = 10;
// // console.log(ar[3][0]);
// // console.log(ar[2][0]);
// // // console.log(a(0));
// // ar2 = [1, 2, 3];
// // let s = ar.push(...ar2); // add array contains 3 elements
// // ar.forEach(console.log);
// // ar[10];

// // method "map" - returns array with the same dimentions but with "mapped" values
// // console.log([1, 2 ,3].map(n => n ** 2));

// //task: function that returns random int in a given diapason
// function getRandomIntNumber(min, max, minInclusive = true, maxInclusive = false) {
//     if (!minInclusive) {
//         min++;
//     }
//     if (maxInclusive) {
//         max++;
//     }
//     return min < max ? Math.trunc(min + Math.random() * (max - min)) : NaN;
// }
// function getArrayRandomIntNumbers(nNumbers, min, max, minInclusive = true,
//     maxInclusive = false) {
//     let res = [];
//     res.length = nNumbers;
//     res = [...res];
//     return res.map(() => getRandomIntNumber(min, max, minInclusive, maxInclusive))
// }

// //test
// // console.log(getArrayRandomIntNumbers(5, -20, 2));

// // let ar = [];
// // ar.push(1, 2, 3);
// // ar.length = 10;
// // ar = [...ar];
// // console.log(ar);

// // ordered list where every li includes a random number

// function getOrderedList([...ar]) {
//     function getSymbol(n) {
//         let str = s => `<div class="div-square ${s}"></div>`;
//         return !n ? str('color-white') : str('color-black');
//     }

//     return `<ol style="text-align: center; list-style: none">\n${ar.map(n => listItems(n)).join('')}</ol>\n`;
// }

// function listItems(n) {
//     let s = getSymbol(n); return `${' '.repeat(4)}<li style = "font-size:30px">${s}</li>\n`;
// }

// //test
// // console.log(getOrderedList([1, 2, 3]));

// // bodyID.innerHTML = getOrderedList(getArrayRandomIntNumbers(10, 0 , 1));

// function getMatrixRandomIntNumbers(rows, columns, min, max) {
//     let ar = [];
//     ar.length = rows;
//     ar = [...ar];
//     return ar.map(() => getArrayRandomIntNumbers(columns, min, max));
// }

// console.log(getMatrixRandomIntNumbers(3, 3, 0, 2));

// function getChessMatrix() {
//     const size = 8;
//     let ar = [];
//     ar.length = size;
//     let row = 0;
//     let color;
//     ar = [...ar].map(() => {
//         color = row % 2;
//         let arRow = [...(new Array(size))].map(() => {
//             color = !color;
//             return +color;
//         })
//         row++;
//         return arRow;
//     });
//     return ar;
// }

// function chessHTML() {
//     let ar = getChessMatrix();
//     function whiteBlack(n) {
//         let color = n ? 'color-black' : 'color-white';
//         return `<div class="div-square ${color}"></div>`;
//     }
//     ar = [...ar].map(n => `<li> ${[...n].map(s => whiteBlack(s)).join('')}</li>`);
//     return `<ol style="text-align: center; list-style: none;">${[...ar].join('')}</ol>`
// }

// // bodyID.innerHTML = chessHTML();

// let arS = [10, 20, -70, 100, 6, -10, 0];
// const arI = [1, 2, 3];
// let index = arS.indexOf(-70);
// arS.splice(index + 1, 0, ...arI);
// console.log(arS);
// console.log(arS.splice(index + 1, 3));
// console.log(arS);
// console.log(arS.slice(index + 1, index + 4));
// console.log(arS);

// let indexFirstNegative = arS.find(v => v < 0);
// console.log(index == indexFirstNegative);
// arS = arS.filter(v => v > 0);
// console.log(arS);
// console.log(arS.every(n => n > 0));
// console.log(arS.some(n => n < 0));


/*----- HOMEWORK-----*/
// const setInBoundaries = (min, max, num) => num < min ? min : (num > max ? max : num);

// function arrayCopy(src, posSrc, dest, posDest = 0, length) {
//     posSrc = setInBoundaries(0, src.length, posSrc);
//     posDest = setInBoundaries(0, dest.length, posDest);
//     length = setInBoundaries(0, src.length - 1 - posSrc, length);
//     return length > 0 ? dest.splice(posDest, 0, src.slice(posSrc, length)) : dest;
// }

// function moveElement(array, position, shift) {
//     let index = position + setInBoundaries(-position, array.length - position - 1, shift);
//     let element = array[position];
//     array.splice(position, 1);
//     return array.splice(index, 0, element);
// }

/*-----TESTS-----*/
// //test1
// const src = [1, 2, 3, 4, 5, 6, 7];
// let dest = [10, 20, 30, 40, 50, 60, 70];
// let funcs = [function () { return arrayCopy(src, -5, dest, 0, 2) },
//             function () { return arrayCopy(src, 100, dest, 0, 2) },
//             function () { return arrayCopy(src, 0, dest, dest.length, 2) }];
// let resuls = [[1, 2, 10, 20, 30, 40, 50, 60, 70],
//             [10, 20, 30, 40, 50, 60, 70],
//             [10, 20, 30, 40, 50, 60, 70, 1, 2]];
// let test = true;
// for (let i = 0; i < funcs.length; i++) {
//     dest = [10, 20, 30, 40, 50, 60, 70];
//     funcs[i]();
//     test = test && dest.toString() == resuls[i].toString();
//     if (!test) console.log(dest);
// }
// console.log(test);
// //test2
// moveElement(src, 2, 1);
// console.log(`test \'moveElement\': ${[1, 2, 4, 3, 5, 6, 7].toString() == src.toString() ? true : false + ': ' + src}`);

/*-----Classwork-----*/
// let ar = [10, 20, -70, 100, 6 , -10, 0];
// console.log(ar.reduce((accumulator, current) => accumulator + current));

// console.log(ar.reduce((accumulator, current) => Math.min(accumulator, current)));
// const minMax = ar => ar.reduce((accumulator, current) => { return [Math.min(accumulator[0], current), Math.max(accumulator[1], current)] }, [ar[0], ar[0]]);
// console.log(minMax(array));

let array = [10, 20, -70, 100, 6 , -10, 0, '12'];
console.log(array.sort((a,b) => a- b));