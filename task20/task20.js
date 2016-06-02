	/************
	描述
	基于任务18进行升级
	将新元素输入框从input改为textarea
	允许一次批量输入多个内容，格式可以为数字、中文、英文等，可以通过用回车，
	逗号（全角半角均可），顿号，空格（全角半角、Tab等均可）等符号作为不同内容的间隔
	增加一个查询文本输入框，和一个查询按钮，当点击查询时，
	
	将查询词在各个元素内容中做模糊匹配，将匹配到的内容进行特殊标识，
	如文字颜色等。举例，内容中有abcd，查询词为ab或bc，则该内容需要标识
	
	
	边界：非法输入，只允许输入10-100数字。 还是采取id的方式才能删除指定的button
	
	Author:Jason
	Date:2016/05/30
	*******/
	var arr=new Array();
	$=function(e1){
		return document.querySelector(e1);
	} //模仿jQuery	
	$("#insert").onclick=function(){
		var str=$('#txtarea').value.trim();
		var arrWord=str.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(e){
			if(e!=null&&e.length>0){
				return true;
				
			}
			else{
				return false;
			}
		});
		arr=arr.concat(arrWord);//把字符串连接在一起。
		
		render(); //
	}
	
	//
	//$()
	$('#query').onclick=function(){
		var strx=$('#search').value.trim();
		//alert(strx);
		render(strx);
	}
	
	
	function render(str){ ///匹配字符并显示 or bu匹配直接显示
		$('#result').innerHTML=arr.map(function(d){
			if(str!=null&&str.length>0){
				//replace查询到的内容(用正则表达式查询)，然后替换为后面的参数。
				d=d.replace(new RegExp(str,"g"),"<span class='select'>"+str+"</span>");
				
			}
			return '<div>'+d+'</div>';
		}).join('');
	}

	
	/* 
	a=new Array(1,2,3,"testing");
	s=a.join("");
	alert(s);
	*/
	
	var a=[1,2,3];
	var s=a.concat(4,[5,3],[3,[6,7]]);
	//alert(s);
	
	
	
	//事件代理实现点击一个删除一个，使用splice()删除数组元素
	
	