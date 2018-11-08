(function() {
	$("#head").load('html/head.html', function() {
		$(".search_text").keyup(function() {
			if(!$(".search_text").val()){ //若文本框没有信息
				$(".search_result").css("display","none");
				return;
			}
			$.ajax({
				url:"http://www.sfbest.com/productlist/keysearch",
				dataType:'jsonp',
//				jsonpCallback:"fn",
				data:{
					
					q:$(".search_text").val(),
//					callback:jsonp1541236273052,
					timestamp:1541236306505,
					limit:100,
				},
				success:function(data){
					var arr = data.split(/\n+/);
					 
					var arr_goods = [];
					var article_arr = [];
					var article = arr.pop();	//单独提取
					var article_arr = article.split("|");
					var aticle_count = article_arr[2];
					
					if(aticle_count == 0){//如果文章数为0，返回
						$(".search_result").css("display","none");
						return;
					}
					
					arr.forEach(function (item, index, arr) {//循环出所有商品的数据，并且存到object中
						var tmp = item.split("|");
						 
						arr_goods.push({
							gname : tmp[1],
							amount : tmp[2]
						});
					});
					$(".search_result").empty();//清除原来的内容
					
					$(arr_goods).each(function(index,ele){//将所有商品的信息渲染
						$(".search_result").append("<p><span>"+ele.gname+"</span>     <b>约<i>"+ele.amount+"</i>件</b></p>")
					})
					$(".search_result").css("display","block");//将下方div显示
					$(".search_result p").hover(function(){//悬浮在某行时
						$(this).addClass("active");
					},function(){
						$(this).removeClass("active");
					});
					$(".search_result p").click(function(){//点击某行时
						$(".search_text").val($(this).children().eq(0).html());
						$(".search_result").css("display","none");
					});
					
					$(".search_result").append('<div class="search_wz"><p>搜<i>'+$(".search_text").val()+'</i>相关文章约<i>'+aticle_count+'</i>篇</p></div>')
				}
			});
		});
		
		$(".head_cart").hover(function(){//悬浮到head的购物车上
			if(!getCookie("cart")){
				$(".head_cart_noneshow").css("display","block");
			}else{
				$(".head_cart_show").css("display","block");
			}
		},function(){
			$(".head_cart_noneshow").css("display","none");
			$(".head_cart_show").css("display","none");
		})
		
		do_index_cart("#head");
		
	});
})()