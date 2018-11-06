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
			$(".lazy").lazyload();//图片懒加载
			
			
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
			url:"data/must_buy.json",
			dataType:'json',
//			jsonpCallback:"jsonp1541215666386",
			data:{
//				callback:"jsonp1541215666386"
			},
			success:function(data){
				$.each(data.upProduct, function(index,ele) {
					$(".must_buy_up ul").append('<li><p>'+ele.name+'</p><span>￥<b>'+ele.price+'</b></span><img pid="'+ele.product_id+'" src="'+ele.img+'"/><div class="add_goods_btns"><a href="#">加入购物车</a></div></li>');
				});
				$.each(data.downProduct, function(index,ele) {
					$(".must_buy_down ul").append('<li><p>'+ele.name+'</p><span>￥<b>'+ele.price+'</b></span><img pid="'+ele.product_id+'" src="'+ele.img+'"/><div class="add_goods_btns"><a href="#">加入购物车</a></div></li>');
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
				$(".lazy").lazyload();//图片懒加载
			}
		});
		//优选必买处理结束
		
		
		//水果处理开始
		$.ajax({
			url:"data/shui_guo.json",
			dataType:'json',
//			jsonpCallback:"jsonp1541411803363",
			data:{
//				callback:"jsonp1541411803363",
//				cId:7,
//				floorId:297
			},
			success:function(data){
				$.each(data,function(index,ele){
					$(".fruits .main_class_bottom_middle ul").append('<li><div class="main_class_bottom_middle_goodspic"><a href="#"><img class="lazy" pid="'+ele.product_id+'" data-original="'+ele.img+'"/></a><div class="main_class_bottom_middle_goodspic_btn"><b></b><span>加入购物车</span></div></div><p>'+ele.name+'</p><span><b>￥</b>'+ele.price+'</span></li>')
				});
				$(".lazy").lazyload();//图片懒加载
				$(".main_class_bottom_middle ul li").hover(function(){
					$(this).children(".main_class_bottom_middle_goodspic").children(".main_class_bottom_middle_goodspic_btn").animate({
						top:136
					},{
						queue:false//是否进行排队
					});
				},function(){
					$(this).children(".main_class_bottom_middle_goodspic").children(".main_class_bottom_middle_goodspic_btn").animate({
						top:160
					},{
						queue:false//是否进行排队
					});
				})
			}
		});
		//水果处理结束
		
		//生鲜处理开始
		$.ajax({
			url:"data/sheng_xian.json",
			dataType:'json',
			data:{
			},
			success:function(data){
				$.each(data,function(index,ele){
					$(".sheng_xian .main_class_bottom_middle ul").append('<li><div class="main_class_bottom_middle_goodspic"><a href="#"><img class="lazy" pid="'+ele.product_id+'" data-original="'+ele.img+'"/></a><div class="main_class_bottom_middle_goodspic_btn"><b></b><span>加入购物车</span></div></div><p>'+ele.name+'</p><span><b>￥</b>'+ele.price+'</span></li>')
				});
				$(".lazy").lazyload();//图片懒加载
				$(".main_class_bottom_middle ul li").hover(function(){
					$(this).children(".main_class_bottom_middle_goodspic").children(".main_class_bottom_middle_goodspic_btn").animate({
						top:136
					},{
						queue:false//是否进行排队
					});
				},function(){
					$(this).children(".main_class_bottom_middle_goodspic").children(".main_class_bottom_middle_goodspic_btn").animate({
						top:160
					},{
						queue:false//是否进行排队
					});
				})
			}
		});
		//生鲜处理结束
		
		//冷藏处理开始
		$.ajax({
			url:"data/leng_cang.json",
			dataType:'json',
			data:{
			},
			success:function(data){
				$.each(data,function(index,ele){
					$(".leng_cang .main_class_bottom_middle ul").append('<li><div class="main_class_bottom_middle_goodspic"><a href="#"><img class="lazy" pid="'+ele.product_id+'" data-original="'+ele.img+'"/></a><div class="main_class_bottom_middle_goodspic_btn"><b></b><span>加入购物车</span></div></div><p>'+ele.name+'</p><span><b>￥</b>'+ele.price+'</span></li>')
				});
				$(".lazy").lazyload();//图片懒加载
				$(".main_class_bottom_middle ul li").hover(function(){
					$(this).children(".main_class_bottom_middle_goodspic").children(".main_class_bottom_middle_goodspic_btn").animate({
						top:136
					},{
						queue:false//是否进行排队
					});
				},function(){
					$(this).children(".main_class_bottom_middle_goodspic").children(".main_class_bottom_middle_goodspic_btn").animate({
						top:160
					},{
						queue:false//是否进行排队
					});
				})
			}
		});
		//冷藏处理结束
		
		//粮油处理开始
		$.ajax({
			url:"data/liang_you.json",
			dataType:'json',
			data:{
			},
			success:function(data){
				$.each(data,function(index,ele){
					$(".liang_you .main_class_bottom_middle ul").append('<li><div class="main_class_bottom_middle_goodspic"><a href="#"><img class="lazy" pid="'+ele.product_id+'" data-original="'+ele.img+'"/></a><div class="main_class_bottom_middle_goodspic_btn"><b></b><span>加入购物车</span></div></div><p>'+ele.name+'</p><span><b>￥</b>'+ele.price+'</span></li>')
				});
				$(".lazy").lazyload();//图片懒加载
				$(".main_class_bottom_middle ul li").hover(function(){
					$(this).children(".main_class_bottom_middle_goodspic").children(".main_class_bottom_middle_goodspic_btn").animate({
						top:136
					},{
						queue:false//是否进行排队
					});
				},function(){
					$(this).children(".main_class_bottom_middle_goodspic").children(".main_class_bottom_middle_goodspic_btn").animate({
						top:160
					},{
						queue:false//是否进行排队
					});
				})
			}
		});
		//粮油处理开始
		
		//糖巧处理开始
		$.ajax({
			url:"data/tang_qiao.json",
			dataType:'json',
			data:{
			},
			success:function(data){
				$.each(data,function(index,ele){
					$(".tang_qiao .main_class_bottom_middle ul").append('<li><div class="main_class_bottom_middle_goodspic"><a href="#"><img class="lazy" pid="'+ele.product_id+'" data-original="'+ele.img+'"/></a><div class="main_class_bottom_middle_goodspic_btn"><b></b><span>加入购物车</span></div></div><p>'+ele.name+'</p><span><b>￥</b>'+ele.price+'</span></li>')
				});
				$(".lazy").lazyload();//图片懒加载
				$(".main_class_bottom_middle ul li").hover(function(){
					$(this).children(".main_class_bottom_middle_goodspic").children(".main_class_bottom_middle_goodspic_btn").animate({
						top:136
					},{
						queue:false//是否进行排队
					});
				},function(){
					$(this).children(".main_class_bottom_middle_goodspic").children(".main_class_bottom_middle_goodspic_btn").animate({
						top:160
					},{
						queue:false//是否进行排队
					});
				})
			}
		});
		//糖巧处理结束
		
		//茶饮处理开始
		$.ajax({
			url:"data/cha_yin.json",
			dataType:'json',
			data:{
			},
			success:function(data){
				$.each(data,function(index,ele){
					$(".cha_yin .main_class_bottom_middle ul").append('<li><div class="main_class_bottom_middle_goodspic"><a href="#"><img class="lazy" pid="'+ele.product_id+'" data-original="'+ele.img+'"/></a><div class="main_class_bottom_middle_goodspic_btn"><b></b><span>加入购物车</span></div></div><p>'+ele.name+'</p><span><b>￥</b>'+ele.price+'</span></li>')
				});
				$(".lazy").lazyload();//图片懒加载
				$(".main_class_bottom_middle ul li").hover(function(){
					$(this).children(".main_class_bottom_middle_goodspic").children(".main_class_bottom_middle_goodspic_btn").animate({
						top:136
					},{
						queue:false//是否进行排队
					});
				},function(){
					$(this).children(".main_class_bottom_middle_goodspic").children(".main_class_bottom_middle_goodspic_btn").animate({
						top:160
					},{
						queue:false//是否进行排队
					});
				})
			}
		});
		//茶饮处理结束
		
		//酒水处理开始
		$.ajax({
			url:"data/jiu_shui.json",
			dataType:'json',
			data:{
			},
			success:function(data){
				$.each(data,function(index,ele){
					$(".jiu_shui .main_class_bottom_middle ul").append('<li><div class="main_class_bottom_middle_goodspic"><a href="#"><img class="lazy" pid="'+ele.product_id+'" data-original="'+ele.img+'"/></a><div class="main_class_bottom_middle_goodspic_btn"><b></b><span>加入购物车</span></div></div><p>'+ele.name+'</p><span><b>￥</b>'+ele.price+'</span></li>')
				});
				$(".lazy").lazyload();//图片懒加载
				$(".main_class_bottom_middle ul li").hover(function(){
					$(this).children(".main_class_bottom_middle_goodspic").children(".main_class_bottom_middle_goodspic_btn").animate({
						top:136
					},{
						queue:false//是否进行排队
					});
				},function(){
					$(this).children(".main_class_bottom_middle_goodspic").children(".main_class_bottom_middle_goodspic_btn").animate({
						top:160
					},{
						queue:false//是否进行排队
					});
				})
			}
		});
		//酒水处理结束
		
		//为你推荐开始
		$.ajax({
			type:"get",
			url:"data/tui_jian1.json",
			dataType:'json',
			data:{
				page:1
			},
			
			success:function(data){
				$.each(data.data,function(index,ele){
					$(".tui_jian_goods").append('<li><div class="tui_jian_goods_pic"><img class="lazy" pid="'+ele.proudct_id+'" data-original= "'+ele.img+'"/><div class="tui_jian_goods_pic_btn"><b></b>加入购物车</div></div><div class="tui_jian_goods_title">'+ele.name+'</div><div class="tui_jian_goods_price">￥<span>'+ele.sfbestPrice+'</span></div></li>');
				});
				$(".lazy").lazyload();//图片懒加载
				$(".tui_jian_goods li").hover(function(){
					$(this).children(".tui_jian_goods_pic").children(".tui_jian_goods_pic_btn").animate({
						top:186
					},{
						queue:false//是否进行排队
					});
				},function(){
					$(this).children(".tui_jian_goods_pic").children(".tui_jian_goods_pic_btn").animate({
						top:210
					},{
						queue:false//是否进行排队
					});
				})
			}
		});
		$.ajax({
			type:"get",
			url:"data/tui_jian2.json",
			dataType:'json',
			data:{
				page:1
			},
			
			success:function(data){
				$.each(data.data,function(index,ele){
					$(".tui_jian_goods").append('<li><div class="tui_jian_goods_pic"><img class="lazy" pid="'+ele.proudct_id+'" data-original= "'+ele.img+'"/><div class="tui_jian_goods_pic_btn"><b></b>加入购物车</div></div><div class="tui_jian_goods_title">'+ele.name+'</div><div class="tui_jian_goods_price">￥<span>'+ele.sfbestPrice+'</span></div></li>');
				});
				$(".lazy").lazyload();//图片懒加载
				$(".tui_jian_goods li").hover(function(){
					$(this).children(".tui_jian_goods_pic").children(".tui_jian_goods_pic_btn").animate({
						top:186
					},{
						queue:false//是否进行排队
					});
				},function(){
					$(this).children(".tui_jian_goods_pic").children(".tui_jian_goods_pic_btn").animate({
						top:210
					},{
						queue:false//是否进行排队
					});
				})
			}
		});
		$.ajax({
			type:"get",
			url:"data/tui_jian3.json",
			dataType:'json',
			data:{
				page:1
			},
			
			success:function(data){
				$.each(data.data,function(index,ele){
					$(".tui_jian_goods").append('<li><div class="tui_jian_goods_pic"><img class="lazy" pid="'+ele.proudct_id+'" data-original= "'+ele.img+'"/><div class="tui_jian_goods_pic_btn"><b></b>加入购物车</div></div><div class="tui_jian_goods_title">'+ele.name+'</div><div class="tui_jian_goods_price">￥<span>'+ele.sfbestPrice+'</span></div></li>');
				});
				$(".lazy").lazyload();//图片懒加载
				$(".tui_jian_goods li").hover(function(){
					$(this).children(".tui_jian_goods_pic").children(".tui_jian_goods_pic_btn").animate({
						top:186
					},{
						queue:false//是否进行排队
					});
				},function(){
					$(this).children(".tui_jian_goods_pic").children(".tui_jian_goods_pic_btn").animate({
						top:210
					},{
						queue:false//是否进行排队
					});
				})
			}
		});
		
		//为你推荐结束
		
		$.ajax({
			type:"get",
			url:"data/all_goods.json",
			dataType:'json',
			data:{
			},
			
			success:function(data){
				console.log(data)
			}
		});
		
		
		$(".foot").load('html/foot.html');
});
