requirejs.config({
	baseUrl: "js",
	paths: {
		jquery: "plugins/jquery.min",
		cookie: "plugins/cookie",
		do_cookie: "plugins/do_cookie",
		do_index_cart: "plugins/do_index_cart",
		delete_cookie: "plugins/delete_cookie",
		set_cookie_amount : "plugins/set_cookie_amount",
		tab:"plugins/Tab"
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

requirejs(["jquery","do_cookie", "cookie", "delete_cookie", "set_cookie_amount","tab"], function($, do_cookie) {
	var oTab = document.querySelector(".main_tab .tab");
	var tab1 = new Tab(oTab);
	tab1.init();
	
	
	var flag1 = true;
	$(".account_yzcode_input input").blur(function(){
		if($(".account_yzcode_input input").val() == "qi2b"){
			$(".account_yzcode_input b").css("display","block");
			flag1 = true;
		}else{
			$(".account_yzcode_input b").css("display","none");
			flag1 = false;
		}
	});
	
	$(".account_btn").click(function(){
		if(flag1){
			$.ajax({
				type:"get",
				url:"http://localhost/sfbest/api/login.php",
				async:true,
				data:{
					uname:$(".account_num_input input").val(),
					password:$(".account_password_input input").val()
				},
				dataType:"json",
				success:function(data){
					console.log(data)
					if(data.errorCode == 0 && $(".account_num_input input").val()!=""  &&  $(".account_password_input input").val()!=""   ){
						setCookie("login",$(".account_num_input input").val());
						window.location.href='index.html';
					}else{
						alert("请填写正确的账号密码");
					}
				}
			});
		}else{
			alert("请正确填写验证码");
		}
	})
	
	
});