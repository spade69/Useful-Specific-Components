	/************
在页面中实现一个输入框与按钮，要求点击验证按钮后，对输入框中内容进行格式校验，并在其下方显示校验结果
校验规则：
1.字符数为4~16位
2.每个英文字母、数字、英文符号长度为1
3.每个汉字，中文符号长度为2
	
	Author:Jason
	Date:2016/06/02
	*******/

//实际测试JavaScript默认情况下中文和英文字符都是一个字符长度。 如： "日" 和 "a" 是一个字符长度
//以下函数实现字符长度，中文占两个，英文占1个

//Method 1: 实现成一个函数
function calLen(str){
    var len=0;
    for(var i=0;i<str.length;i++){
    	var c=str.charCodeAt(i);
    	//单字节加1
    	if((c>=0x0001&&c<=0x007e)||(c>=0xff60&&c<=0xff9f)){
    		len++;
    	}
    	else{
    		len+=2;
    	}
    }
    return len;
	    
}

//Method2 ；实现在String的原型里面,即往原型增加了一个新的共享方法
String.prototype.glen=function(){
	var len=0;
	for(var i=0;i<this.length;i++){
		if(this.charCodeAt(i)>127||this.charCodeAt(i)==94){
			len+=2;
		}
		else{
			len++;
		}
	}
	return len;
}




addEvent(document.getElementById("verify"),'click',function(){
	var minput=document.getElementById("name");
	var text=minput.value.trim();//标准化处理 value.trim()
	//按优先级提示，先判断长度是否为空然后判断是否符合标准。

	//var reaLen=calLen(text);
	var reaLen=text.glen();

	if(reaLen<1||text=="")
	{
		var info=document.getElementById("info");
		minput.style.borderColor="red";
		info.innerHTML="<span style='color:red'>长度不能为空，长度为4~16字符</span>";
		return;
	}
	else if(reaLen<4||reaLen>16){
		var info=document.getElementById("info");
		minput.style.borderColor="orange";
		info.innerHTML="<span style='color:orange'>当前长度为:<em>"+reaLen+"</em></span>"+" "+"<span style='color:orange'>长度应该为4~16字符</span>";
		//return;
	}
	else{
		var info=document.getElementById("info");
		minput.style.borderColor="green";
		info.innerHTML="<span style='color:green'>名称格式正确</span>";
	}

});



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
	