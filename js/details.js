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
	$(".details_main_fang_da").load('html/fang_da_jing.html', function() {
		doFangda();
	});
	
	
	
	function GetQueryString(name)
	{
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
	     if(r!=null)return  unescape(r[2]); return null;
	}
	
	
	var page_pid =  GetQueryString("pid");
	
	(function(){//判定是否有pid
		if(!page_pid){
			return;
		}else if(page_pid == 278087){
			return;
		}else{
			$.ajax({
				type:"get",
				url:"data/all_goods.json",
				async:true,
				success:function(data){
					$(data.data).each(function(index,ele){
						var now_id = ele.product_id || ele.proudct_id;
						if(now_id == page_pid){
							console.log(ele);//当前的对象
							$(".page_pid_input").attr("pid",page_pid);
							$(".details_main_goods_title h1").html(ele.name);
							
							$(".imgdet .imglist ul li img").attr("src",ele.img);
							$(".imgdet .imgpart .pic img").attr("src",ele.img);
							$(".bigpic img").attr("src",ele.img);
							$(".details_main_goods_price_num3").html(ele.price || ele.sfbestPrice);
							$(".details_main_goods_caozuo_chose label").eq(0).html("套餐1");
							$(".details_main_goods_caozuo_chose label").eq(1).html("套餐2");
							$(".page_pid_input").attr("pid",now_id)
						}
					});
				}
				
			});
		}
	})()
	
	//商品介绍里的评价
	$(".details_goodspj").load('html/details_goodspj.html',function(){
		var oTab1 = document.querySelector("#details_pinglun_tab .tab_inner");
		var tab2 = new Tab(oTab1);
		tab2.init();
		$(".details_cart_btn").off();
		$(".details_cart_btn").unbind();
	});
	
	//整个页面的大评价
	$(".details_big_pinglun .details_goodspj_2").load('html/details_goodspj.html',function(){
		var oTab2 = document.querySelector(".details_goodspj_2 .tab_inner");
		var tab3 = new Tab(oTab2);
		tab3.init();
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
		
		
		//顺丰优势轮播
			var mySwiper = new Swiper ('.swiper-container', {
			  	initialSlide:0,//开始是第几张
			    direction: 'horizontal', // 垂直切换选项
			    loop: true, // 循环模式选项
			    grabCursor:true,//鼠标覆盖轮播图时指针会变成手掌形状，拖动时指针会变成抓手形状
			    parallax:true,
			    setWrapperSize:true,//增加对不支持弹性盒子浏览器的兼容性
			    onlyExternal:true,
			    // 如果需要分页器
				pagination: {
		       		el: '.swiper-pagination',
		       		clickable:true,
		       		onlyExternal:true,
		     	 },
		     	 				
			  })        
			$(".swiper-pagination-bullet").hover(function() {
			    $(this).click(); //鼠标划上去之后，自动触发点击事件来模仿鼠标划上去的事件
			},function() {
			    mySwiper.autoplay.start(); //鼠标移出之后，自动轮播开启
			})
			
			
			$(".foot").load('html/foot.html');
			
			
			//一些事件的处理
			$(".details_dapp").click(function(){
				$(".details_dapp_QRcode").css("display","block");
			});
			$(".details_dapp").mouseleave(function(){
				$(".details_dapp_QRcode").css("display","none");
			});
			$(".details_dapp_QRcode").hover(function(){
				$(".details_dapp_QRcode").css("display","block");
			},function(){
				$(".details_dapp_QRcode").css("display","none");
			});
			$(".details_dapp_QRcode_close").click(function(){
				$(".details_dapp_QRcode").css("display","none");
			});
			
			
			$(".details_more_pinpai").click(function(){
				if($(".details_left_box_middle").height() == 280){
					$(".details_left_box_middle").animate({
						height:105
					});
					var now_i = document.querySelector(".details_more_pinpai i");
					now_i.className = "hide";
				}else{
					$(".details_left_box_middle").animate({
						height:280
					});
					var now_i = document.querySelector(".details_more_pinpai i");
					now_i.className = "show";
				}
				
			})
			
			
			//吸顶
			window.onscroll = function(){
				if($(document).scrollTop() > 660){
					$(".details_main_box_tab .btns").css("position","fixed").css("top","0").css("z-index","9999");
				}else{
					$(".details_main_box_tab .btns").css("position","")
				}
			}
			
			
			//下面是关于商品购买的一些处理
			$(".details_amount_add").click(function(){
				$(".details_amount").val(parseInt($(".details_amount").val())+1);
			});
			
			$(".details_amount_sub").click(function(){
				if($(".details_amount").val() == 1){
					$(".details_amount").prop("disabled")
				}else{
					$(".details_amount").val(parseInt($(".details_amount").val())-1);
				}
			});
			
			$(".details_add_to_cart").click(function(){
				var now_pid = $(".page_pid_input").attr("pid")
				var now_amount = $(".details_amount").val();
				
				do_cookie.do_cookie(null,now_pid);
				setCookieAmount(now_pid,now_amount);
				
				$(".details_add_to_cart_tanchu").css("display","block");
			});
			
			$(".details_add_to_cart_tanchu_close").click(function(e){
				e.stopPropagation();
				$(".details_add_to_cart_tanchu").css("display","none");
			})
			

});