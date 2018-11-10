//这是给有三级列表的nav设定的
(function(){
	$(".nav").load('html/nav.html', function() {
		//这是给nav引入二级列表
		$(".nav_in").append('<div class="er_ji"><!--二级列表内容--></div>');
		
		$(".all_goods_class_button").hover(function(){
			$(".er_ji").css("display","block");
		},function(){
			$(".er_ji").css("display","none");
		});
		
		$(".er_ji").hover(function(){
			$(".er_ji").css("display","block");
		},function(){
			$(".er_ji").css("display","none");
		});
	});
})()
