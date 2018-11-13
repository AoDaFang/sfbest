requirejs.config({
	baseUrl: "js",
	paths: {
		baiduT: "plugins/baiduTemplate",
		page: "plugins/jPages",
		extend: "plugins/jquery.extend",
		jquery: "plugins/jquery.min",
		lazy: "plugins/jquery.lazyload",
		swiper: "plugins/swiper",
		cookie: "plugins/cookie",
		top: "modules/top",
		head: "modules/head",
		nav_s: "modules/nav_s",
		er_ji: "modules/er_ji",
		xuan_fu: "modules/xuan_fu",
		do_cookie: "plugins/do_cookie",
		do_index_cart: "plugins/do_index_cart",
		delete_cookie: "plugins/delete_cookie",
		fang_da_jing: "modules/fang_da_jing",
		tab:"plugins/Tab",
		set_cookie_amount : "plugins/set_cookie_amount"
	},
	shim: {
		baiduT: {
			exports: "baidu"
		},
		page: {
			deps: ["jquery"]
		},
		extend: {
			deps: ["jquery"]
		},
		jquery: {
			exports: "jQuery"
		},
		lazy: {
			deps: ["jquery"]
		},
		swiper: {
			exports: "Swiper",
			deps: ["jquery"]
		},
		top: {
			deps: ["cookie", "jquery"]
		},
		head: {
			deps: ["cookie", "jquery", "do_index_cart"]
		},
		nav_s: {
			deps: ["cookie", "jquery"]
		},
		er_ji: {
			deps: ["cookie", "jquery", "nav_s"]
		},
		xuan_fu: {
			deps: ["cookie", "jquery", "do_index_cart"]
		},
		do_cookie: {
			exports: "dc",
			deps: ["cookie", "jquery"]
		},
		do_index_cart: {
			deps: ["cookie", "jquery", "delete_cookie"]
		},
		delete_cookie: {
			deps: ["cookie", "jquery"]
		},
		fang_da_jing: {
			deps: ["jquery"]
		},
		set_cookie_amount:{
			deps: ["cookie"]
		}
	}
});

requirejs(["jquery", "swiper", "baiduT", "do_cookie", "extend", "lazy", "page", "cookie", "top", "head", "nav_s", "er_ji", "xuan_fu", "do_index_cart", "delete_cookie", "fang_da_jing","tab","set_cookie_amount"], function($, Swiper, baidu, do_cookie) {
	$(".foot").load('html/foot.html');
	
	$.ajax({
		type:"get",
		url:"data/list_data.json",
		async:true,
		dataType:"json",
		success:function(data){
			console.log(data)
			$(".main_right_goods ul").html(baidu.template("temp",data));
		},
		error:function(){
			console.log(123)
		}
	});
	
	
	
	
});