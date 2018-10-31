requirejs.config({
	baseUrl:"js/plugins",
	paths:{
		baiduT:"baiduTemplate",
		page:"jPages",
		extend:"jquery.extend",
		jquery:"jquery.min",
		lazy:"jquery.lazyload",
		swiper:"swiper"
	},
	shim:{
		baiduT:{
			exports:"baidu"
		},
		page:{
			deps:["jquery"]
		},
		extend:{
			deps:["jquery"]
		},
		jquery:{
			exports:"jQuery"
		},
		lazy:{
			deps:["jquery"]
		},
		swiper:{
			exports:"Swiper",
			deps:["jquery"]
		}
	}
});

requirejs(["jquery","swiper","baiduT","extend","lazy","page"],function($,Swiper,baidu){
			
			
			//上方滚动广告定时处理
			setTimeout(function(){
				$(".head_prev").children().eq(1).animate({//大广告页面消失
					height : "0"
				},{
					complete:function(){//大广告display none
						$(this).css("display","none")
					}
				}).end().eq(0).css("display","block").animate({//小广告页面出现
					height : "80"
				}).children().eq(1).click(function(){//叉号赋予点击事件
					$(".head_prev_up").animate({//小广告高度清零
						height:"0"
					},{
						complete:function(){//小广告display none
							$(this).css("display","none")
						}
					});
				});
			},1000);
			
			//城市选择遮罩处理开始
//			if(!getCookie("city")){
//				setCookie("city","")
//			}
			if(!getCookie("city")){//打开页面时，检测城市cookie是否存在若不存在，显示遮罩层
				
				$("#city").load('city_chose.html',function(){//加载外部的html代码模块,所有的关于城市选择的js代码都要在其中
					$(".city_chose").center();//城市选择居中
					$(".city_mask").css("display","block");
					$(".city_chose").css("display","block");
					
					//为所有按钮加点击方法
					$(".citys span").click(click_city);
					$(".city_chose_middle ul li").click(click_city);
					
					//为所有省份加点击
					$(".city_chose_bottom ul li").click(
						function(){
//							$(".citys dl").removeClass("active");
//							$(".city_chose_bottom ul li").removeClass("active");
							
							$(this).toggleClass("active").siblings().removeClass("active");//按钮本身的变化
							
							$(this).parent().next().children().eq($(this).index()).toggleClass("active").siblings().removeClass("active");//下方城市列表的变化
							
							$(this).parent().next().siblings(".citys").children().removeClass("active");//清除除了这个城市之外的所有列表
							
							$(this).parent().siblings("ul").children().removeClass("active");//清除除了本行按钮之外的所有按钮的活动样式
						}
					)
					
				})

			}else{
				$("#city").css("display","none");
			}
			
			//定义点击城市改变cookie和各种相应的方法
			function click_city(){
				setCookie("city",""+encodeURI(this.innerHTML)+"");//将城市汉字转化为编码加入到cookie中
				console.log(decodeURI(this.innerHTML));
				$(".city_mask").css("display","none");
				$(".city_chose").css("display","none");
				$("#city").css("display","none");
			}
});
