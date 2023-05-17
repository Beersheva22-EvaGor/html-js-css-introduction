
Array.prototype.myforEach = function (f) {
    for (let i = 0; i < this.length; i++) {
        this[i] = f(this[i], i, this);
    }
};
//test
[1, 2, 3].myforEach(x => console.log(x));

Array.prototype.myfilter = function (f) {
    let res = [];
    this.forEach((v, k) => res.push(f(v, k, this)));
    return res;
}
//test
console.log([1, 2, 3].myfilter(x => x % 2 == 0));

Array.prototype.mymap = function (f) {
    for (let i = 0; i < this.length; i++)
        this[i] = f(this[i], i, this);
    return this;
}
//test
console.log([1, 2, 3].mymap(x => x ** 3));

Array.prototype.myReduce = function (f, first) {
    let acc = first ? f(first, this[0], 0, this) : this[0];
    for (let i = 1; i < this.length; i++) {
        acc = f(acc, this[i], i,this);
    }
    return acc;
}
//test
console.log([1, 2, 3, 4].myReduce((acc, curr) => { return acc + curr }));
console.log([1, 2, 3, 4].myReduce((acc, curr) => { return acc + curr }, 1));

////////////

class Deferred {
    #ar=[];
    constructor() {
    }
    then(f) {
        this.#ar.push(f);
    }
    resolve(s) {this.#ar.forEach(f => s = f(s));
    }
}
const d = new Deferred();
d.then(function(res){ console.log("1 ", res); return "a"; });

d.then(function(res){ console.log("2 ", res); return "b"; });

d.then(function(res){ console.log("3 ", res); return "c"; });
d.resolve('hello');