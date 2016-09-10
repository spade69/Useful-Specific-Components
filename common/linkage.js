/************
1.在页面中完成两个单选框，切换单选框的不同选项时下方显示的表单随之切换。
2.当选择在校生时，出现两个select下拉菜单，一个选择城市，一个选择学校，
3.当选择非在校生时，出一个文本输入框
4.学校下拉菜单里的学校名单均为城市下拉菜单中所选的城市中的大学，当城市发生变化时，学校一起发生变化

Author:Jason
Date:2016/06/06

ver 1.0
Modified:Jason
Date:2016/09/02

*******/


define(['useful'],function(useful){
//switch form
return {
		//print the school
	corresponding:function(school,city,din){
		var list=school[city];
		if(!din.hasChildNodes())
			return;
		//每次只是更新最后一个,selectx更新
		din.removeChild(din.childNodes[din.childNodes.length-1]);
		var selectx=document.createElement("select");
//		selectx.innerHTML="";//empty
		for(var i=0;i<list.length;i++){
			var opt=document.createElement("option");
			opt.text=list[i];
			selectx.appendChild(opt);
			//selectx.innerHTML+=opt;
		}
		din.appendChild(selectx);
	},
	sform:function(element,school,din,doff,select)
	{
	
		if(element.id==="inSchool"){

			doff.style.display="none";
			din.style.display="block";
			//var select=$("#"+select);
			select.innerHTML="";

			select.innerHTML="<option value='bj'>北京</option><option value='sh'>上海</option><option value='hz'>杭州</option>";
			var selected=select.options[select.selectedIndex].text;
			//console.log(this);
			this.corresponding(school,selected,din);//this 
		}
		else{

			doff.style.display="block";
			din.style.display="none";
			//var select=$("#"+select);//select1
			doff.innerHTML="";

			var text=document.createTextNode("就业单位");
			var tarea=document.createElement("input");
			tarea.type="text";
			doff.appendChild(text);
			doff.appendChild(tarea);

		}

	},
	//used for switch city
	vswitch:function(school,select,din){
		//var select=$("#select1");
		var selected=select.options[select.selectedIndex].text;
		this.corresponding(school,selected,din);
	},

	//switch the student type
	radioChange:function(radio,radiox,school,din,doff,select){
	
			if(radio.checked){
				this.sform(radio,school,din,doff,select);
			}
			else{
				this.sform(radiox,school,din,doff,select);
			}
	}
}//Directly return object
});

