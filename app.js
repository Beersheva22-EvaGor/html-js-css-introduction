const x = {x: "x", toString: function(){return "x"}};
const y = {y : "y", toString: function(){return "kuku"}};
const d = {x: 10, y: 20};
// x.toString = function(){return "xx"};
// d[x] = 100;
// console.log(d);
// d[y] = 200;
// console.log(d);
// console.log(d[x]);
// const f = function(){return "xx"};
const num = 2;
num.x = 100;
console.log(num.x);
const mn = {};
mn.x = 100;
console.log(mn, mn.x);
let ddd;
// ddd.x = 200; //TypeError because indefined doesn't have wrapping class
(1+2).xxxx = 1000;

let str1 = "abcd";
str1[0] = '*';
console.log(str1[0]);

// f.x = function(a,b){
//     return a + b;
// }
// // console.log(f.x(10, 20));
// // console.log((2).x); // = num.x

// const xx={xx:"45x"};
// const dd = {xx: 10};
// // dd['xx']= 20;
// console.log(dd, xx, dd.xx);

// [2].x = 10;
// console.log([2].x);
// const ar =[2];
// ar.x = 10;
// console.log(ar, Array.from({length : 2}), ar[x]);
// console.log(Array.from({length:26}).map((__, index)=>String.fromCharCode(index + 'a'.charCodeAt(0))).map(s => `<div>${s}</div>`).join(''));

