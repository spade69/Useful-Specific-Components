	/************
	描述
	模拟一个队列，队列的每个元素是一个数字，初始队列为空
	有一个input输入框，以及4个操作按钮
	点击"左侧入"，将input中输入的数字从左侧插入队列中；
	点击"右侧入"，将input中输入的数字从右侧插入队列中；
	点击"左侧出"，读取并删除队列左侧第一个元素，并弹窗显示元素中数值；
	点击"右侧出"，读取并删除队列又侧第一个元素，并弹窗显示元素中数值；
	点击队列中任何一个元素，则该元素会被从队列中删除
	每次只读入一个数字就不考虑分割数字的问题了
	
	边界：非法输入，只允许输入数字。 还是采取id的方式才能删除指定的button
	
	Author:Jason
	Date:2016/05/25
	*******/
	var arr=new Array();
	

	//刷新队列button
	function refresh(){
		var div=document.getElementById("div");
		//刷新操作！删除所有childnode！
		for(var k=div.childNodes.length-1;k>0;k--){
			div.removeChild(div.childNodes[k]);
		}
		
		for(var i=0;i<arr.length;i++){
			var bt=document.createElement("button");
			bt.setAttribute("id",i);
			var bt_txt=document.createTextNode(arr[i]);
			bt.appendChild(bt_txt);
			div.appendChild(bt);
			

		}
	}
	
	//删除队列中的元素,捕捉的是div之下的，跟上面的div中的button无关！
	function delBtnHandle(){
		
		var del=document.getElementsByTagName("button");
		var divx=document.getElementById("div");
		
		//该div注册一个事件，但是target不是它
		EventUtil.addHandler(divx,"click",function(event){
			var target=EventUtil.getTarget(event);//target是一个元素节点对象
			if(target.tagName.toLowerCase()=="button"){
			//通过捕捉这个事件来实现，事件肯定会冒泡
				//var item=target.parentNode;
				var valx=target.childNodes[0].textContent;//v=
				var idx=target.getAttribute("id");
				
				for(var i=0;i<arr.length;i++)
				{
					if(i==idx)
					//alert(valx.valueOf());
					{
						//delete arr[i];
						//事件只有一次，但是值可能都相同啊！
						//alert(valx.valueOf());
						arr.splice(i,1);
						refresh();
					}
				}
				
			}
		});
		
	}
	
	function init(){
		delBtnHandle();
	}

	var div=document.getElementById("div");
	//alert(text.value);
	var b1=document.getElementById("lin");
	var b2=document.getElementById("rin");
	var b3=document.getElementById("lout");
	var b4=document.getElementById("rout");
	
	//左侧入
	b2.addEventListener("click",function(event){
		var text=document.getElementById("tex");
		var txtval=text.value;
		//限定输入必须为整数数字，如何分割数字
		if(!txtval.match(/^\d+$/)){
			alert("必须为整数！");
			return;
		}
		
		
		arr.push(txtval);
		refresh();
		
		
		
	},false);//false
	
	//右侧出
	b4.addEventListener("click",function(event){
		//限定输入必须为整数数字，如何分割数字
		
		if(arr.length<1){
			
			return;
		}
		var txtval=arr.pop();
		alert(txtval);
		
		refresh();
		
		
		
	},false);//false
	
	//右侧入
	b1.addEventListener("click",function(event){
		var text=document.getElementById("tex");
		var txtval=text.value;
		//限定输入必须为整数数字，如何分割数字
		if(!txtval.match(/^\d+$/)){
			alert("必须为整数！");
			return;
		}
		
		
		arr.push(txtval);
		arr.reverse();
		
		refresh();
		
		
		
	},false);//false
	
	//左侧出
	b3.addEventListener("click",function(event){
		//限定输入必须为整数数字，如何分割数字
		
		if(arr.length<1){
			
			return;
		}
		arr.reverse();
		var txtval=arr.pop();
		alert(txtval);
		
		refresh();
		
		
		
	},false);//false
	
	//事件代理实现点击一个删除一个，使用splice()删除数组元素
	init();
