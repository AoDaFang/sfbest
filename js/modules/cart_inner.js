//这是模块化刷新购物车的核心

function reloadCartInner() {
	$(".cart_goods_main_in").load('html/cart_inner.html', function() {
		var cookiess = getCookie("cart")
		var cookies = cookiess.split("&");
		$.ajax({
			type: "get",
			url: "data/all_goods.json",
			async: true,
			success: function(data) {
				$(".cart_goods_main_in ul").html(""); //清空原有购物车内容

				var now_data = data.data;
				var all_money = 0; //总价钱
				var all_weight = 0;
				for(var i = 0; i < cookies.length; i++) {
					var infos = cookies[i].split("|");
					var now_id = infos[0];
					var now_amount = infos[1];
					all_weight += infos[1] * 6;
					$(now_data).each(function(index, ele) {
						if(ele.product_id == now_id) {
							all_money = addNum(Number(all_money), (ele.sfbestPrice || ele.price) * now_amount); //计算总价钱
							$(".cart_goods_main_in ul").append('<li class="main_goods"><div class="main_goods_checkbox"><input class="one_check" type="checkbox" pid="' + ele.product_id + '"/></div><div class="main_goods_pic"><img src="' + ele.img + '"/></div><div class="main_goods_title"><span>' + ele.name + '</span></div><div class="main_goods_price"><p>￥<span>' + (ele.sfbestPrice || ele.price) + '</span></p></div><div class="main_goods_amount"><div class="main_goods_amount_in"><button class="main_goods_amount_jia">-</button><input class="main_goods_text" type="text" value="' + now_amount + '" /><button class="main_goods_amount_jian">+</button></div></div><div class="main_goods_weight"><span>6kg</span></div><div class="main_goods_xiaoji"><p>￥<span>' + (now_amount * (ele.sfbestPrice || ele.price)) + '</span></p></div><div class="main_goods_xianhuo"><span>现货</span></div><div class="main_goods_caozuo"><span class="main_goods_shoucang">收藏</span><span class="main_goods_shanchu">删除</span></div></li>');
						}
					})
				}

				//自定义加法运算
				function addNum(num1, num2) {
					var sq1, sq2, m;
					try {
						sq1 = num1.toString().split(".")[1].length;
					} catch(e) {
						sq1 = 0;
					}
					try {
						sq2 = num2.toString().split(".")[1].length;
					} catch(e) {
						sq2 = 0;
					}
					m = Math.pow(10, Math.max(sq1, sq2));
					return(num1 * m + num2 * m) / m;
				}

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