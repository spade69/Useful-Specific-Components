/************
1.在页面中完成两个单选框，切换单选框的不同选项时下方显示的表单随之切换。
2.当选择在校生时，出现两个select下拉菜单，一个选择城市，一个选择学校，
3.当选择非在校生时，出一个文本输入框

4.学校下拉菜单里的学校名单均为城市下拉菜单中所选的城市中的大学，当城市发生变化时，学校一起发生变化

注：城市及学校的数据随意编造即可，无需真实完整
Author:Jason
Date:2016/06/06
*******/
// 跨浏览器兼容的工具函数

//Jquery
$=function(e1){
	return document.querySelector(e1);
}


var school={
	"北京":["清华大学","北京大学","北京航空航天","北京师范大学"],
	"上海":["同济大学","上海交大","复旦大学"],
	"杭州":["浙江大学","杭州电子科技大学","浙江工业大学"]
};


//switch form
function sform(element)
{
	if(element.id==="inSchool"){
		var din=$("#din");
		var doff=$("#doff");
		doff.style.display="none";
		din.style.display="block";
		var select=$("#select1");
		select.innerHTML="";

		select.innerHTML="<option value='bj'>北京</option><option value='sh'>上海</option><option value='hz'>杭州</option>";
		var selected=select.options[select.selectedIndex].text;
		corresponding(selected);
	}
	else{
		var doff=$("#doff");
		var din=$("#din");
		doff.style.display="block";
		din.style.display="none";
		var select=$("#select1");
		doff.innerHTML="";

		var text=document.createTextNode("就业单位");
		var tarea=document.createElement("input");
		tarea.type="text";
		doff.appendChild(text);
		doff.appendChild(tarea);

	}

}

//used for switch city
function vswitch(){
	var select=$("#select1");
	var selected=select.options[select.selectedIndex].text;
	corresponding(selected);
}

//print the school
function corresponding(city){
	var list=school[city];
	//var selectx=document.createElement("select");
	var selectx=$("#selectx");
	var din=$("#din");
	selectx.innerHTML="";
	for(var i=0;i<list.length;i++){
		var opt=document.createElement("option");
		opt.text=list[i];
		selectx.appendChild(opt);
	}
	din.appendChild(selectx);
}


//switch the student type
function radioChange(){
	var radio=$("#inSchool");
	var radiox=$("#offSchool");
	if(radio.checked){
		sform(radio);
	}
	else{
		sform(radiox);
	}
}

//初始化
var radio=$("#inSchool");
sform(radio);