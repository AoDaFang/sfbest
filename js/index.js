requirejs.config({
	baseUrl:"js",
	paths:{
		baiduT:"plugins/baiduTemplate",
		page:"plugins/jPages",
		extend:"plugins/jquery.extend",
		jquery:"plugins/jquery.min",
		lazy:"plugins/jquery.lazyload",
		swiper:"plugins/swiper",
		cookie:"plugins/cookie",
		top:"modules/top",
		head:"modules/head",
		nav:"modules/nav",
		er_ji:"modules/er_ji"
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
		},
		top:{
			deps:["cookie","jquery"]
		},
		head:{
			deps:["cookie","jquery"]
		},
		nav:{
			deps:["cookie","jquery"]
		},
		er_ji:{
			deps:["cookie","jquery"]
		}
	}
});

requirejs(["jquery","swiper","baiduT","extend","lazy","page","cookie","top","head","nav","er_ji"],function($,Swiper,baidu){
			
			
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
			if(!getCookie("city")){//打开页面时，检测城市cookie是否存在若不存在，显示遮罩层
				
				$("#city").load('html/city_chose.html',function(){//加载外部的html代码模块,所有的关于城市选择的js代码都要在其中
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
				$(".city_title span").html(decodeURI(getCookie("city")));
			}
			function clicking_city(){
				setCookie("city",""+encodeURI(this.innerHTML)+"");//将城市汉字转化为编码加入到cookie中
				console.log(decodeURI(this.innerHTML));
				$(".city_chosing").removeClass("active");
				$(".city_title span").html(decodeURI(getCookie("city")));
			}
		//城市选择遮罩处理结束
		
		
		//轮播开始
		var colors = ["rgb(255, 191, 67)","rgb(250, 226, 182)","rgb(115, 42, 193)","rgb(0, 0, 0)","rgb(237, 184, 202)","rgb(29, 50, 83)","rgb(21, 80, 1)","rgb(189, 53, 54)"];
		
		
		var mySwiper = new Swiper ('.swiper-container', {
			initialSlide:0,//开始是第几张
			direction: 'horizontal', // 垂直切换选项
			loop: true, // 循环模式选项
			setWrapperSize:true,//增加对不支持弹性盒子浏览器的兼容性
			on: {
					init: function(){
//				      //Swiper初始化了
//				      console.log($(".swiper-pagination-bullet"))
//				      $(".swiper-pagination-bullet").each(function(index,ele){
//				      	console.log(index)
//				      })
//				      alert('当前的slide序号是'+this.activeIndex);
//				      this.emit('transitionEnd');//在初始化时触发一次transitionEnd事件
				    }, 
			   		 slideChangeTransitionEnd: function(){
			   		 	$(".slide_main").css("background",colors[this.activeIndex-1]);
//				      alert(this.activeIndex);//切换结束时，告诉我现在是第几个slide
				    }
			    }, 
			pagination: {
	       		el: '.swiper-pagination',
	       		clickable:true,
	     	 }
		});
		
		$(".swiper-pagination-bullet").hover(function() {
		    $(this).click(); //鼠标划上去之后，自动触发点击事件来模仿鼠标划上去的事件
		},function() {
		    mySwiper.autoplay.start(); //鼠标移出之后，自动轮播开启
		})

		//轮播结束
		
		//轮播右侧遮罩图开始
		$(".slider_mask_pics img").hover(function(){
			$(this).parent().siblings().children(".slider_masks").css("display","block");
		},function(){
			$(".slider_masks").css("display","none");
		})
		//轮播右侧遮罩图结束
		
		//优选必买处理开始
		$.ajax({
			url:"http://www.sfbest.com/ajaxIndex/GetPerfectGoods",
			dataType:'jsonp',
			jsonpCallback:"jsonp1541215666386",
			data:{
				callback:"jsonp1541215666386"
			},
			success:function(data){
				$.each(data.upProduct, function(index,ele) {
					console.log(index);
					$(".must_buy_up ul").append('<li><p>'+ele.name+'</p><span>￥<b>'+ele.price+'</b></span><img src="'+ele.img+'"/><div class="add_goods_btns"><a href="#">加入购物车</a></div></li>');
				});
				$.each(data.downProduct, function(index,ele) {
					console.log(index);
					$(".must_buy_down ul").append('<li><p>'+ele.name+'</p><span>￥<b>'+ele.price+'</b></span><img src="'+ele.img+'"/><div class="add_goods_btns"><a href="#">加入购物车</a></div></li>');
				});
				//$("must_buy_up ul").append('<li><p>丹麦 猪蹄块/八戒有肉 600g 15315614561465456456</p><span>￥<b>36.8</b></span><img src="index_img/test-goods.png"/><div class="add_goods_btns"><a href="#">加入购物车</a></div></li>')
				
				$(".must_buy_in ul li").hover(function(){
					$(this).children(".add_goods_btns").animate({//第一个参数，要运动的属性
						top:225
					},{//第二个参数
						queue:false,//是否进行排队
					})
				},function(){
					$(this).children(".add_goods_btns").animate({//第一个参数，要运动的属性
						top:260
					},{//第二个参数
						queue:false,//是否进行排队
					})
				})
				
			}
		});
		$("must_buy_up ul")
		//优选必买处理结束
			
});
