function User() {
  this.name = "";
  this.life = 100;
  this.giveLife = function giveLife(targetPlayer) {
    targetPlayer.life += 1;
    console.log(this.name + " give 1 life to " + targetPlayer.name);
  }
}

var Bucky = new User();
var Mary = new User();

Bucky.name = "Bucky";
Mary.name = "Mary";
Bucky.giveLife(Mary);

console.log("Bucky: " + Bucky.life);
console.log("Mary: " + Mary.life);

//Add function to All Object
User.prototype.attack = function(targetPlayer) {
  targetPlayer.life -= 5;
  console.log(this.name + " life is attack by " + targetPlayer);
}

Mary.attack(Bucky);
console.log("Bucky: " + Bucky.life);
console.log("Mary: " + Mary.life);

//add prototype to all object
User.prototype.magic = 60;
console.log(Bucky.magic);
console.log(Mary.magic);
