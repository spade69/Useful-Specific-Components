	//刷新队列button
	//AMD requirejs 模块
//无依赖模块  refreshx 是 id？ 可以加或不加，不加就是默认为文件名
	define("refresh",function(refresh){
		return function(id,arr){
		var fdiv=document.getElementById(id);
		alert(fdiv);
		//刷新操作！删除所有childnode！
		if(!fdiv.hasChildNodes())
			return;
		for(var k=fdiv.childNodes.length-1;k>0;k--){
			fdiv.removeChild(fdiv.childNodes[k]);
		}
		
		for(var i=0;i<arr.length;i++){
			var bt=document.createElement("button");
			var bt_txt=document.createTextNode(arr[i]);
			bt.appendChild(bt_txt);
			fdiv.appendChild(bt);
		}
		}//return 
	});
	