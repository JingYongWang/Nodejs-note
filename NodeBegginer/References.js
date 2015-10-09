var Bucky = {
  favFood: "seafood",
  favMovie: "chipp",
  printFirstName: function () {
    console.log("My name is Bucky");
    console.log(this === Bucky); //True
  }
}

var Person =  Bucky;
Person.favFood = "salad";

//Gobal
function doSomethingWorthless() {
  console.log("\n I am worthless");
  console.log(this === global);
}

console.log(Bucky.favFood);
Bucky.printFirstName();
doSomethingWorthless();
