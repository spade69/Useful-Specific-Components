//like Jquery
$=function(e1){
    return document.querySelector(e1);
}


// 跨浏览器兼容的工具函数
function addEvent(element,type,handler) {
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
function autoCenter(ele){
    var bodyW=document.body.clientWidth;
    var bodyH=document.body.clientHeight;

    var elW=ele.offsetWidth;
    var elH=ele.offsetHeight;

    ele.style.left=(bodyW-elW)/2+"px";
    ele.style.top=(bodyH-elH)/2+"px";
}

//使元素自动全屏
function fillToBody(ele){
    ele.style.width=document.body.clientWidth+"px";
    ele.style.height=document.body.clientHeight+"px";
}

