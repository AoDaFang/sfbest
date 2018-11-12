$(".main_middle_inputs input").focus(function(){
	$(this).parent().siblings("p").eq(0).css("display","block");
})

$(".main_middle_inputs input").blur(function(){
	$(this).parent().siblings("p").eq(0).css("display","none");
})