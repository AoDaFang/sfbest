//每次cookie值加1，删除cookie的方法在do_index_cart.js中

var dc = {
	do_cookie: function(btn, pid_now) {
//		var that = btn;
		var pid = pid_now; //获取当前的商品id
		var the_cookie = getCookie("cart"); //获取点击之前的cookie，以供本次使用
		if(!the_cookie) { //当还没有cookie
			setCookie("cart", pid + "|1", 7);
		} else {
			if(!isRepeat(pid)) { //当已经有cookie但是没有本商品的cookie项时
				setCookie("cart", the_cookie + "&" + pid + "|1", 7);
			} else {
				var cookies = the_cookie.split("&"); //把每个商品的cookie拆分开
				for(var i = 0; i < cookies.length; i++) {
					var cooks = cookies[i].split("|"); //把每个商品的cookie再拆分成两个值
					//										console.log(cooks);
					if(cooks[0] == pid) { //如果匹配到这个商品的id
						cooks[1]++; //让这个商品的个数增加
						cookies.splice(i, 1, cooks.join("|"));
						//break;
					}
				}
				//把数组再组装成字符串，赋给cookie
				setCookie("cart", cookies.join("&"));
			}
		}

		function isRepeat(num) { //检测cookie是否重复
			var cookies = getCookie("cart").split("&");

			for(var i = 0; i < cookies.length; i++) {
				var cooks = cookies[i].split("|");
				if(cooks[0] == num) {
					return true;
				}
			}
			return false;
		}

	}
}
//开始cookie处理
/*function do_cookie(){
			var pid = $(that).siblings("img").attr("pid");//获取当前的商品id
			var the_cookie = getCookie("cart");//获取点击之前的cookie，以供本次使用
			if(!the_cookie){//当还没有cookie
				setCookie("cart",pid+"|1",7);
			}else{
				if(!isRepeat(pid)){//当已经有cookie但是没有本商品的cookie项时
					setCookie("cart",the_cookie+"&"+pid+"|1",7);
				}else{
					var cookies = the_cookie.split("&");//把每个商品的cookie拆分开
					console.log("商品种数",cookies.length);
					
					for(var i = 0;i<cookies.length; i++){
						var cooks = cookies[i].split("|");//把每个商品的cookie再拆分成两个值
	//										console.log(cooks);
						if(cooks[0] == pid){//如果匹配到这个商品的id
							console.log("cookie加1")
							cooks[1]++;//让这个商品的个数增加
							cookies.splice(i,1,cooks.join("|"));
							//break;
						}
					}
					//把数组再组装成字符串，赋给cookie
					setCookie("cart",cookies.join("&"));			
				}
			}
		}*/
/*function isRepeat(num){//检测cookie是否重复
	var cookies = getCookie("cart").split("&");
	
	for(var i = 0;i<cookies.length; i++){
		var cooks = cookies[i].split("|");
		if(cooks[0] == num){
			return true;
		}
	}
	return false;
}*/
//cookie处理结束