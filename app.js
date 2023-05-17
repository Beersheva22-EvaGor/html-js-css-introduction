
// Array.prototype.map = function (){
//     return 'kuku';
// }
// console.log([1, 2, 3].map());

//signon hadash
class Rectangle {
    #width; //private
    #height;
    constructor(width, height) {
        this.#width = width;
        this.#height = height;
        this.perimeter = function () {
            return 2 * (this.#width + this.#height);
        };
    }
    perimeter(){
        return 2*(this.#width + this.#height);
    }
    square() {
        return this.#width * this.#height;
    }
};

const rectangle = new Rectangle(3, 4);   
console.log(rectangle.perimeter());

class Square extends Rectangle{
    constructor (width){
        super(width, width);
    }
}

console.log(new Square(12).perimeter());


Array.prototype.forEach = function(f){
    for (let i = 0; i< this.length; i++){
       this[i] = f(this[i]);

    }
    return this;
};

[1,2,3].forEach(x => console.log(x));