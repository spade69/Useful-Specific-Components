/**
 * aqiData，存储用户输入的数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 Author Jason
 Date 2016/9/2
 */

define(['EventUtil'],function(EventUtil){
var aqiData={};
var list={
	/**
	 * 从用户输入中获取数据，向aqiData中增加一条数据
	 * 然后渲染aqi-list列表，增加新增的数据
	 */
	 //aqiData:[],
	 //可以define为模块,html 对应Label  name 和 value

	addAqiData:function(name,value) {
		var in_city=document.getElementById(name);
		var in_weather=document.getElementById(value);
		var cityname=in_city.value;
		var weather=in_weather.value;
		

		if(!cityname.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){//正则表达式
			alert("名字必须为中英文字符");
			return;
		}
		if(!weather.match(/^\d+$/)){
			alert("必须为整数！");
			return;
		}
		
		//dataset for key in来遍历
		aqiData[cityname]=weather;
		
	},

	/**
	 * 渲染table表格
	 */
	 //渲染表格，怎么抽象出一个通用的刷新表格模块？
	renderAqiList:function(table,items) {
		var aqi_table=document.getElementById(table);
		//var tr=document.getElementsByTagName("tr");
		for(var i=aqi_table.childNodes.length-1;i>0;i--){
			aqi_table.removeChild(aqi_table.childNodes[i]);
		}
		
		
		var tr_intial=document.createElement("tr");
		//var items="<td>城市</td>"+"<td>空气质量</td>"+"<td>操作</td>";
		tr_intial.innerHTML=items;
		aqi_table.appendChild(tr_intial);
		
		
		for(var city in aqiData){
			items+="<tr><td>"+city+"</td>"+"<td>"+aqiData[city]+"</td>"+"<td><button>删除</button></td>";
			
		}
		//就能刷新出空的表格了！
		aqi_table.innerHTML=city?items:"";
		
	},

	/**
	 * 点击add-btn时的处理逻辑
	 * 获取用户输入，更新数据，并进行页面呈现的更新
	 */
	addBtnHandle:function (name,value,table,items) {
	  list.addAqiData(name,value);
	  list.renderAqiList(table,items);
	},


	 //delBtnHandle 依赖  EventUtil, table需要符合一定的格式,必须是<tr>包括一行的内容
	delBtnHandle:function(btn,tablex,items){
	  // do sth.
		var del=document.getElementsByTagName(btn);
		var table=document.getElementById(tablex);
		
		
		//表格添加一个事件调用editcell函数。 editcell函数就判断事件
		EventUtil.addHandler(table,"click",function(event){
		var target=EventUtil.getTarget(event);
			
			if(target.tagName.toLowerCase()=="button")
			{
					//alert("yes");
				//如何通过捕捉这个事件来删除数组aqi-data的数据 
				var item=target.parentNode.parentNode;//tr
				var show=item.childNodes[0].textContent;//tagName
		
				for(var city in aqiData){
					if(city==show)
					{
						//alert("yes");
						//aqiData[i].splice(0,3);
						delete aqiData[city];
						list.renderAqiList(tablex,items);
					}
				}
				
				
			}
		});
		
		list.renderAqiList(tablex,items);
	},

	

};
	return {
		list:list,
		aqiData:aqiData
	}
});

	/**
		删除的是aqiData中的数据~ 因为后面还要调用renderAqiList渲染
	 * 点击各个删除按钮的时候的处理逻辑,用事件代理！
	 * 获取哪个城市数据被删，删除数据，更新表格显示
	 	
		一个处理逻辑：
		function editCell(e){
			var taget=EventUtil.getTarget(e);
			if(taget.tagName.toLowerCase()=='button')
			{
					alert("yes");
			}
		}
	 
	 */