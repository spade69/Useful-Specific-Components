var EventUtil={
	
	addHandler:function(element,type,handler){
		if(element.addEventListener){//Normal
			element.addEventListener(type,handler,false);//false
		}else if(element.attachEvent){//IE
			element.attachEvent("on"+type,handler);
		}else{
			element["on"+type]=handler;
		}
	},
	
	removeHandler:function(element,type,handler){
		if(element.removeEventListener){
			element.removeEventListener(type,handler,false);
		}else if(element.detachEvent){
			element.detachEvent("on",type,handler);
		}else{
			element["on"+type]=null;
		}
	},
	
	getEvent:function(event){
		return event?event:window.event;
	},
	
	getTarget:function(event){
		return event.taget||event.srcElement;//target是一个元素节点对象
	},
	
	//取消浏览器事件后的默认执行
	preventDefault:function(event){
		if(event.preventDefault){
			event.preventDefault;
		}
		else{
			event.returnValue=false;
		}
	},
	
	
	// 取消浏览器事件进一步的冒泡传递
	stopPropagation:function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble=true;
		}
	}
};
