//面向对象编程代码结构：
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
	Date:2016/06/02
	*******/
var createTag=(function(){
	
	function _tag(input,output,button){
		//private var
		var numberx; //记录tag 个数
		//privilege method
		this.getNumber=function(){
			return numberx;
		};
		this.setNumber=function(newNumber){
			numberx=newNumber;
		};
		//属性，构造函数中定义的
		this.input=document.getElementById(input);//input is a string (id)
		this.output=document.getElementById(output);
		this.button=document.getElementById(button);
		
		//获取数据，分别是tag和 textarea
		this.getData=function(){
			switch(input){ //input 可能是 tag 也可能是 textarea
				case 'tag':
					var val=this.input.value.match(/(^[^,\，]*)/)[0] ;//匹配这几个字符以外的
					break;
				case 'txtarea':
				default:
					var val=this.input.value.trim().split(/,|，|、|\s|\n|\t/);
			}
			return val;
		}
		
		//增加标签元素
		this.render=function(val){
			if(val==''||val==','||val=='，'){
				return;
			}
			var wrap=document.createElement("button");
			wrap.textContent=val;
			//var b_tx=document.createTextNode(val);
			//wrap.appendChild(b_tx);
			this.output.appendChild(wrap);
			numberx++;
		};
		
		//构造器
		this.setNumber(0);
		//初始化
		this.button?this.init("buttonEvent"):this.init("keyEvent");
		
		
	}
	
	/**************
	构造
	*原型方法
	********************************/
	_tag.prototype={
	
		//检测输入数据是否重复
		// * @param {String} - data 输入的数据
		//* @return {Boolean} - 数据是否重复
		repeatData:function(data){
			for(var i=0;i<this.output.children.length;i++){
				if(this.output.children[i].textContent.localeCompare(data)===0){
					this.input.value='';
					this.setNumber(this.output.children.length);//设置为长度
					return true;
				}
			}
		},
	
		//删除特定的数据
		//@param {HTMLDOMElement} ele 
		delData:function(ele){//delete data 就直接删除所有子元素即可、
			this.output.removeChild(ele);
			this.setNumber(this.output.children.length);
		},
		
		/****
		 根据情况选择不同的初始化方式
		******/
		
		init:function(type){
			var self=this;
			/*
			this.output.addEventListener("mouseover",function(event){
				event.target.textContent='删除：'+event.target.textContent; //鼠标移动上去就会显示删除
				
			});
			
			this.output.addEventListener("mouseout",function(event){
				event.target.textContent=event.target.textContent.replace(/删除:/,'');//把删除替换为''
			});*/
			this.output.addEventListener("click",function(event){
				self.delData(event.target);
			});
			
			switch(type){
				case 'keyEvent':
				document.addEventListener('keyup',function(event){
					//正则表达式 字面量： /(,||\,)$/
					if(event.keyCode==188||event.keyCode==32||event.keyCode===13){
						//console.log(self.getData());
						self.repeatData(self.getData().trim())||self.render(self.getData().trim());
						self.input.value='';
						//不能超过10
						if(self.getNumber()>10){
							self.delData(self.output.firstChild);
						}
					}
				});
				break;
				
				case 'buttonEvent':
				self.button.addEventListener('click',function(){
					for(var i=0;i<self.getData().length;i++){
						self.repeatData(self.getData()[i])||self.render(self.getData()[i]);
						if(self.getNumber()>10){
							self.delData(self.output.firstChild);
						}
					}
				});
				break;
			}
			
		}
	}; //prototype
	
	return _tag;
})(); // 此处就算执行了这个函数 ，函数表达式。。。


//实例化 tag 
var tag=new createTag('tag','tags');
var hobby=new createTag('txtarea','interests','confirm');

