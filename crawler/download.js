var http = require("http");

function download (url, callback) {
	http.get(url, function(res){
		var data="";
		res.on('data', function(chunk){
			data += chunk;
		});
		res.on("end", function(){
			callback(data);
		});
	}).on("error", function(){
		callback(null);
	});
}

var url = "http://www.appledaily.com.tw/"
download(url, function(data){
	if(data){
		console.log(data);
	}
	else
		console.log("error")
});


var cheerio = require("cheerio");

var url="http://www.appledaily.com.tw/";

download(url, function(data) {
	if(data){
		//console.log(data);

		//cheerio.load(),把html解析成DOM對象,像jquery css選擇器查詢那樣對這個DOM進行篩選
		var $ = cheerio.load(data);  //把＄變成一個變數名,只是為了像jquery的概念
		$("div.item > img.owl-lazy").each(function (i,e){
			console.log($(e).attr("href"));
		});
		console.log("done");
	}
	else
		console.log("error");
});

//fail access because  $("div.item > img.owl-lazy") cannot get param