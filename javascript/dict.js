/*
node dict.js a dog chase ...

*/

var dict = {
  dog: "狗",
  cat: "貓",
  a: "一隻",
  chase: "追",
  eat: "吃"
}
//傳入輸入的陣列 eng  一次船全部的字 [a,dog,...]
function trans(eng){
  var chinese = [];
  for(var i in eng)
  {
    var engWord = eng[i];
    //用英文茶中文
    var chineseWord = dict[engWord];
    chinese.push(chineseWord);
  }
  return chinese;
}

var content = trans(process.argv.slice(2));
console.log(content);
