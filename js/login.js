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
});