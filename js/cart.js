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
		set_cookie_amount:"plugins/set_cookie_amount"
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


requirejs(["jquery","swiper","baiduT","do_cookie","lazy","cookie","top","delete_cookie","cart_inner","step_delete_cookie","set_cookie_amount"],function($,Swiper,baidu,dc){
	reloadCartInner();//初始化购物车
	
	//清空购物车按钮
	$(".cart_caozuo_qingkong").click(function(){
		setCookie("cart","");
		reloadCartInner();//模块化刷新购物车
	});
	
	//按照id删除cookie
	$(".cart_caozuo_shanxuan").click(function(){
		$(".one_check").each(function(index, ele) {
			if($(ele).prop("checked")) {
				delete_cookie($(ele).prop("pid"));
			}
		});
		reloadCartInner();//模块化刷新购物车
	});
	
	
	
	
	$(".foot").load('html/foot.html');
	
});
