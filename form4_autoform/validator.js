/**
 * Created by Jason on 16/6/17.
 */

 //存放各个类型的验证函数



//选择器
$=function(e1){
	return document.querySelector(e1);
}

//实现在String的原型里面,即往原型增加了一个新的共享方法
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



//封装属性,这个构造函数意义不大,为什么封装的用不了？
function vform(namex,passwd,xpass,mail,phone,btn){
	this.btn=btn;
	this.namex=namex;
	this.check=new Array(false,false,false,false,false);
	
}
var inputEles=[$("#name"),$("#passwd"),$("#xpasswd"),$("#mail"),$("#phone"),$("#verify")];
//原型

//vform.prototype.check=[false,false,false,false,false];

vform.prototype={
	constructor:vform, //构造函数
	flag:0,
	//check:[false,false,false,false,false],

	vName:function(info){
		
		var xnnn=inputEles[0];
		var arg=this.check;

		function handle(arg){
		var text=xnnn.value.trim();
		var reaLen=text.glen();
		arg[0]=false;
		if(reaLen<1||text==""){
			xnnn.style.borderColor="red";
			info.innerHTML="<span style='color:red'>输入不能为空</span>";

				//return;
		}
		else if(reaLen<4||reaLen>16){
			xnnn.style.borderColor="red";
			info.innerHTML="<span style='color:red'>请检查名称的</span>";
		}
		else{
			arg[0]=true;
			xnnn.style.borderColor="green";
			info.innerHTML="<span style='color:green'>名称格式正确</span>";
		}

		}//handle

		addEvent(xnnn,'blur',function(){handle(arg);});
		addEvent(xnnn,'focus',function(){
		info.innerHTML="<span style='color:gray'>必填，长度为4~16字符</span>";
		});
		
	},

	vPasswd:function(icode){
		//var code=$("#passwd");
		var code=inputEles[1];
		var arg=this.check;

		function handle(arg){
			var text=code.value.trim();
			arg[1]=false;
			if(text.length<1||text===""){
				code.style.borderColor="red";
				icode.innerHTML="<span style='color:red'>输入不能为空</span>";
			}   
			else if(text.match(/^[a-zA-Z0-9]{6,16}$/))
			{
				arg[1]=true;
				code.style.borderColor="green";
				icode.innerHTML="<span style='color:green'>密码格式正确</span>";
				flag=1;
			}
			else{
				code.style.borderColor="red";
				icode.innerHTML="<span style='color:red'>请输入6-16位字符且只能为数字和字母</span>";
			}
		}

		addEvent(code,'blur',function(){handle(arg);});

		addEvent(code,'focus',function(){
		icode.innerHTML="<span style='color:gray'>6~16位数字和字母</span>";
		});
	},

	vPassx:function(dcodex){
		//var xcode=$("#xpasswd");
		var xcode=inputEles[2];
		var fcode=inputEles[1];
		var arg=this.check;
		function handle(arg){
			var text=xcode.value.trim();
			var ftext=fcode.value.trim();
			arg[2]=false;
			if(text.length<1||text===""){
				xcode.style.borderColor="red";
				dcodex.innerHTML="<span style='color:red'>输入不能为空</span>";
			}
			else if(text===ftext&&flag===1){//&&flag===1
				arg[2]=true;
				xcode.style.borderColor="green";
				dcodex.innerHTML="<span style='color:green'>密码正确</span>";
			}
			else{
				xcode.style.borderColor="red";
				dcodex.innerHTML="<span style='color:red'>两次输入的密码要相同</span>";
			}

		}

		addEvent(xcode,'blur',function(){handle(arg);});
		addEvent(xcode,'focus',function(){
		dcodex.innerHTML="<span style='color:gray'>重复输入密码</span>";
		});
	},

	vmail:function(dmail){
		var xmail=inputEles[3];
		var arg=this.check;

			function handle(arg){
			var str=xmail.value.trim();
			var reg=new RegExp('^([a-zA-Z0-9_\.\-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$','i');
			arg[3]=false;
			if(str.length<1||str===""){
				xmail.style.borderColor="red";
				dmail.innerHTML="<span style='color:red'>输入不能为空</span>";
			}
			else if(str.match(reg)){
				arg[3]=true;
				xmail.style.borderColor="green";	
				dmail.innerHTML="<span style='color:green'>邮箱格式正确</span>";
			}
			else{
				xmail.style.borderColor="red";
				dmail.innerHTML="<span style='color:red'>邮箱格式错误</span>";
			}
		}

			addEvent(xmail,'blur',function(){handle(arg);});
			addEvent(xmail,'focus',function(){
			dmail.innerHTML="<span style='color:gray'>exampleh@hah.com</span>";
			});
		
	},

	vphone:function(dphone){
		var xphone=inputEles[4];
		var arg=this.check;
			function handle(arg){
			var str=xphone.value.trim();
			arg[4]=false;
			if(str.length<1||str===""){
				xphone.style.borderColor="red";
				dphone.innerHTML="<span style='color:red'>输入不能为空</span>";
			}
			else if(str.match(/0?(13|14|15|18)[0-9]{9}/)){
				arg[4]=true;
				xphone.style.borderColor="green";	
				dphone.innerHTML="<span style='color:green'>电话格式正确</span>";
			}
			else{
				xphone.style.borderColor="red";
				dphone.innerHTML="<span style='color:red'>电话格式错误</span>";
			}
		}

			addEvent(xphone,'blur',function(){handle(arg);});
			addEvent(xphone,'focus',function(){
			dphone.innerHTML="<span style='color:gray'>请输入11位手机号码</span>";
			});
	},

	vbtn:function(){
		var arg=this.check;
		var xbtn=inputEles[5];
		function handle(arg){
			var flagx=1;
			for(var i=0;i<5;i++){
				if(arg[i]===false)
				{
					flagx=0;
					break;
				}
			}

			if(flagx)
			{
				alert("格式正确,提交成功！");
			}
			else
			{
				alert("提交失败，请重新输入");
			}
		}

		addEvent(xbtn,'click',function(){handle(arg);});

	}

};


/*********************************************************************************/
var name=document.getElementById("name");
var passwd=document.getElementById("passwd");
var xpass=document.getElementById("xpasswd");
var mail=document.getElementById("mail");
var phone=document.getElementById("phone");

var info=document.getElementById("d1");
var icode=document.getElementById("dcode");
var xcode=$("#dcodex"),dmail=$("#dmail"),dphone=$("#dphone");

var btn=document.getElementById("verify");


var exform=new vform(name,passwd,xpass,mail,phone,btn);//没有意义
//var exform=new vform({namex:name,passwd:passwd,xpass:xpass,mail:mail,phone:phone,btn:btn});

exform.vName(info);
exform.vPasswd(icode);
exform.vPassx(xcode);
exform.vmail(dmail);
exform.vphone(dphone);
exform.vbtn();

var fuck=exform.check;
alert(fuck[0]);
fuck[0]=true;
alert(exform.check[0]);