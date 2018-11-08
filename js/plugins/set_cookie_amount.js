//这个方法是在确认本项cookie已存在的基础上，设置cookie的方法

function setCookieAmount(pid_now,amount){
	var the_cookie = getCookie("cart"); //获取点击之前的cookie，以供本次使用
	var cookies = the_cookie.split("&"); //把每个商品的cookie拆分开
	for(var i = 0; i < cookies.length; i++) {
		var cooks = cookies[i].split("|"); //把每个商品的cookie再拆分成两个值
		//										console.log(cooks);
		if(cooks[0] == pid_now) { //如果匹配到这个商品的id
			cooks[1] = amount;  //设置本项cookie数值
			cookies.splice(i, 1, cooks.join("|"));//将这个cookie加入到原数组
		}
	}
	//把数组再组装成字符串，赋给cookie
	setCookie("cart", cookies.join("&"));
}
