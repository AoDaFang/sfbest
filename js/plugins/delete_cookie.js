function delete_cookie(pid_now){
	var the_cookie = getCookie("cart"); //获取点击之前的cookie，以供本次使用
	var cookies = the_cookie.split("&"); //把每个商品的cookie拆分开
	for(var i = 0; i < cookies.length; i++) {
		var cooks = cookies[i].split("|"); //把每个商品的cookie再拆分成两个值
		//										console.log(cooks);
		if(cooks[0] == pid_now) { //如果匹配到这个商品的id
/*			cooks[1] == ""; //让这个商品的个数增加
			cooks[0] == "" */
			cookies.splice(i, 1);
			//break;
		}
	}
	//把数组再组装成字符串，赋给cookie
	setCookie("cart", cookies.join("&"));
}
