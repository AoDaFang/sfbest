jQuery.fn.extend({
	center:function(loaded){//元素居中固定函数   //原主页获取，要看懂**************************************************
		var obj = this;
		body_width = parseInt($(window).width());//获取body宽度
		body_height = parseInt($(window).height());//获取body高度
		block_width = parseInt(obj.width());//获取元素的宽度
		block_height = parseInt(obj.height());//获取元素高度
		
		left_position = parseInt((body_width/2) - (block_width/2)  + $(window).scrollLeft());
		if (body_width<block_width) { left_position = 0 + $(window).scrollLeft(); };
		
		top_position = parseInt((body_height/2) - (block_height/2) + $(window).scrollTop());
		if (body_height<block_height) { top_position = 0 + $(window).scrollTop(); };
		
		if(!loaded) {
			
			obj.css({'position': 'absolute'});
			obj.css({ 'top': top_position, 'left': left_position });
			$(window).bind('resize', function() { 
				obj.center(!loaded);
			});
			$(window).bind('scroll', function() { 
				obj.center(!loaded);
			});
			
		} else {
			obj.stop();
			obj.css({'position': 'absolute'});
			obj.animate({ 'top': top_position }, 200, 'linear');
		}
	},
});
//
//jQuery.pinyin = function(str){
//		var defer = $.Deferred();
//		$.ajax({
//			type:"get",
//			url:"http://api.okayapi.com",
//			async:true,
//			data:{
//				s:"Ext.Pinyin.Convert",
//				text:str
//			},
//			dataType:"jsonp",
//			success:function(data){
//				defer.resolve(data);
//			}
//		});
//		return defer.promise();
//}

jQuery.pinyin = function(str){
		var a = null;
		$.ajax({
			type:"get",
			url:"http://api.okayapi.com",
			async:false,
			data:{
				s:"Ext.Pinyin.Convert",
				text:str
			},
			dataType:"jsonp",
			success:function(data){
				console.log(data)
				return data;
			}
		});
//		return a;
}

