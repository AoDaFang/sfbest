(function(){
	$(".xuan_fu").load('html/xuan_fu.html', function() {
		do_index_cart(".xuan_fu_cart_show ");//处理悬浮按钮中的，购物车部分
		
		
		//购物车动画处理开始
		$(".xfbtn2").hover(function(){
			if(!getCookie("cart")){//判断cookie
				$(".xuan_fu_cart_noneshow_over").css("display","block");
				$(".xuan_fu_cart_noneshow").animate({//大广告页面消失
					right : "0"
				},{//第二个参数
					queue:false,//是否进行排队
				})
			}else{
				
				
				$(".xuan_fu_cart_show_over").css("display","block");
				$(".xuan_fu_cart_show").animate({//大广告页面消失
					right : "0"
				},{//第二个参数
					queue:false,//是否进行排队
					complete:function(){
						do_index_cart("#head");//渲染head中，购物车部分
					}
				})
			}
		},function(){
			if(!getCookie("cart")){//判断cookie
				$(".xuan_fu_cart_noneshow").animate({//大广告页面消失
					right : "-368"
				},{//第二个参数
					queue:false,//是否进行排队
					complete:function(){
						$(".xuan_fu_cart_noneshow_over").css("display","none");
					}
				})
				
			}else{
				$(".xuan_fu_cart_show").animate({//大广告页面消失
					right : "-364"
				},{//第二个参数
					queue:false,//是否进行排队
					complete:function(){
//						$(".xuan_fu_cart_show_over").css("display","none");
					}
				})
				
			}
		});
		
		
		$(".xuan_fu_cart_show").hover(function(){
			$(".xuan_fu_cart_show_over").css("display","block");
			$(".xuan_fu_cart_show").animate({//大广告页面消失
				right : "0"
			},{//第二个参数
				queue:false,//是否进行排队
			});
		},function(){
			$(".xuan_fu_cart_show").animate({//大广告页面消失
				right : "-364"
			},{//第二个参数
				queue:false,//是否进行排队
				complete:function(){
					console.log("这里触发")
					$(".xuan_fu_cart_show_over").css("display","none");
				}
			});
		});
		//购物车动画处理结束
		
		$(".xfbtn4").hover(function(){
			$(".xuan_fu_app_over").css("display","block");
			$(".xuan_fu_app").animate({//大广告页面消失
				right : "0"
			},{//第二个参数
				queue:false,//是否进行排队
			});
		},function(){
			$(".xuan_fu_app").animate({//大广告页面消失
				right : "-360"
			},{//第二个参数
				queue:false,//是否进行排队
				complete:function(){
					$(".xuan_fu_app_over").css("display","none");
				}
			});
		});
		
		
		$(".xuan_fu_cart_noneshow").mouseleave(function(){//购物车没有商品，鼠标离开事件
			$(".xuan_fu_cart_noneshow").animate({//大广告页面消失
				right : "-368"
			},{//第二个参数
				queue:false,//是否进行排队
				complete:function(){
					$(".xuan_fu_cart_noneshow_over").css("display","none");
				}
			})
		})
	});
})()
