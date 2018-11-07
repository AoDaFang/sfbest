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
		}
	}
});


requirejs(["jquery","swiper","baiduT","lazy","cookie","top"],function($,Swiper,baidu){
	
	
	
	$(".foot").load('html/foot.html');
	
});
