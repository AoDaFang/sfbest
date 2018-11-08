requirejs.config({
	baseUrl:"js",
	paths:{
		baiduT:"plugins/baiduTemplate",
		page:"plugins/jPages",
		jquery:"plugins/jquery.min",
		lazy:"plugins/jquery.lazyload",
		swiper:"plugins/swiper",
		cookie:"plugins/cookie",
		top:"modules/top",
		delete_cookie:"plugins/delete_cookie",
		cart_inner:"modules/cart_inner",
		do_cookie:"plugins/do_cookie",
		step_delete_cookie:"plugins/step_delete_cookie",
		set_cookie_amount:"plugins/set_cookie_amount",
		tab:"plugins/Tab"
	},
	shim:{
		baiduT:{
			exports:"baidu"
		},
		page:{
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
		delete_cookie:{
			deps:["cookie","jquery"]
		},
		cart_inner:{
			deps:["cookie","jquery","swiper","delete_cookie","do_cookie"]
		},
		do_cookie:{
			exports:"dc",
			deps:["cookie","jquery"]
		},
		step_delete_cookie:{
			deps:["cookie","jquery"]
		},
		set_cookie_amount:{
			deps:["cookie","jquery"]
		}
	}
});


requirejs(["jquery","swiper","baiduT","do_cookie","lazy","cookie","top","delete_cookie","cart_inner","step_delete_cookie","set_cookie_amount","tab"],function($,Swiper,baidu,dc){
	reloadCartInner();//初始化购物车
	
	//清空购物车按钮
	$(".cart_caozuo_qingkong").click(function(){
		setCookie("cart","");//清空cookie
		reloadCartInner();//模块化刷新购物车
	});
	
	//选项卡
	var oTab = document.querySelector(".tab");
	var tab1 = new Tab(oTab);
	tab1.init();
	$(".foot").load('html/foot.html');
	
	//轮播图开始
		var mySwiper = new Swiper ('.swiper-container', {
	  	initialSlide:0,//开始是第几张
	    direction: 'horizontal', // 垂直切换选项
	    loop: true, // 循环模式选项
//	    parallax:true,
//	    setWrapperSize:true,//增加对不支持弹性盒子浏览器的兼容性
	    // 如果需要分页器
		pagination: {
       		el: '.swiper-pagination',
       		clickable:true,
     	 },
     	 				
			slidesPerView:5,//可以同时显示的slider数
			centeredSlides : true,
	    // 如果需要前进后退按钮
	    navigation: {
	      nextEl: '.swiper-button-next',
	      prevEl: '.swiper-button-prev',
	    },
	  })        
	//轮播图结束
	
	
	
	
	$.ajax({
		url:"data/cart_data.json",
		success:function(data){
			console.log(data)
			$(data.data).each(function(index,ele){$(".swiper-wrapper").append('<div class="swiper-slide"><div class="cart_slider_goods"><div class="cart_slider_goods_pic"><img src="'+ele.img+'" pid="'+ele.proudct_id+'"/><div class="cart_slider_goods_pic_btn"><a href="javascript:;">加入购物车</a></div></div><div class="cart_slider_goods_title">'+ele.name+'</div><div class="cart_slider_goods_price">￥<span>'+(ele.sfbestPrice||ele.price)+'</span></div></div></div>');
			
			$(".cart_slider_goods").hover(function(){
				$(this).children(".cart_slider_goods_pic").children(".cart_slider_goods_pic_btn").animate({
					top:155	
				},{
					queue:false,
				})
			},function(){
				$(this).children(".cart_slider_goods_pic").children(".cart_slider_goods_pic_btn").animate({
					top:180
				},{
					queue:false,
				})
			});
			
			})
		}
	})
});
		
	
