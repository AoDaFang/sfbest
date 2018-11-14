requirejs.config({
	baseUrl: "js",
	paths: {
		jquery: "plugins/jquery.min",
		cookie: "plugins/cookie",
		do_cookie: "plugins/do_cookie",
		do_index_cart: "plugins/do_index_cart",
		delete_cookie: "plugins/delete_cookie",
		set_cookie_amount : "plugins/set_cookie_amount"
	},
	shim: {
		jquery: {
			exports: "jQuery"
		},
		do_cookie: {
			exports: "dc",
			deps: ["cookie", "jquery"]
		},
		do_index_cart: {
			deps: ["cookie", "jquery", "delete_cookie"]
		},
		delete_cookie: {
			deps: ["cookie", "jquery"]
		},
		set_cookie_amount:{
			deps: ["cookie"]
		}
	}
});

requirejs(["jquery","do_cookie", "cookie", "delete_cookie", "set_cookie_amount"], function($, do_cookie) {

var flag1 = false;
var flag2 = false;
var flag3 = false;
var flag4 = false;
var flag5 = true;

//手机号
$(".username_all input").blur(function(){ //用户名输入框失焦
	
	if((/^[1][3-8]{1}[0-9]{9}$/).test($(this).val())){//是正确的手机号
		flag1 = true;
		$(".username_all b").css("display","block")//显示对号
		$(this).parent().siblings("p").eq(0).css("display","none");//隐藏文字
	}else if($(this).val() == ""){//如果是空值
		flag1 = false;
		$(this).css("border","1px solid #cdcdcd")//边框变为灰色
		$(".username_all b").css("display","none")//隐藏对号
		$(this).parent().siblings("p").eq(0).css("display","none");//隐藏文字
	}else{
		flag1 = false;
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
		flag2 = true;
		$(this).css("border","1px solid #cdcdcd")//边框变为灰色
		$(".password_all b").css("display","block")//显示对号
		$(this).parent().siblings("p").eq(0).css("display","none");//隐藏文字
	}else if($(this).val() == ""){//如果是空值
		flag2 = false;
		$(this).css("border","1px solid #cdcdcd")//边框变为灰色
		$(".password_all b").css("display","none")//隐藏对号
		$(this).parent().siblings("p").eq(0).css("display","none");//隐藏文字
	}else{
		flag2 = false;
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
		flag3 = true;
		$(this).css("border","1px solid #cdcdcd")//边框变为灰色
		$(".re_password_all b").css("display","block")//显示对号
		$(this).parent().siblings("p").eq(0).css("display","none");//隐藏文字
		
	}else if((/^\w{6,20}$/).test($(".password_all input").val()) && $(".password_all input").val() != $(this).val()){//如果当前密码符合规定，但是两次输出不一致
		flag3 = false;
		console.log((/^\w{6,20}$/).test($(".password_all input").val()))
		$(this).css("border","1px solid #ff4800");//边框变红
		$(".re_password_all b").css("display","none")//隐藏对号
		$(this).parent().siblings("p").eq(0).html("两次输入的密码不一致，请重新输入。").css("display","block").css("color","#ff4800");
		
	}else if(!(/^\w{6,20}$/).test($(this).val()) ){//如果第一次密码就不符规定
		flag3 = false;
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
		flag4 = true;
		$(this).css("border","1px solid #cdcdcd")//边框变为灰色
		$(".yz_cood_all b").css("display","block")//显示对号
		$(this).parent().siblings("p").eq(0).html("请输入验证码").css("display","none").css("color","#666");
	}else{
		flag4 = false;
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
		flag5 = false;
	}else{
		$(".main_middle_zhuce_xieyi i").css("display","none");
		flag5 = true;
	}
})

//点击注册按钮
$(".main_middle_zhuce_btn span").click(function(){
	if(flag1&&flag2&&flag3&&flag4&&flag5){
		$.ajax({
			type:"post",
			url:"http://localhost/sfbest/api/register.php",
			async:true,
			data:{
				uname:$(".username_all input").val(),
				password:$(".password_all input").val(),
				uface:""
			},
			dataType:"json",
			success:function(data){
				console.log(data);
				if(data.errorCode == 1002){
					alert("您的手机号已被注册。")
				}else if(data.errorCode == 1000){
					alert("注册成功！");
					setCookie("login",$(".username_all input").val());
					window.location.href='index.html';
				}else{
					alert("发送错误")
				}
			}
		})
	}else{
		alert("请按照要求正确填写所需信息");
	}
})
});