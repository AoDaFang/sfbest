/*
 	用jsonp进行跨域访问
 */
function jsonp(url,data,success){
	var script = document.createElement("script");//创建一个script标记
	
	document.body.appendChild(script);//把这个script标记加入body
	
	//把参数拼接到url中
	url += "?";
	for(var attr in data){
		url += attr+"="+data[attr]+"&";
	}
	url = url.slice(0,-1);
	console.log(url);
//	console.log(url)
	
	script.src = url;
	
	script.onload = function(){//当script加载完成把这个标签再删除
		document.body.removeChild(script);
	}
	
	window[data.callback] = function(data){
		/*
		 	引入的script相当于是引入了一个  在全局范围上调用getData()方法的 js文件，所以说如果getData直接声明在jsonp函数中，就会导致无法调用
		 	用window.getDate  可以提升这个方法的作用范围，才可被调用
		 	
		 	这个函数是定义了getData方法，引入js是在远程调用了这个方法而且传入了一个我们需要的值(一个json)
		 	这个值在当前页面被接住，接入data中，再传入success中的data，最终在jsonp传入的参数中的函数中输出
		 */
		success(data);
	}
}

/*
 	{
 		code:"utf-8",
 		q:"遥控器",
 		callback:"getData",
 		area:"b2c"
 	}
 */


//jsonp("https://suggest.taobao.com/sug?code=utf-8&q=遥控器&callback=getData&area=b2c",//jsonp调用举例
//	function(now_data){
//		console.log(now_data);
//});