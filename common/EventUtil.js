/*
Event Handler
兼容IE等浏览器的跨浏览器事件处理代码
包括 
事件注册addHandler
事件删除removeHandler
获取事件对象：getevent
获取
	
Author Jason
Date  2016/9/1
*/
define(function(){
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
			return event.taget||event.srcElement;
		},
		
		//取消浏览器事件后的默认执行
		preventDefault:function(event){
			if(event.preventDefault){
				event.preventDefault();
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

	return EventUtil;
});