/*
node dict.js a dog chase ...

*/

var dict = {
  dog: "狗",
  cat: "貓",
  a: "一隻",
  chase: "追",
  eat: "吃",
  狗: "dog",
  貓: "car",
  一隻: "a",
  追: "chase",
  吃: "eat"
}
//傳入輸入的陣列 arr  一次船全部的字 [a,dog,...]
function trans(arr){
  var outputContent = [];
  for(var i in arr)
  {
    var Input = arr[i];
    //用英文茶中文
    var Output = dict[Input];
    outputContent.push(Output);
  }
  return outputContent;
}

var content = trans(process.argv.slice(2));
console.log(content);
