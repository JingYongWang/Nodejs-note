var fs = require('fs');
var data = fs.readFileSync("a1.txt");
console.log(data);
fs.writeFileSync("a2.txt", data);
var data2 = fs.readFileSync("a2.txt");
console.log(data.toString());
fs.writeFileSync("a3.txt", data);
