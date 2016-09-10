
define(function(){
	//实现在String的原型里面,即往原型增加了一个新的共享方法
	String.prototype.glen=function(){
		var len=0;
		for(var i=0;i<this.length;i++){
			if(this.charCodeAt(i)>127||this.charCodeAt(i)==94){
				len+=2;
			}
			else{
				len++;
			}
		}
		return len;
	}

	//
	$=function(e1){
		return document.querySelector(e1);
	}
	// 跨浏览器兼容的工具函数
	addEvent=function(element,type,handler) {
	    if(element.addEventListener) {
	        element.addEventListener(type, handler,false);
	    }
	    else if(element.attachEvent) {
	        element.attachEvent("on" + type, handler);
	    }
	    else {
	        element["on" + type] = handler;
	    }
	}

		//自动居中
	autoCenter=function(ele){
	    var bodyW=document.body.clientWidth;
	    var bodyH=document.body.clientHeight;

	    var elW=ele.offsetWidth;
	    var elH=ele.offsetHeight;

	    ele.style.left=(bodyW-elW)/2+"px";
	    ele.style.top=(bodyH-elH)/2+"px";
	}

	//使元素自动全屏
	fillToBody=function(ele){
	    ele.style.width=document.body.clientWidth+"px";
	    ele.style.height=document.body.clientHeight+"px";
	}

	//return is not needed!
});