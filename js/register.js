
//手机号
$(".username_all input").blur(function(){ //用户名输入框失焦
	
	if((/^[1][3-8]{1}[0-9]{9}$/).test($(this).val())){//是正确的手机号
		$(".username_all b").css("display","block")//显示对号
		$(this).parent().siblings("p").eq(0).css("display","none");//隐藏文字
	}else if($(this).val() == ""){//如果是空值
		$(this).css("border","1px solid #cdcdcd")//边框变为灰色
		$(".username_all b").css("display","none")//隐藏对号
		$(this).parent().siblings("p").eq(0).css("display","none");//隐藏文字
	}else{
		$(".username_all b").css("display","none")//隐藏对号
		$(this).css("border","1px solid #ff4800");//边框变红
		$(this).parent().siblings("p").eq(0).html("请输入正确的手机号").css("display","block").css("color","#ff4800");
	}
});
$(".username_all input").focus(function(){//用户名输入框聚焦
	
	$(this).css("border","1px solid #6e9c0b");//边框变成绿色
	
	if((/^[1][3-8]{1}[0-9]{9}$/).test($(this).val())){//如果是正确的手机号
		$(this).parent().siblings("p").eq(0).css("display","none");//隐藏文字
	}else{
		$(this).parent().siblings("p").eq(0).html("请输入您的手机号").css("display","block").css("color","#666");//改变文字信息
	}
});



//密码框
$(".password_all input").blur(function(){//密码框失焦
	
	if((/^\w{6,20}$/).test($(this).val())){//如果是正确的密码
		
		$(this).css("border","1px solid #cdcdcd")//边框变为灰色
		$(".password_all b").css("display","block")//显示对号
		$(this).parent().siblings("p").eq(0).css("display","none");//隐藏文字
	}else if($(this).val() == ""){//如果是空值
		$(this).css("border","1px solid #cdcdcd")//边框变为灰色
		$(".password_all b").css("display","none")//隐藏对号
		$(this).parent().siblings("p").eq(0).css("display","none");//隐藏文字
	}else{
		$(".password_all b").css("display","none")//隐藏对号
		$(this).css("border","1px solid #ff4800");//边框变红
		$(this).parent().siblings("p").eq(0).html("密码只能是6-20位数字字母下划线的组合").css("display","block").css("color","#ff4800");
	}
});
$(".password_all input").focus(function(){//密码框聚焦
		$(this).css("border","1px solid #6e9c0b");//边框变成绿色
		
		if((/^\w{6,20}$/).test($(this).val())){//正确密码
			$(this).parent().siblings("p").eq(0).css("display","none");//隐藏文字
		}else{
			$(this).parent().siblings("p").eq(0).html("6-20位字符，可使用数字字母下划线。不建议使用纯数字和字母组合。").css("display","block").css("color","#666");//改变文字信息
		}
});


//确认密码
$(".re_password_all input").blur(function(){
	if((/^\w{6,20}$/).test($(".password_all input").val()) && $(".password_all input").val() == $(this).val()){//如果当前密码符合规定，并且两次密码一致
		$(this).css("border","1px solid #cdcdcd")//边框变为灰色
		$(".re_password_all b").css("display","block")//显示对号
		$(this).parent().siblings("p").eq(0).css("display","none");//隐藏文字
		
	}else if((/^\w{6,20}$/).test($(".password_all input").val()) && $(".password_all input").val() != $(this).val()){//如果当前密码符合规定，但是两次输出不一致
		console.log((/^\w{6,20}$/).test($(".password_all input").val()))
		$(this).css("border","1px solid #ff4800");//边框变红
		$(".re_password_all b").css("display","none")//隐藏对号
		$(this).parent().siblings("p").eq(0).html("两次输入的密码不一致，请重新输入。").css("display","block").css("color","#ff4800");
		
	}else if(!(/^\w{6,20}$/).test($(this).val()) ){//如果第一次密码就不符规定
		$(this).css("border","1px solid #cdcdcd")//边框变为灰色
		$(".re_password_all b").css("display","none")//隐藏对号
		$(this).parent().siblings("p").eq(0).html("请再次输入密码").css("display","block").css("color","#666");
		
	}
});

$(".re_password_all input").focus(function(){
		$(this).css("border","1px solid #6e9c0b");//边框变成绿色
		$(".re_password_all b").css("display","none")//隐藏对号
		if((/^\w{6,20}$/).test($(".password_all input").val()) && $(".password_all input").val() == $(this).val()){
			$(this).parent().siblings("p").eq(0).css("display","none");
		}else{
			$(this).parent().siblings("p").eq(0).html("请再次输入密码").css("display","block").css("color","#666");
		}
		
});


//验证码
$(".yz_cood_all input").blur(function(){
	if($(this).val().toLowerCase() == "3kzb"){//输入正确
		$(this).css("border","1px solid #cdcdcd")//边框变为灰色
		$(".yz_cood_all b").css("display","block")//显示对号
		$(this).parent().siblings("p").eq(0).html("请输入验证码").css("display","none").css("color","#666");
	}else{
		$(this).css("border","1px solid #ff4800");//边框变红
		$(".yz_cood_all b").css("display","none")//隐藏对号
		$(this).parent().siblings("p").eq(0).html("验证码输入错误，请重新输入").css("display","block").css("color","#ff4800");
	}
});


$(".yz_cood_all input").focus(function(){
	$(this).css("border","1px solid #6e9c0b");//边框变成绿色
	$(".yz_cood_all b").css("display","none")//隐藏对号
});



$(".yz_cood_all input").keyup(function(){
	if($(this).val().toLowerCase() == "3kzb"){
		$(".yz_cood_all b").css("display","block")//显示对号
	}
});


//阅读协议
$(".main_middle_zhuce_xieyi input[type=checkbox]").change(function(){
	if($(this).prop("checked") == false){
		$(".main_middle_zhuce_xieyi i").css("display","block");
	}else{
		$(".main_middle_zhuce_xieyi i").css("display","none");
	}
})
