(function() {
	$(".er_ji").load('html/er_ji.html', function() {
		$(".er_ji_left_class").hover(function() {
			$(".er_ji_right_ins").eq($(this).index()).addClass("active").siblings().removeClass("active");
		}, function() {
			$(".er_ji_right_ins").eq($(this).index()).removeClass("active");
		});

		$(".er_ji_right_ins").hover(function() {
			$(this).addClass("active");
		}, function() {
			$(this).removeClass("active");
		});
		
		$(".er_ji_close").click(function(){
			$(".er_ji_right_ins").removeClass("active");
		})
	});

})();