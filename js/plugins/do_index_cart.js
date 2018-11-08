//用于点击后进行主页两个购物车的渲染工作


function do_index_cart(place){
if(place == ".xuan_fu_cart_show"){//当要渲染悬浮的购物车时，购物车弹出一下
	$(".xuan_fu_cart_show_over").css("display","block");
	$(".xuan_fu_cart_show").animate({
		right : "0"
	},{//第二个参数
		queue:false,//是否进行排队
	});
	
	setTimeout(function(){
		$(".xuan_fu_cart_show").animate({
			right : "-364"
		},{//第二个参数
			queue:false,//是否进行排队
			complete:function(){
//						$(".xuan_fu_cart_show_over").css("display","none");
			}
		})
	},1000)
}

	
$(place+" .goods_s").html("");//清空购物车中能够的内容，以供重新渲染
//将商品信息渲染到首页购物车
	var cookiess = getCookie("cart")//把每条cookie拆分
	if(!cookiess){
		return;
	}
	var cookies = cookiess.split("&");
	$(".head_cart_r span").html(cookies.length);//改变购物车总个数显示
	$(".xfbtn2 span").html(cookies.length);
	$(".head_cart_num span").html(cookies.length);
	
	
	$.ajax({
		type:"get",
		url:"data/all_goods.json",
		async:true,
		success:function(data){
			var now_data = data.data;
			var all_money = 0;//总价钱
			var all_weight = 0;
			for(var i = 0; i<cookies.length; i++){
				var infos = cookies[i].split("|");
				var now_id = infos[0];
				var now_amount = infos[1];
				all_weight += 6*now_amount;
				$(now_data).each(function(index,ele){
					if(ele.product_id == now_id){
						all_money = Number(all_money) + (ele.sfbestPrice||ele.price)*now_amount;//计算总价钱
						$(place+" .goods_s").append(' <div class="goods"><input type="hidden" class="pid" pid="'+now_id+'"/><div class="goods_pic"><img width="40" height="40" src="'+ele.img+'"/></div><div class="goods_msg"><p class="goods_title">'+ele.name+'</p><span>6kg</span></div><div class="good_price"><p><i>￥</i><span>'+(ele.sfbestPrice||ele.price)+'</span>×<b>'+now_amount+'</b></p><div>删除</div></div></div> ');
					}
				})
			}
			$(".head_cart_weight span").html(all_weight);//改变总重显示
			$(".head_cart_money b").html(all_money);
			
			//给删除按钮添加事件,给定一个pid删除cookie的方法
			$(place+" .good_price div").click(function(){
				var pid = $(this).parent().siblings("input").attr("pid");
				delete_cookie(pid);
				$(this).parent().parent().remove();
				do_index_cart("#head");//渲染head中，购物车部分
				do_index_cart(".xuan_fu_cart_show");//渲染悬浮按钮中的，购物车部分
						
				setTimeout(function(){
					if(!getCookie("cart")){//判断cookie
						$(".xuan_fu_cart_noneshow_over").css("display","block");
						$(".xuan_fu_cart_noneshow").animate({
							right : "0"
						},{//第二个参数
							queue:false,//是否进行排队
						})
					}else{
						
						
						$(".xuan_fu_cart_show_over").css("display","block");
						$(".xuan_fu_cart_show").animate({
							right : "0"
						},{//第二个参数
							queue:false,//是否进行排队
							complete:function(){
								do_index_cart("#head");//渲染head中，购物车部分
							}
						})
					}
				},2000)
			});
		}
	})
}
