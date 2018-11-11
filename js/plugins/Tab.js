function Tab(ele){
	this.btns=ele.children[0].children;
	this.shows=ele.children[1].children;
}
Tab.prototype.init=function(){
	var that=this;
	for(var i=0;i<this.btns.length;i++){
		(function(index){
			that.btns[index].onclick=function(){
				that.change(index);
			}
		})(i);
	}
}
Tab.prototype.change=function(index){
	for(var i=0;i<this.btns.length;i++){
		this.btns[i].className="";
		this.shows[i].className="";
	}
	this.btns[index].className="active";
	this.shows[index].className="active";
}
//new Tab(document.querySelector(".tab")).init();
