	/************
	描述:两个需求：Tag输入和兴趣爱好输入
	如示例图，实现一个tag输入框
	1.要求遇到用户输入空格，逗号，回车时，都自动把当前输入的内容作为一个tag放在输入框下面。
	2.Tag不能有重复的，遇到重复输入的Tag，自动忽视。
	3.每个Tag请做trim处理
	4.最多允许10个Tag，多于10个时，按照录入的先后顺序，把最前面的删掉
	5.当鼠标悬停在tag上时，tag前增加删除二字，点击tag可删除
	
	如示例图下方，实现一个兴趣爱好输入的功能
	6.通过一个Textarea进行兴趣爱好的输入，可以通过用回车，逗号（全角半角均可），顿号，空格（全角半角、Tab等均可）等符号作为间隔。
	7.当点击“确认兴趣爱好”的按钮时，将textarea中的输入按照你设定的间隔符，拆解成一个个的爱好，显示在textarea下方
	8.爱好不能重复，所以在下方呈现前，需要做一个去重 (for in ? )
	9.每个爱好内容需要做trim处理
	10最多允许10个兴趣爱好，多于10个时，按照录入的先后顺序，把最前面的删掉
	
	实质是对称的要求。
	
	Author:Jason
	Date:2016/06/01
	*******/
	var arr1=new Array();//button tags of tag input
	var arr2=new Array(); //button tags of interests
	
	$=function(e1){
		return document.querySelector(e1);
	} //模仿jQuery	
	//处理每次输入一个tage。
	function taghandle(){
		var str=$('#tag').value.trim();//we need the value of this text
		if(event.keycode==13||event.keycode==188||event.keycode==32)
		var arrWord=str.split(/,|，|、|\s|\n|\r|\t/);//以这几个符号为分隔符
		});
		
		
		refresh(); //
	}
	
	//
	//$()

	//刷新队列button div_tag
 	function refresh(){
		var div=document.getElementById("tags");
		//刷新操作！删除所有childnode！
		for(var k=div.childNodes.length-1;k>0;k--){
			div.removeChild(div.childNodes[k]);
		}
		
		
		for(var tagx in arr){
			var bt=document.createElement("button");
			bt.setAttribute("id",i);//不能重复喔
			var bt_txt=document.createTextNode(arr[i]);
			bt.appendChild(bt_txt);
			div.appendChild(bt);
			
		
		}
		
		
		if(arr.length>10)
		{
			alert("Your queue's elements over than 60! Illegal");
			arr.shift();//移除第一个元素
			return;
		}
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

	
	
	
	
		
	