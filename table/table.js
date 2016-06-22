

(function(){	
	var config={
		tdWidth:"150px",
		tdHeight:"55px",
		rowNum:"5",
		colNum:'5',
		thBackgroundC:"#333",
		border:"1px solid #CCC",
		thcontent:['姓名','语文','数学','英语','总分'],
		trContent:[
			['David',80,90,70,240],
			['Lily',90,60,90,240],
			['Bright',60,100,70,230],
			['Strong',100,70,80,250],
		]
	},

	tab=document.getElementById("tab");

	addTh();
	addTr();

function addTh(){
	var thNode=document.createElement("tr");
	var tdList;
	//addTd直接返回一个td
	thNode=addTd(thNode,config.thcontent);
	thNode.style.background = config.thBackgroundC;
	thNode.style.color = '#fff';
	thNode.style.fontWeight = "bold";

	tdList=thNode.childNodes;

	for(var i=1;i<config.colNum;i++){
		addArrowUp(tdList[i]);
		addArrowDown(tdList[i]);
	}

	tab.appendChild(thNode);

	function addArrow(divNode,flag){
		divNode.style.width = "0px";
		divNode.style.height = "0px";
		divNode.style.borderLeft ="8px solid transparent";
		divNode.style.borderRight ="8px solid transparent";
		divNode.style.cursor ="pointer";
		divNode.style.position = "absolute";
		divNode.style.right = "30px";

		divNode.addEventListener('click',function(event){
			var content=event.target.parentNode.innerHTML.split('<')[0],
				listNum=config.thcontent.indexOf(content),
				sortList=[],
				newList=[],
				trList=tab.childNodes;

				//取出要排序的数据，保存在数组中
				for(var i=0;i<config.rowNum-1;i++){
					sortList.push(trList[i+1].childNodes[listNum].innerHTML);
				}

				//得到所要求经排序后的数组
				//降序排序
				newList=sortList.sort(sortNumber);
				//升序
				if(!flag){
					newList=newList.reverse();
				}

				//获得数据分布情况
				sortList=[];
				for(i=0;i<config.rowNum-1;i++){
					sortList.push(trList[i+1].childNodes[listNum].innerHTML);
				}

				//根据前后两个数组，重新排序列表项
				changeOrder(newList,sortList);

				function sortNumber(a,b){
					return b-a;
				}

				//根据排序结果重新排列行序
				//核心函数 core function
				function changeOrder(newList,oldList){
					var len=newList.length,
						pos_before,
						pos_now,
						trList=tab.childNodes,
						tempNode=document.createElement('tr'),
						temp;

					for(var k=0;k<len;k++){
						//记录当前值在新表中的位置，并寻找当前值在原表中的位置
						pos_now=k;
						pos_before=oldList.indexOf(newList[k]);//找出该值在原表中的位置
						//如果当前值在两个表中的位置不一样，则交换两个节点的内容
						if(pos_now!=pos_before){
							//用innerHTML交换 
							tempNode.innerHTML=trList[pos_before+1].innerHTML;
							trList[pos_before+1].innerHTML=trList[pos_now+1].innerHTML;
							trList[pos_now+1].innerHTML=tempNode.innerHTML;

							//更新表的内容
							temp=oldList[pos_before];
							oldList[pos_before]=oldList[pos_now];
							oldList[pos_now]=temp;
						}
					}
				}

				
		},false);//event Listener

		return divNode;
	}

	function addArrowDown(tdNode){
		var divNode=document.createElement('div');
		divNode=addArrow(divNode,true);
		divNode.style.borderTop ="10px solid #fff";
		divNode.style.top = "30px";
		tdNode.appendChild(divNode);
	}

	function addArrowUp(tdNode){
		var divNode = document.createElement('div');
		divNode = addArrow(divNode,false);
		divNode.style.borderBottom ="10px solid #fff";
		divNode.style.top = "14px";
		tdNode.appendChild(divNode);
	}	

}

//样式和HTML创建节点封装在一起 good or bad?
function addTd(rowNode,contentList){
	var tdNode;
	for(var i=0;i<config.colNum;i++){
		tdNode=document.createElement('td');
		tdNode.innerHTML=contentList[i];
		tdNode.style.width=config.tdWidth;
		tdNode.style.height = config.tdHeight;
		tdNode.style.border = config.border;
		tdNode.style.position = "relative";
		rowNode.appendChild(tdNode);

	}
	return rowNode;
}

function addTr(){
	var trNode;
	for(var i=0;i<config.rowNum-1;i++){
		trNode=document.createElement('tr');
		trNode=addTd(trNode,config.trContent[i]);
		tab.appendChild(trNode);
	}
}

}());