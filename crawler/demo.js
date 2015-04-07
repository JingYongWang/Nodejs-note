
var http = require("http");
//var fs = require("fs");

// Utility function that downloads a URL and invokes
// callback with the data.
function download(url, callback) {
  http.get(url, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on("end", function() {
      callback(data);
    });
  }).on("error", function() {
    callback(null);
  });
}


var cheerio = require("cheerio");
var result = [];
var url="http://www.appledaily.com.tw/";

download(url, function(data) {
	if(data){
		//console.log(data);

		//cheerio.load(),把html解析成DOM對象,像jquery css選擇器查詢那樣對這個DOM進行篩選
		var $ = cheerio.load(data);  //把＄變成一個變數名,只是為了像jquery的概念
		$("a").each(function (i,e){
			console.log($(e).attr("href"));
		});
		//fs.writeFileSync("result.json", JSON.stringify(result))
		console.log("done");
	}
	else
		console.log("error");
});


//<a class="downbtn" href="http://mov.bn.netease.com/mobilev/2013/1/F/G/S8KTEF7FG.mp4" id="M8KTEKR84" target="_blank"></a>
//$("a.downbtn").attr("href");