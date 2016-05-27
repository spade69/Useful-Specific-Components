	/************
	描述
	模拟一个队列，队列的每个元素是一个数字，初始队列为空
	基于任务18
	限制输入的数字在10-100
	队列元素数量最多限制为60个，当超过60个时，添加元素时alert出提示
	队列展现方式变化如图，直接用高度表示数字大小
	
	实现一个简单的排序功能，如冒泡排序（不限制具体算法），用可视化的方法表达出来
	
	边界：非法输入，只允许输入10-100数字。 还是采取id的方式才能删除指定的button
	
	Author:Jason
	Date:2016/05/26
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
			
			//var parseInt(arr[i]);
			//alert(typeof arr[i]);
			//var tmp=((typeof arr[i])=="Number")?arr[i]*3:1;
			
			var tmp=arr[i]*3;// 是字符串？
			
			bt.style.height=tmp+"px";//设置元素的高度
		}
		
		
		if(arr.length>60)
		{
			alert("Your queue's elements over than 60! Illegal");
			arr.pop();
			return;
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
	
	//冒泡排序
	var o={
	bubble_sort:function(){
		if(arr.length<=1)
			return;
		for(var i=0;i<arr.length;i++)
		{
			for(var j=i;j<arr.length;j++)
			{
				if(arr[i]<arr[j]){
					var tmp=arr[i];				
					arr[i]=arr[j];
					arr[j]=tmp;
				}
			}
		}
		refresh();
	}
	};
	
	//可视化快排
	function quick_sort(){
		
	}
	
	
	function init(){
		var bs=document.getElementById("bubble");
		delBtnHandle();
		//EventUtil.addHandler(bs,"click",bubble_sort(event));
		bs.addEventListener("click",o,"false");
	}

	var div=document.getElementById("div");
	//alert(text.value);
	var b1=document.getElementById("lin");
	var b2=document.getElementById("rin");
	var b3=document.getElementById("lout");
	var b4=document.getElementById("rout");
	
	//右侧入
	b2.addEventListener("click",function(event){
		var text=document.getElementById("tex");
		var txtval=text.value;
		//限定输入必须为整数数字，如何分割数字
		if(!txtval.match(/^([1-9][0-9]|100)$/)){
			alert("必须为10到100的正整数！");
			return;
		}
		
		var num=parseInt(txtval);// string 转Number
		//typeof()
		arr.push(num);
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
	
	//左侧入
	b1.addEventListener("click",function(event){
		var text=document.getElementById("tex");
		var txtval=text.value;
		//限定输入必须为整数数字，如何分割数字
		if(!txtval.match(/^([1-9][0-9]|100)$/)){
			alert("必须为10到100的正整数！");
			return;
		}
		
		var num=parseInt(txtval);// string 转Number
		arr.push(num);
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
	