function do_index_cart(place){
	$(place+" .goods_s").html("");
	
//将商品信息渲染到首页购物车
	var cookiess = getCookie("cart")//把每条cookie拆分
	if(!cookiess){
		return;
	}
	var cookies = cookiess.split("&");
	$.ajax({
		type:"get",
		url:"data/all_goods.json",
		async:true,
		success:function(data){
			var now_data = data.data;
			for(var i = 0; i<cookies.length; i++){
				var infos = cookies[i].split("|");
				var now_id = infos[0];
				var now_amount = infos[1];
				$(now_data).each(function(index,ele){
					if(ele.product_id == now_id){
						$(place+" .goods_s").append(' <div class="goods"><div class="goods_pic"><img width="40" height="40" src="'+ele.img+'"/></div><div class="goods_msg"><p class="goods_title">'+ele.name+'</p><span>6kg</span></div><div class="good_price"><p><i>￥</i><span>'+(ele.sfbestPrice||ele.price)+'</span>×<b>'+now_amount+'</b></p><div>删除</div></div></div> ');
					}
				})
			}
		}
	})
}
