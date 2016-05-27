	//刷新队列button
	function refresh(){
		var div=document.getElementById("div");
		//刷新操作！删除所有childnode！
		for(var k=div.childNodes.length-1;k>0;k--){
			div.removeChild(div.childNodes[i]);
		}
		
		for(var i=0;i<arr.length;i++){
			var bt=document.createElement("button");
			var bt_txt=document.createTextNode(arr[i]);
			bt.appendChild(bt_txt);
			div.appendChild(bt);
		}
	}