//添加（更改
function setCookie(key,value,days){
	days = 7 || days;//默认的参数值
	var date = new Date();
	date.setDate(date.getDate()+days);
	document.cookie = key+"="+value+"; expires="+date;
}

//查询
function getCookie(key){
	var cookies = document.cookie.split("; ");
	for(var i = 0; i<cookies.length; i++){
		var cook = cookies[i].split("=");
		if(cook[0]==key){
			return cook[1];
		}				
	}
}

//删除
function removeCookie(key){
	setCookie(key,"",-1);
}		

//清空
function clearCookie(){
	var cookies = document.cookie.split("; ");
	for(var i=0; i<cookies.length; i++){
		var cook = cookies[i].split("=");
		removeCookie(cook[0]);
	}
}