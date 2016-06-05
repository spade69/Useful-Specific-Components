	/************
	任务：
	节点的折叠与展开
	允许增加节点与删除节点
	按照内容进行节点查找，并且把找到的节点进行特殊样式呈现，如果找到的节点处于被父节点折叠隐藏的状态，则需要做对应的展开
	尽量做到样式交互、节点数据、节点操作的解耦
	
	需求：
	每个结点有一个文字标题
	若无子节点，标题前为空；若有子节点，且处于折叠状态，则标题前显示右三角，展开状态显示下三角
	鼠标移到标题上时，标题字变为蓝色，且标题后面出现“增”“删”两个选项可点击；移走则上述效果消失
	点击“增”，则弹出prompt框，提示用户输入结点标题；点击“删”直接删除当前结点及子节点
	搜索从根开始，层序遍历，找到的节点粗体、红色显示，且其所有祖先节点展开
	
	Author:Jason
	Date:2016/06/04
	*******/
	
	//=============================TreeNode===================================
	function TreeNode(obj){
		this.parent=obj.parent;
		this.childs=obj.childs||[];
		this.data=obj.data||"";
		this.selfElement=obj.selfElement;//访问对应的DOM结点
		this.selfElement.TreeNode=this;//对应的DOM结点访问回来，即你访问这个selfelement的treenode属性时就是访问这个this本身。
	}
	
	//原型模式封装公共操作
	TreeNode.prototype={
		constructor:TreeNode, //构造函数
		
		//解耦样式操作:arrow 是否改变箭头  visibility 可见性 toHighlight高亮 deHighlight普通
		//后两个元素可以忽略
		render:function(arrow,visibility,toHighlight,deHighlight){
			//传入的参数少于3个，即没有传入后面两个参数
			if(arguments.length<3){
				toHighlight=false;
				deHighlight=false;
			}
			
			if(arrow){
				if(this.isLeaf()){//叶节点，设为空箭头
					//用class name比较多，用tags name其实不好,因为同一个tag的不同组用class才能分清
					this.selfElement.getElementsByClassName("arrow")[0].className="arrow empty-arrow";
				}
				else if(this.isFolded()){//折叠状态设置为右箭头
					this.selfElement.getElementsByClassName("arrow")[0].className="arrow right-arrow";
					
				}
				else{//展开状态，设置为下箭头
					this.selfElement.getElementsByClassName("arrow")[0].className="arrow down-arrow";
				}
			}
			
			if(visibility){//改变可见性
				if(this.selfElement.className.indexOf("nodebody-visible")==-1){//本不可见改为可见
					this.selfElement.className=this.selfElement.className.replace("hidden","visible");
				}
				else{//改为不可见
					this.selfElement.className=this.selfElement.className.replace("visible","hidden");
				}
			}
			
			if(toHighlight){//设为高亮
				this.selfElement.getElementsByClassName("node-title")[0].className="node-title node-title-highlight";
			}
			if(deHighlight){//取消高亮
				this.selfElement.getElementsByClassName("node-title")[0].className="node-title";
			}
			
		},
		//删除结点，DOM会自动递归删除子节点，TreeNode递归手动删除子节点
		deleteNode:function(){
			var i;
			//递归删除子节点
			if(!this.isLeaf()){
				for(i=0;i<this.childs.length;i++){
					this.childs[i].deleteNode();
				}
			}
			
			this.parent.selfElement.removeChild(this.selfElement);//移除对应的DOM结点
			
			for(i=0;i<this.parent.childs.length;i++){//从父节点删除该孩子
				if(this.parent.childs[i]==this){
					this.parent.childs.splice(i,1);
					break;
				}
			}
			
			//调整父节点箭头样式
			this.parent.render(true,false);
		},
		
		//增加子节点
		addChild:function(text){
			if(text==null) 
			{return this;}
		
			if(text.trim()==""){
				alert("节点内容不能为空！");
				return this;
			}
			
			//先增加子节点，再渲染自身样式
			//若当前节点关闭，则将其展开
			if(!this.isLeaf()&&this.isFolded()){
				this.toggleFold();
			}
			
			//创建新的DOM节点并附加
			//其实以下部分是在创建页面时就会执行，动态再创建HTML DOM内容，
			var newNode=document.createElement("div");
			newNode.className="nodebody-visible";
			var newHeader=document.createElement("label");
			newHeader.className="node-header";
			
			var newSymbol=document.createElement("div");
			newSymbol.className="arrow empty-arrow";
			var newTitle=document.createElement("span");
			newTitle.className="node-title";
			newTitle.innerHTML=text;
			var space=document.createElement("span");
			space.innerHTML="&nbsp;&nbsp;";
			
			var newDelete=document.createElement("img");
			newDelete.className="deleteIcon";
			newDelete.src="images/delete.png";
			var newAdd=document.createElement("img");
			
			newAdd.className="addIcon";
			newAdd.src="images/add.png";
			
			newHeader.appendChild(newSymbol);
			newHeader.appendChild(newTitle);
			newHeader.appendChild(space);
			newHeader.appendChild(newDelete);
			newNode.appendChild(newHeader);
			
			this.selfElement.appendChild(newNode);//add div 
			//创建对应的treenode对象并添加到子节点队列
			this.childs.push(new TreeNode({parent:this,childs:[],data:text,selfElement:newNode}));
			//渲染自身样式
			this.render(true,false);
			return this;//返回自身，以便链式操作
		},
		
		//展开、收拢结点
		toggleFold:function(){
			if(this.isLeaf()) return this;//叶节点，无需操作
			//改变所有子节点的可见状态
			for(var i=0;i<this.childs.length;i++){
				this.childs[i].render(false,true);
			}
			//渲染箭头
			this.render(true,false);
			return this;//返回自身，以便链式操作
		},
		
		//判断是否为叶节点
		isLeaf:function(){
			return this.childs.length==0;
		},
		
		//判断是否折叠
		isFolded:function(){
			if(this.isLeaf()) return false; //叶节点返回false
			if(this.childs[0].selfElement.className=="nodebody-visible") return false;
			return true;
		}
	};
	
	
	//=======================================以上是封装TreeNode的代码=============================================


