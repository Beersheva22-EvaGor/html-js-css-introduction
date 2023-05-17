this.x = 100;
// console.log(this);
function f1(){
    return this;
}

const f2 = () =>{
    return this;
};

// // console.log('f1 = ', f1());
// // console.log('f2 =', f2());
// // console.log((() =>{
// //     console.log(this);
// // })());
// const x = {f1: function(){
//     return this;
// }, f2: ()=> this};
// console.log('x.f1 calls result ', x.f1());
// console.log('x.f2 calls result ', x.f2());

const rectangle1 = {width: 20, height: 20, square: function(){
    return this.width * this.height
}, perimeter: function () {return (this.width + this.height)*2}};

const rectangle2 = {height: 20, width: 20, square: function(){
    return this.width * this.height
}, perimeter: () => (this.width + this.height)*2};
console.log(`square = ${rectangle1.square()}`);
console.log(`permiter = ${rectangle1.perimeter()}`);


const point = {x: 3, y: 4};
function displayPoint(z, t){
console.log(`x = ${this.x}, y = ${this.y}, z = ${z}, t = ${t}`);
}

const d1 = displayPoint.bind(point, 200, 300);
d1.call();

displayPoint.apply(point, [300, 400]);

console.log(JSON.stringify(rectangle1) == JSON.stringify(rectangle2));

//to create deep copy object
const rectangle = JSON.parse(JSON.stringify(rectangle1));
//on another hand shallow copy:
const rectangle3 = {...rectangle};
console.log(s);

