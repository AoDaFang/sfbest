(function() {
	$("#top").load('html/top.html', function() {
		$(".city_title span").html(decodeURI(getCookie("city")));
		$(".chosing_citys dl dt span").click(clicking_city);
		$(".city_chosing_middle ul li").click(clicking_city);
		$(".city_chosing_head b").click(function() { //给叉号添加点击事件
			$(".city_chosing").removeClass("active");
			$(".city_chosing_bottom ul li").removeClass("active");
			$(".chosing_citys dl").removeClass("active");
		});
		$(".top_in_two").hover(function() {
			$(".city_chosing").addClass("active");
		}, function() {
			$(".city_chosing").removeClass("active");
			$(".city_chosing_bottom ul li").removeClass("active");
			$(".chosing_citys dl").removeClass("active");
		})
		$(".city_chosing_bottom ul li").click(
			function() {
				//							$(".citys dl").removeClass("active");
				//							$(".city_chose_bottom ul li").removeClass("active");

				$(this).toggleClass("active").siblings().removeClass("active"); //按钮本身的变化

				$(this).parent().next().children().eq($(this).index()).toggleClass("active").siblings().removeClass("active"); //下方城市列表的变化

				$(this).parent().next().siblings(".chosing_citys").children().removeClass("active"); //清除除了这个城市之外的所有列表

				$(this).parent().siblings("ul").children().removeClass("active"); //清除除了本行按钮之外的所有按钮的活动样式
			}
		);
		
		//检测当前的cookie，若有login cookie则改变相应的值
		   //setCookie("login","123456");//测试代码
		
		if(!getCookie("login") == ""){
			$(".login").css("display","none");
			$(".login_active").css("display","block");
			$(".login_active span").html(getCookie("login"));
		}
		
		//退出按钮
		$(".login_active p").click(function(){
//			$(".login").css("display","block");
//			$(".login_active").css("display","none");
			setCookie("login","");//设置登录cookie为空
			window.location.href='index.html';//退出后跳转到首页
			//location.reload();
			
		})
		
	});

	function click_city() {
		setCookie("city", "" + encodeURI(this.innerHTML) + ""); //将城市汉字转化为编码加入到cookie中
		console.log(decodeURI(this.innerHTML));
		$(".city_mask").css("display", "none");
		$(".city_chose").css("display", "none");
		$("#city").css("display", "none");
		$(".city_title span").html(decodeURI(getCookie("city")));
	}

	function clicking_city() {
		setCookie("city", "" + encodeURI(this.innerHTML) + ""); //将城市汉字转化为编码加入到cookie中
		console.log(decodeURI(this.innerHTML));
		$(".city_chosing").removeClass("active");
		$(".city_title span").html(decodeURI(getCookie("city")));
	}
})()