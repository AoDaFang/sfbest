//局部刷新购物车方法
function reloadCartInner() {
	$(".cart_goods_main_in").load('html/cart_inner.html', function() {
		var cookiess = getCookie("cart")
		var cookies = cookiess.split("&");
		$.ajax({
			type: "get",
			url: "data/all_goods.json",
			async: true,
			success: function(data) {
				
				/*****************************************/
				$(".cart_goods_main_in ul").html("");
				/*****************************************/
				
				var now_data = data.data;
				var all_money = 0; 
				var all_weight = 0;
				var now_li_num = 0; // 记录li的数目
				
				//cookie示例： 101|5  &  102|3        释义：id为101的商品个数为5，id为102的商品个数为3
				//遍历cookie ->  获取cookie中的商品id ->  对比json数据获取商品信息 -> 
				for(var i = 0; i < cookies.length; i++) {
					var infos = cookies[i].split("|");
					
					/*****************************************/
					var now_id = infos[0];//遍历出来的当前cookie的id
					/*****************************************/
					
					var now_amount = infos[1];
					all_weight += infos[1] * 6;
					
					//遍历总数据，对比当前id，以获取当前商品的信息。
					$(now_data).each(function(index, ele) {
						if(ele.product_id == now_id) {  //若当前cookie中的id和json中的某条数据
							now_li_num++;
							all_money = (Number(all_money) + Number((ele.sfbestPrice || ele.price) * now_amount)).toFixed(1);
							
							//把本商品 连同信息 渲染到购物车中
							$(".cart_goods_main_in ul").append('<li class="main_goods">'
																	+'<div class="main_goods_checkbox">'
																		+'<input class="one_check" type="checkbox" pid="' + ele.product_id + '"/>'
																	+'</div>'
																	
																	+'<div class="main_goods_pic">'
																		+'<img src="' + ele.img + '"/>'
																	+'</div>'
																	
																	+'<div class="main_goods_title">'
																		+'<span>' + ele.name + '</span>'
																	+'</div>'
																	
																	+'<div class="main_goods_price">'
																		+'<p>￥<span>' + (ele.sfbestPrice || ele.price) + '</span></p>'
																	+'</div>'
																	
																	+'<div class="main_goods_amount">'
																		+'<div class="main_goods_amount_in">'
																			+'<button class="main_goods_amount_jia">-</button>'
																			+'<input class="main_goods_text" type="text" value="' + now_amount + '" />'
																			+'<button class="main_goods_amount_jian">+</button>'
																		+'</div>'
																	+'</div>'
																	
																	+'<div class="main_goods_weight">'
																		+'<span>6kg</span>'
																	+'</div>'
																	
																	+'<div class="main_goods_xiaoji">'
																		+'<p>￥<span>' + (now_amount * (ele.sfbestPrice || ele.price)).toFixed(1) + '</span></p>'
																	+'</div>'
																	
																	+'<div class="main_goods_xianhuo">'
																		+'<span>现货</span>'
																	+'</div>'
																	
																	+'<div class="main_goods_caozuo">'
																		+'<span class="main_goods_shoucang">收藏</span>'
																		+'<span class="main_goods_shanchu">删除</span>'
																	+'</div>'
																+'</li>');
						}
					})
					
				}
				$(".cart_goods_main_in").css("height",now_li_num*103);//每次重载设置容器的高度，以防重载时的高度塌陷
				$(".cart_caozuo_info_weight span").html(all_weight); //设置总重量
				$(".cart_caozuo_info_allmoney p span").html(all_money);

				//监听全选按钮变化
				$("#all_check").change(function() {
					if($("#all_check").prop("checked")) {
						$(".one_check").prop("checked", true)
					} else {
						$(".one_check").prop("checked", false)
					}
				});

				//监听所有单个商品按钮变化
				$(".one_check").change(function() {
					if(!($(this).prop("checked"))) {
						$("#all_check").prop("checked", false);
					}
					var flag = true;
					$(".one_check").each(function(index, ele) {
						if(!$(ele).prop("checked")) {
							flag = false;
						}
					});
					$("#all_check").prop("checked", flag);
				});

				//给删除按钮加事件监听
				$(".main_goods_shanchu").click(function() {
					var now_id = $(this).parent().siblings(".main_goods_checkbox").children("input").attr("pid");
					delete_cookie(now_id); //删除相应的cookie
					reloadCartInner(); //重新加载cart的中心部分
				})

				//加按钮添加事件,注意类名写错
				$(".main_goods_amount_jian").click(function() {
					dc.do_cookie("null", $(this).parent().parent().siblings(".main_goods_checkbox").children("input").attr("pid"));
					reloadCartInner();
				});

				//减按钮添加事件,注意类名写错
				$(".main_goods_amount_jia").click(function() {
					stepDeleteCookie($(this).parent().parent().siblings(".main_goods_checkbox").children("input").attr("pid"));
					reloadCartInner();
				});

				//添加input文本框的事件
				$(".main_goods_text").keyup(function() {
					var now_id = $(this).parent().parent().siblings(".main_goods_checkbox").children("input").attr("pid");
					var now_amount = $(this).val(); //此处必须用val不然无法获取新的值
					setCookieAmount(now_id, now_amount);
					reloadCartInner();
				});

				//给"删除选中商品"添加事件
				$(".cart_caozuo_shanxuan").click(function() {
					$(".one_check").each(function(index, ele) {
						if($(ele).prop("checked")) {
							delete_cookie($(ele).attr("pid"));
						}
					});
					reloadCartInner(); //模块化刷新购物车
				});

			}
		})
	});
}