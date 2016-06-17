/************
实现以JavaScript对象的方式定义表单及验证规则
表单配置参考示例如下：（不需要一致，仅为参考）

    {
        label: '名称',                    // 表单标签
        type: 'input',                   // 表单类型
        validator: function () {...},    // 表单验证规
        rules: '必填，长度为4-16个字符',    // 填写规则提示
        success: '格式正确',              // 验证通过提示
        fail: '名称不能为空'               // 验证失败提示
    }
基于该配置项，实现一套逻辑，可以自动生成表单的展现、交互、验证
使用你制作的表单工厂，在一个页面上创建两套样式不同的表单

Author:Jason
Created by LinZhida
Date:2016/06/013
*******/
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

//Jquery
$=function(e1){
	return document.querySelector(e1);
}



function prevent(event){
	if(event.keyCode==13){
	//alert("fuck");
	return false;
	}
}

//switch form
function sform(element)
{


}

//switch the student type
function radioChange(){
	var item=$('#form_type').getElementsByTagName('input');
	var xlen=$('#length');	
	xlen.style.top="240px";
	for(var i=0;i<item.length;i++){
		if(item[i].checked){
			switch(item[i].value){
				case 'input':
				$('#form_box').style.display="none";
				$('#rule').style.display="block";
				$('#length').style.display="none";
				break;
				case 'single':
				case 'multi':
				case 'select':
				$('#form_box').style.display="block";
				$('#rule').style.display="none";
				$('#length').style.display="none";
				break;

				case 'textarea':
				$('#form_box').style.display="none";
				$('#rule').style.display="none";
				$('#length').style.display="block";
				break;
			} 
		}
	}
}

//used for switch radio
function ruleradio(){
	var item=$('#rule').getElementsByTagName('input');
	for(var i=0;i<item.length;i++){
		if(item[i].checked){
			var xlen=$('#length');	
			if(item[i].value==="msg"||item[i].value==="passwd")
			{
				
				xlen.style.display="block";
				xlen.style.top="300px";
			}
			else{
				xlen.style.display="none";
				xlen.style.top="240px";
			}
		}
	}
}


//initialize module
radioChange();
$('#form_type').addEventListener('change',radioChange);
//radioChange();
$('#rule').addEventListener('change',ruleradio);
//实例化 tag 
var xtag=new createTag('tag','tags');
