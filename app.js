var pokemon = {
    firstname: 'Pika',
    lastname: 'Chu ',
    getPokeName: function () {
        var fullname = this.firstname + ' ' + this.lastname;
        return fullname;
    }
};

var pokemonName = function (s) {
    console.log(this.getPokeName() + 'I choose you!' + s);
};

Function.prototype.myBind = function (obj, ...bindedArgs) {
    return (...args) => {
        obj.bindedFunction = this;
        const res = obj.bindedFunction(bindedArgs, ...args);
        delete obj.bindedFunction;
        return res;
    };
}

let logPokemon = pokemonName.myBind(pokemon); // creates new object and binds pokemon. 'this' of pokemon === pokemon now
logPokemon(' The end'); // 'Pika Chu I choose you!'

