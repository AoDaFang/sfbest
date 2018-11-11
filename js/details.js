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
		tab:"plugins/Tab"
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
		}
	}
});

requirejs(["jquery", "swiper", "baiduT", "do_cookie", "extend", "lazy", "page", "cookie", "top", "head", "nav_s", "er_ji", "xuan_fu", "do_index_cart", "delete_cookie", "fang_da_jing","tab"], function($, Swiper, baidu, do_cookie) {
	$(".details_main_fang_da").load('html/fang_da_jing.html', function() {
		doFangda();
	});
	$(".details_goodspj").load('html/details_goodspj.html',function(){
		var oTab1 = document.querySelector("#details_pinglun_tab .tab_inner");
		var tab2 = new Tab(oTab1);
		tab2.init();
	});
	
	//分享弹出处理开始
	 function moveDirection(tag,e){
            var w = $(tag).width();
            var h = $(tag).height();
            var x = (e.pageX - tag.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
            var y = (e.pageY - tag.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);
            var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4; 
            return direction;
        }
        //使用方法
        $(".baidu_share_more").on("mouseenter mouseleave", function (e) {
            var eType = e.type;
            var direction = moveDirection(this,e);
            var dirName = new Array("上","右","下","左");
            if(eType == "mouseenter"){
                if(dirName[direction] == "上"){ //鼠标从上方进入
		    		$(".ge_zhong_share").css("display","block").css("top","25px");
		    	}else if(dirName[direction] == "下"){//鼠标从下方进入
		    		if(getClientTop(".baidu_share_more")<320){//若上方高度不够
		    			$(".ge_zhong_share").css("display","block").css("top","25px");
		    		}else{//若上方高度足够
		    			$(".ge_zhong_share").css("display","block").css("top","-316px");
		    		}
		    		
		    	}
            }else if(eType == "mouseleave"){
               $(".ge_zhong_share").css("display","none")
            }
        });
        
        $(".ge_zhong_share").hover(function(){
        	$(".ge_zhong_share").css("display","block")
        },function(){
        	$(".ge_zhong_share").css("display","none")
        })
		
		
		function getClientTop(sle){//获取元素到工作区的高度
			mTop = $(sle).offset().top;
			sTop = $(window).scrollTop();
			result = mTop - sTop;
			return result;
		}
		
		//分享弹出处理结束
		
		
		//选项卡
		var oTab = document.querySelector(".tab");
		var tab1 = new Tab(oTab);
		tab1.init();
		
//		var oTab1 = document.querySelector(".tab_inner");
//		var tab2 = new Tab(oTab1);
//		tab2.init();
		//移除加入购物车按钮原来的事件
		$('.details_cart_btn').unbind("click"); //移除click
		$("details_cart_btn a").unbind("click");
		
		$(".lazy").lazyload();//图片懒加载
		
		

});