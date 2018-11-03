var Cookie = {
	setCookie: function(key, value, days) {
		days = 7 || days; //默认的参数值
		var date = new Date();
		date.setDate(date.getDate() + days);
		document.cookie = key + "=" + value + "; expires=" + date;
	},
	getCookie: function(key) {
		var cookies = document.cookie.split("; ");
		for(var i = 0; i < cookies.length; i++) {
			var cook = cookies[i].split("=");
			if(cook[0] == key) {
				return cook[1];
			}
		}
	},
	removeCookie: function removeCookie1(key) {
		setCookie(key, "", -1);
	},
	clearCookie: function() {
		var cookies = document.cookie.split("; ");
		for(var i = 0; i < cookies.length; i++) {
			var cook = cookies[i].split("=");
			removeCookie(cook[0]);
		}
	}
}