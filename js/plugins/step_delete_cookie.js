//每次传入商品cookie减1
function stepDeleteCookie(pid_now) {
var pid = pid_now; //获取当前的商品id
var the_cookie = getCookie("cart"); //获取点击之前的cookie，以供本次使用
		var cookies = the_cookie.split("&"); //把每个商品的cookie拆分开
		for(var i = 0; i < cookies.length; i++) {
			var cooks = cookies[i].split("|"); //把每个商品的cookie再拆分成两个值
			//										console.log(cooks);
			if(cooks[0] == pid) { //如果匹配到这个商品的id
				cooks[1]--; //让这个商品的个数减少
				if(cooks[1] == 0){
					cookies.splice(i, 1);//如果这个商品的数量为0了，就删除这条cookie
				}else{
					cookies.splice(i, 1, cooks.join("|"));//如果在这个商品的数量还有，就继续把这个商品的cookie放入远cookie
				}
				
				//break;
			}
		}
		//把数组再组装成字符串，赋给cookie
		setCookie("cart", cookies.join("&"));
}
