/************
浮出层UI设计
1.浮出层中心默认在屏幕正中
2.当浮出层显示时，屏幕滚动时，浮出层始终保持位置固定在屏幕正中，
不随屏幕滚动而变化位置。或者禁止页面在有浮出层出现时滚动
3.当浮出层显示时，点击浮出层以外的部分，默认为关闭浮出层。可以实现一个半透明的遮罩来挡住浮出层外的部分
浮出层的样式、内容和逻辑尽量解耦
4.提供使用JavaScript控制浮出层展现和关闭的接口
5.浮出层的窗口大小可以是一个默认固定值，也可以是随内容变化而自适应变化，也可以是
通过接口参数进行调整
6.有能力的同学可以实现浮出层的拖拽移动浮出窗口位置以及拖拽边缘来放大缩小浮出窗口的功能
Author:Jason
Date:2016/06/17
*******/

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
	
var ctn=$("#closeBtn"),
	mask=$("#mask"),
	pop=$("#pop"), //loginbox
	login=$('#loginx');

var mouseOffsetX=0;
var mouseOffsetY=0;
var isDraging=false;

var mousePanel,mouseCtrl,mouseType;
var moving=0,mouseStartX=0,mouseStartY=0;


//点击mask 隐藏mask 和 pop
function handle(){
	mask.style.display="none";
	pop.style.display="none";

}

addEvent(mask,"click",handle);


addEvent(login,"click",function(){
	mask.style.display="block";
	pop.style.display="block";
});

addEvent(login,"click",handle);

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


//添加按下事件到 pop浮出层
addEvent(pop,'mousedown',function(e){
	var e=e||window.event;
	
	//鼠标点击点离浮出层左边框的距离
	mouseOffsetX=e.pageX-pop.offsetLeft;
	//鼠标点击点离浮出层右边框的距离
	mouseOffsetY=e.pageY-pop.offsetTop;
	isDraging=true;
});

//跟随选择的鼠标移动,移动元素
document.onmousemove=function(e){
	var e=e||window.event;
	mouseX=e.pageX;
	mouseY=e.pageY;

	var moveX=0;
	var moveY=0;

//按下鼠标时为true
	if(isDraging===true){
		moveX=mouseX-mouseOffsetX;
		moveY=mouseY-mouseOffsetY;
		//获取页面的宽高度
		var pageWidth=document.body.clientWidth;
		var pageHeight=document.body.clientHeight;

		//获取浮出层的宽高度
		var loginWidth=pop.offsetWidth;
		var loginHeight=pop.offsetHeight;

		var maxMoveX=pageWidth-loginWidth;
		var maxMoveY=pageHeight-loginHeight;

		moveX=Math.min(maxMoveX,Math.max(0,moveX));
		moveY=Math.min(maxMoveY,Math.max(0,moveY));
		pop.style.left=moveX+"px";
		pop.style.top=moveY+"px";
	}
}


//event panel? ctrl? 这个是根据点击
function onMouseDown(e,panel,ctrl,type){
	var e=e||window.event;
	   // alert("fuck");
	mouseStartX=e.pageX-ctrl.offsetLeft;
	mouseStartY=e.pageY-ctrl.offsetTop;

	mousePanel=panel;//十字移动那个
	mouseCtrl=ctrl;
	mouseType=type;

	moving=setInterval(onMove,10);//隔10ms执行一次onMove
}

//制造一个 十字移动的图标，style在移动随着
function onMove(){
	if(moving){
		var toX=mouseX-mouseStartX
		var toY=mouseY-mouseStartY;
		//限定浮出层的最大宽高度
		var maxToX=document.body.clientWidth-mousePanel.offsetLeft-10;
		var maxToY=document.body.clientHeight-mousePanel.offsetTop-10;

		toX=Math.min(maxToX,Math.max(toX,180));
		toY=Math.min(maxToY,Math.max(toY,140));
		isDraging=false;
		switch(mouseType){
			//仅拉右边的
			case "r":
				mouseCtrl.style.left=toX+"px";// 加长的px数量+原来toX长度
				mousePanel.style.width = toX + "px";
				break;
			//仅拉下方的
			case "b":
                mouseCtrl.style.top = toY + "px";
                mousePanel.style.height = toY + "px";
                break;
             //拉对角的
            case "rb":
                console.log(mouseCtrl.style.left);
                mouseCtrl.style.left = toX-8 + "px";
                mouseCtrl.style.top = toY-8 + "px";
                mousePanel.style.width = toX + "px";
                mousePanel.style.height = toY + "px";
                break;
		}
	}
}

//按键向上时，draging恢复，且消除interval事件即onmove
document.onmouseup=function(){
	isDraging=false;
	clearInterval(moving);
	moving=0;
	var cls=document.getElementsByClassName("resizable-box");
	for(var i=0;i<cls.length;i++){
		cls[i].style.left="";
		cls[i].style.top="";
	}
}

function resizable(ele){
	var panel=ele;//panel是传入的元素
	//在ele后面创建三个div，它们是resizeable box
	var rightBox=document.createElement("div");
	var bottomBox = document.createElement("div");
	var rightBottomBox = document.createElement("div");
	rightBox.class=rightBox.className="resizable-right resizable-box";
	bottomBox.class=bottomBox.className="resizable-bottom resizable-box";
	rightBottomBox.class=rightBottomBox.className="resizable-right-bottom resizable-box";

	panel.appendChild(rightBox);
	panel.appendChild(bottomBox);
    panel.appendChild(rightBottomBox);


    addEvent(rightBox,"mousedown",function(e){
    	onMouseDown(e,panel,rightBox,"r");
    });


    addEvent(bottomBox,"mousedown",function(e){
    	onMouseDown(e,panel,bottomBox,"b");
    });

     addEvent(rightBottomBox,"mousedown",function(e){
    	onMouseDown(e,panel,rightBottomBox,"rb");
    });
}

window.onload=window.onresize=function(){
	autoCenter(pop);
	resizable(pop);
}