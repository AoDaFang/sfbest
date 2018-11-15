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
		set_cookie_amount : "plugins/set_cookie_amount",
//		location_tree:"modules/location_tree",
//		location_tree_jq:"lib/location_tree_jq"
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
		},
//		location_tree:{
//			deps: ["location_tree_jq"]
//		}
	}
});

requirejs(["jquery", "swiper", "baiduT", "do_cookie", "extend", "lazy", "page", "cookie", "top", "head", "nav_s", "er_ji", "xuan_fu", "do_index_cart", "delete_cookie", "fang_da_jing","tab","set_cookie_amount"], function($, Swiper, baidu, do_cookie) {
	$(".foot").load('html/foot.html');//加载脚部
	/*$(".main_right_middle_box2_local").load("html/location_tree.html",function(){
		doLocationTree();
	});*/
//	console.log($(".main_right_middle").offset().top);
	window.onscroll = function(){//吸顶
		if($(document).scrollTop() > 261){
			$(".main_right_middle").css("position","fixed").css("top","-9px").css("z-index","9999");
		}else{
			$(".main_right_middle").css("position","")
		}
	}
	
	$(".main_left dl dt i").click(function(){
		$(this).parent().next().toggle("active");
	})
	
	
	$.ajax({
		type:"get",
		url:"data/list_data.json",
		async:true,
		dataType:"json",
		success:function(data){
			console.log(data)
			$(".main_right_goods ul").html("");//清空里面的内容
			var up_new_data = downSort(data.data,"XiaoLiang");
			$(".main_right_goods ul").html(baidu.template("temp",up_new_data));//按照销量排序
			
			
			//方家铺子筛选
			$(".pp_fang_jia").click(function(){
				$(".main_right_goods ul").html("");//清空里面的内容
				var up_new_data = isTrue(data.data,"PinPai","方家铺子");
				$(".main_right_goods ul").html(baidu.template("temp",up_new_data));
				$(".main_right_top").css("display","none");
				$(".main_right_top_active").css("display","block");
				$(".main_right_top_active>div>span").html("方家铺子");
			});
			
			//u选筛选
			$(".pp_uxuan").click(function(){
				$(".main_right_goods ul").html("");//清空里面的内容
				var up_new_data = isTrue(data.data,"PinPai","U选一品");
				$(".main_right_goods ul").html(baidu.template("temp",up_new_data));
				
				$(".main_right_top").css("display","none");
				$(".main_right_top_active").css("display","block");
				$(".main_right_top_active>div>span").html("U选一品");
			});
			
			//什漠果筛选
			$(".pp_shimo").click(function(){
				$(".main_right_goods ul").html("");//清空里面的内容
				var up_new_data = isTrue(data.data,"PinPai","什漠果");
				$(".main_right_goods ul").html(baidu.template("temp",up_new_data));
				
				$(".main_right_top").css("display","none");
				$(".main_right_top_active").css("display","block");
				$(".main_right_top_active>div>span").html("什漠果");
			});
			//品牌筛选的叉号
			$(".main_right_top_active>div>i").click(function(){
				$(".main_right_top").css("display","block");
				$(".main_right_top_active").css("display","none");
				$(".main_right_goods ul").html("");//清空里面的内容
				var up_new_data = downSort(data.data,"XiaoLiang");
				$(".main_right_goods ul").html(baidu.template("temp",up_new_data));//按照销量排序
			})
			
			
			var bool_up_price = false;//价格按钮是否被激活
			var jia_ge_isActive = false;//价格按钮是否是升序状态
			
			//销量
			$(".xiao_liang").click(function(){
				$(".xiao_liang").addClass("active").siblings().removeClass("active");
				$(".main_right_goods ul").html("");//清空里面的内容
				var up_new_data = downSort(data.data,"XiaoLiang");
				$(".main_right_goods ul").html(baidu.template("temp",up_new_data));
				
				
				bool_up_price = false;//将价格按钮激活状态去除
				$(".jia_ge b").removeClass();
			});
			
			
			//价格
			$(".jia_ge").click(function(){
				if(jia_ge_isActive == false){//如果这个按钮还没有被激活，执行升序排序
					var new_data = upSort(data.data,"sfbestPrice");
					$(".main_right_goods ul").html(baidu.template("temp",up_new_data));
					$(".jia_ge").addClass("active").siblings().removeClass("active");
					$(".jia_ge b").removeClass("down").addClass("up");
					jia_ge_isActive = true;
					bool_up_price = true;
				}else{
					if(bool_up_price == true){//如果按钮被激活，而且正处于升序状态，把它变为降序状态
						var new_data = downSort(data.data,"sfbestPrice");
						$(".main_right_goods ul").html(baidu.template("temp",up_new_data));
						$(".jia_ge b").removeClass("up").addClass("down");
						bool_up_price = false;
						jia_ge_isActive = true;
					}else{//如果按钮被激活，而且正处于降序状态，把它变为升序
						var new_data = upSort(data.data,"sfbestPrice");
						$(".main_right_goods ul").html(baidu.template("temp",up_new_data));
						$(".jia_ge").addClass("active").siblings().removeClass("active");
						$(".jia_ge b").removeClass("down").addClass("up");
						jia_ge_isActive = true;
						bool_up_price = true;
					}
				}
			});
			
			//评论
			$(".ping_lun").click(function(){
				$(".ping_lun").addClass("active").siblings().removeClass("active");
				$(".main_right_goods ul").html("");//清空里面的内容
				var up_new_data = downSort(data.data,"PingLunShu");
				$(".main_right_goods ul").html(baidu.template("temp",up_new_data));
				
				
				bool_up_price = false;//将价格按钮激活状态去除
				$(".jia_ge b").removeClass();
			});
			
			//新品
			$(".xin_pin").click(function(){
				$(".xin_pin").addClass("active").siblings().removeClass("active");
				$(".main_right_goods ul").html("");//清空里面的内容
				var up_new_data = isTrue(data.data,"isNew","1");
				$(".main_right_goods ul").html(baidu.template("temp",up_new_data));
				
				
				bool_up_price = false;//将价格按钮激活状态去除
				$(".jia_ge b").removeClass();
			});
		},
		error:function(){
			console.log(123)
		}
	});
	
	//判断某个属性是否为真
	function isTrue(data,prop,value){
		var new_data = [];
		$(data).each(function(index,ele){
			if(ele[prop] == value){
				new_data.push(ele);
				
			}
		})
		var goods_amount = new_data.length;
		$(".main_right_middle_box1_right p>span").html(goods_amount);
		var up_new_data = {
			"data":new_data
		}
		
		return up_new_data;
	}
	
	//按照某个属性升序排序
	function upSort(data,prop){
		
		data.sort(function(a,b){
			if(parseInt(parseInt(a[prop])) > parseInt(b[prop])){
				return 1;
			}else if(parseInt(a[prop]) < parseInt(b[prop])){
				return -1;
			}else{
				return 0;
			}
		});
		var goods_amount = data.length;
		$(".main_right_middle_box1_right p>span").html(goods_amount);
		
		var up_new_data = {
			"data":data
		}
		console.log(data)
		return up_new_data;
	}
	
	//按照某个属性降序排序
	function downSort(data,prop){
		
		data.sort(function(a,b){
			if(parseInt(parseInt(a[prop])) > parseInt(b[prop])){
				return -1;
			}else if(parseInt(a[prop]) < parseInt(b[prop])){
				return 1;
			}else{
				return 0;
			}
		});
		
		var goods_amount = data.length;
		$(".main_right_middle_box1_right p>span").html(goods_amount);
		
		var up_new_data = {
			"data":data
		}
		console.log(data)
		return up_new_data;
	}
		
});