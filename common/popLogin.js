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
Modified:2016/9/4
*******/
//* @param {ctn,mask,pop,login} - ctn关闭按钮 mask蒙版 pop登录模块 login登录按钮

define(['useful'],function(useful){
	//ctn 
	function CreateFloat(ctn,mask,pop,login){
		var mousePanel,mouseCtrl,mouseType;
		this.mask=$("#"+mask);
		this.ctn=$("#"+ctn);
		this.pop=$("#"+pop);
		this.login=$("#"+login);
		this.mouseOffsetX=0;
		this.mouseOffsetY=0;
		this.isDraging=false;
		this.moving=0;
		this.mouseStartX=0;
		this.mouseStartY=0;

		this.setPanel=function(newPanel){
			mousePanel=newPanel;
		}
		this.getPanel=function(){
			return mousePanel;
		}
		this.setCtrl=function(newCtrl){
			mouseCtrl=newCtrl;
		}
		this.getCtrl=function(){
			return mouseCtrl;
		}
		this.setType=function(newType){
			mouseType=newType;
		}
		this.getType=function(){
			return mouseType;
		}

	//点击mask 隐藏mask 和 pop
		
		this.initialEvent=function(){//this的作用域
			var self=this;//here  this means this object
			addEvent(this.mask,"click",function(){
				self.mask.style.display="none";
				self.pop.style.display="none";
			});
			addEvent(this.login,"click",function(){
				//here this means this.login this element not the object itself
				if(self.mask.style.display=="none"){
					self.mask.style.display="block";
					self.pop.style.display="block";
				}else{
					self.mask.style.display="none";
					self.pop.style.display="none";
				}
			});
	

		};
		this.mouseEvent=function(){
			//添加按下事件到 pop浮出层
			var self=this;
			addEvent(this.pop,'mousedown',function(e){
				var e=e||window.event;				
				//鼠标点击点离浮出层左边框的距离
				self.mouseOffsetX=e.pageX-this.offsetLeft;
				//鼠标点击点离浮出层右边框的距离
				self.mouseOffsetY=e.pageY-this.offsetTop;
				self.isDraging=true;
			});
		};
		
		this.initialEvent();
		this.mouseEvent();
	}


	CreateFloat.prototype={
		//自动居中
		autoCenter:function(ele){
			var ele=$("#"+ele);
			var bodyW=document.body.clientWidth;
			var bodyH=document.body.clientHeight;

			var elW=ele.offsetWidth;
			var elH=ele.offsetHeight;

			ele.style.left=(bodyW-elW)/2+"px";
			ele.style.top=(bodyH-elH)/2+"px";
		},
		//使元素自动全屏
		fillToBody:function(ele){
			var ele=$("#"+ele);
			ele.style.width=document.body.clientWidth+"px";
			ele.style.height=document.body.clientHeight+"px";
		},
		mousemoveHandler:function(e){
			var e=e||window.event;
			mouseX=e.pageX;
			mouseY=e.pageY;

			var moveX=0;
			var moveY=0;
		//按下鼠标时为true
			if(this.isDraging===true){
				moveX=mouseX-this.mouseOffsetX;
				moveY=mouseY-this.mouseOffsetY;
				//获取页面的宽高度
				var pageWidth=document.body.clientWidth;
				var pageHeight=document.body.clientHeight;

				//获取浮出层的宽高度
				var loginWidth=this.pop.offsetWidth;
				var loginHeight=this.pop.offsetHeight;

				var maxMoveX=pageWidth-loginWidth;
				var maxMoveY=pageHeight-loginHeight;

				moveX=Math.min(maxMoveX,Math.max(0,moveX));
				moveY=Math.min(maxMoveY,Math.max(0,moveY));
				this.pop.style.left=moveX+"px";
				this.pop.style.top=moveY+"px";
			}
		},
		mouseupHandler:function(){
			this.isDraging=false;
			clearInterval(this.moving);//清除，停止setInterval对某个函数的定时调用
			this.moving=0;
			var cls=document.getElementsByClassName("resizable-box");
			for(var i=0;i<cls.length;i++){
				cls[i].style.left="";
				cls[i].style.top="";
			}
		},
		//event panel? ctrl? 这个是根据点击
		onMouseDown:function(e,panel,ctrl,type){
			var e=e||window.event;
			   // alert("fuck");
			this.mouseStartX=e.pageX-ctrl.offsetLeft;
			this.mouseStartY=e.pageY-ctrl.offsetTop;

			this.setPanel(panel);//十字移动那个
			this.setCtrl(ctrl);
			this.setType(type);

			this.moving=setInterval(this.onMove,10);//隔10ms执行一次onMove
		},
		//制造一个 十字移动的图标，style在移动随着
		onMove:function(){
			if(this.moving){
				var toX=mouseX-this.mouseStartX
				var toY=mouseY-this.mouseStartY;
				//限定浮出层的最大宽高度
				var maxToX=document.body.clientWidth-this.getPanel().offsetLeft-10;
				var maxToY=document.body.clientHeight-this.getPanel().offsetTop-10;

				toX=Math.min(maxToX,Math.max(toX,180));
				toY=Math.min(maxToY,Math.max(toY,140));
				this.isDraging=false;
				switch(this.getType()){
					//仅拉右边的
					case "r":
						this.getCtrl().style.left=toX+"px";// 加长的px数量+原来toX长度
						this.getPanel().style.width = toX + "px";
						break;
					//仅拉下方的
					case "b":
		                this.getCtrl().style.top = toY + "px";
		                this.getPanel().style.height = toY + "px";
		                break;
		             //拉对角的
		            case "rb":
		                //console.log(mouseCtrl.style.left);
		                this.getCtrl().style.left = toX-8 + "px";
		                this.getCtrl().style.top = toY-8 + "px";
		                this.getPanel().style.width = toX + "px";
		                this.getPanel().style.height = toY + "px";
		                break;
				}
			}
		},
		resizable:function(ele){
			var pop=$("#"+ele);;//panel是传入的元素
			//在ele后面创建三个div，它们是resizeable box
			var self=this;//this是随着上下文执行环境改变的
			var rightBox=document.createElement("div");
			var bottomBox = document.createElement("div");
			var rightBottomBox = document.createElement("div");
			rightBox.class=rightBox.className="resizable-right resizable-box";
			bottomBox.class=bottomBox.className="resizable-bottom resizable-box";
			rightBottomBox.class=rightBottomBox.className="resizable-right-bottom resizable-box";

			pop.appendChild(rightBox);
			pop.appendChild(bottomBox);
		    pop.appendChild(rightBottomBox);

			//addEventhere?	
			addEvent(document,'mousemove',function(e){self.mousemoveHandler(e)});
			//按键向上时，draging恢复，且消除interval事件即onmove
			addEvent(document,'mouseup',function(){this.mouseupHandler});

		    addEvent(rightBox,"mousedown",function(e){
		    	self.onMouseDown(e,pop,rightBox,"r");
		    });


		    addEvent(bottomBox,"mousedown",function(e){
		    	self.onMouseDown(e,pop,bottomBox,"b");
		    });

		     addEvent(rightBottomBox,"mousedown",function(e){
		    	self.onMouseDown(e,pop,rightBottomBox,"rb");
		    });

		}

	}





/*

function resizable(ele){
	
}*/
	return{
		CreateFloat:CreateFloat
	}
});

