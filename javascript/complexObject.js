//example r+ x*i  "i" is complex , r & x are Integar
var complex ={
  add: function (NextcomplexI) {
    //origin(this) + Next(NextcomplexI)
    return complex.create(this.r + NextcomplexI.r ,this.i+ NextcomplexI.i);
  },
  toString: function () {
    return this.r + "+" + this.i + "i"
  },
  sub: function (NextcomplexI) {
    return complex.create(this.r - NextcomplexI.r, this.i - NextcomplexI.i);
  },
  //(this.r,this.i),(NextcomplexI.r,NextcomplexI.i)
  mul: function (NextcomplexI) {
    return complex.create(this.r * NextcomplexI.r - this.i * NextcomplexI.i,
                         this.r * NextcomplexI.i + this.i * NextcomplexI.r);
  },

};

complex.create = function (Integar,complexI) {
  var complexNumber = Object.create(complex);
    complexNumber.r = Integar;
    complexNumber.i = complexI;
    return  complexNumber;

};



var complexNumberOne = complex.create(1,2);
var complexNumberTwo = complex.create(2,1);
// Three = one + Two + Two + Two
var complexNumberThree = complexNumberOne.add(complexNumberTwo).add(complexNumberTwo).add(complexNumberTwo);


console.log("complexNumberOne = %j", complexNumberOne);
console.log("complexNumberTwo = %j", complexNumberTwo);
console.log("complexNumberThree = %j", complexNumberThree); //7+5i

console.log("String->complexNumberOne = %s", complexNumberOne);
console.log("String->complexNumberTwo = %s", complexNumberTwo);
console.log("String->complexNumberThree = %s", complexNumberThree); //7+5i

console.log("mul->complexNumberOne.mul(complexNumberTwo)",complexNumberOne.mul(complexNumberTwo));
console.log("sub->complexNumberOne.sub(complexNumberTwo)",complexNumberOne.sub(complexNumberTwo));
