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

	
$(place+" .goods_s").html("");
//将商品信息渲染到首页购物车
	var cookiess = getCookie("cart")//把每条cookie拆分
	if(!cookiess){
		return;
	}
	var cookies = cookiess.split("&");
	$(".head_cart_r span").html(cookies.length);//改变购物车总个数显示
	$(".xfbtn2 span").html(cookies.length);
	$(".head_cart_num span").html(cookies.length);
	$(".head_cart_weight span").html(6*cookies.length);//改变总重显示
	
	$.ajax({
		type:"get",
		url:"data/all_goods.json",
		async:true,
		success:function(data){
			var now_data = data.data;
			var all_money = 0;//总价钱
			for(var i = 0; i<cookies.length; i++){
				var infos = cookies[i].split("|");
				var now_id = infos[0];
				var now_amount = infos[1];
				$(now_data).each(function(index,ele){
					if(ele.product_id == now_id){
						all_money = parseFloat(all_money) + (ele.sfbestPrice||ele.price)*now_amount;//计算总价钱
						$(place+" .goods_s").append(' <div class="goods"><div class="goods_pic"><img width="40" height="40" src="'+ele.img+'"/></div><div class="goods_msg"><p class="goods_title">'+ele.name+'</p><span>6kg</span></div><div class="good_price"><p><i>￥</i><span>'+(ele.sfbestPrice||ele.price)+'</span>×<b>'+now_amount+'</b></p><div>删除</div></div></div> ');
					}
				})
			}
			$(".head_cart_money b").html(all_money);
		}
	})
}