//=============================================事件绑定区===============================================
//以下是实际按顺序执行的代码，创建对象以及绑定事件，还有创建剩余的DOM元素

//创建根节点对应的Treenode对象
var root=new TreeNode({parent:null,childs:[],data:"front-end engineer",selfElement:document.getElementsByClassName("nodebody-visible")[0]});
//为root绑定事件
//alert(root.selfElement);

addEvent(root.selfElement,"click",function(e){//e和 event？
	var target=e.target||e.srcElement;
	var domNode=target;
	while(domNode.className.indexOf("nodebody")==-1)//没找到就继续搜索
	{
		domNode=domNode.parentNode;//找到类名含有nodebody前缀的DOM结点
		
	}
	// 获取DOM对象对应的TreeNode对象，就是selfElement.TreeNode
	selectedNode=domNode.TreeNode;
	//alert(domNode); 
	//如果点击在节点文字或箭头上
	if(target.className.indexOf("node-title")!=-1||target.className.indexOf("arrow")!=-1){
		selectedNode.toggleFold();//触发toggle操作
		
	}
	else if(target.className=="addIcon"){//点击加号上
		selectedNode.addChild(prompt("请输入子节点的内容："));
	}
	else if(target.className=="deleteIcon"){// 点击减号
		selectedNode.deleteNode();
	}
});

//给root绑定广度优先搜索函数，无需访问DOM，返回一个搜索结果队列
root.search=function(query){
	var resultList=[];
	//BFS
	var queue=[];//辅助队列，顺序存储待访问节点
	var current=this;
	//当前节点入队
	queue.push(current);
	while(queue.length>0){
		//从待访问队列取出队列头结点，并将其所有子节点入队
		current=queue.shift();//向前pop，pop是将最后一个pop出来
		//还原当前节点颜色
		current.render(false,false,false,true);
		//读取当前节点data
		if(current.data==query) resultList.push(current);//找到了
		//将当前结点的所有孩子节点入"待访问"队列
		for(var i=0;i<current.childs.length;i++){
			queue.push(current.childs[i]);
		}
	}
	return resultList;
	
};

//搜索并显示结果
addEvent(document.getElementById("search"),"click",function(){
	var text=documentElement.getElementById("searchText").value.trim();
	if(text==""){
		document.getElementById("result").innerHTML="请输入查询内容！";	
		return;
	}
			
	//执行搜索
	var resultList=root.search(text);

	//处理搜索结果
	if(resultList.length==0){
		document.getElementById("result").innerHTML="没有查询到符合条件的节点！！";
		}
	
	else{
		document.getElementById("result").innerHTML="查询到"+resultList.length+"个符合条件的结点";
		//所有结果沿途展开
		var pathNode;
		for(var x=0;x<resultList.length;x++){
			pathNode=resultList[x];
			pathNode.render(false,false,true,false);
			while(pathNode.parent!=null){
				if(pathNode.selfElement.className=="nodebody-hidden")
				{
					pathNode.parent.toggleFold();//若是收拢状态，则展开
				}
				pathNode=pathNode.parentNode;//继续上浮
			
			}
		}
	}
});

//清除搜索结果
addEvent(document.getElementById("clear"),"click",function(){
	 document.getElementById("searchText").value = "";
	 root.search(null);//清除高亮样式
	 document.getElementById("result").innerHTML="";
});

//=======================================Demo展示区==================================================
//动态生成DOM树

root.addChild("技术").addChild("IT公司").addChild("谈笑风生");
root.childs[0].addChild("HTML5").addChild("CSS3").addChild("JavaScript").addChild("PHP").addChild("Node.JS").toggleFold();
root.childs[0].childs[4].addChild("JavaScript").toggleFold();
root.childs[1].addChild("百度").addChild("腾讯").addChild("大众点评").toggleFold();	
root.childs[2].addChild("身经百战").addChild("学习一个").addChild("吟两句诗").toggleFold();	
root.childs[2].childs[2].addChild("苟利国家生死以").toggleFold();

//初始化查询demo值 类似placeholder的作用,但是placeholder都在HTML那
document.getElementById("searchText").value="JavaScript";

//==================================================================================================

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
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	