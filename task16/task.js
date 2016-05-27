/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData =new Array();

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var in_city=document.getElementById("aqi-city-input");
	var in_weather=document.getElementById("aqi-value-input");
	var cityname=in_city.value;
	var weather=in_weather.value;
	
	if(!cityname.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){//正则表达式
		alert("城市名字必须为中英文字符");
		return;
	}
	if(!weather.match(/^\d+$/)){
		alert("必须为整数！");
		return;
	}
	
	//aqiData.push([cityname,": ",weather]);
	//dataset for key in来遍历
	aqiData[cityname]=weather;
	
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var aqi_table=document.getElementById("aqi-table");
	//var tr=document.getElementsByTagName("tr");
	for(var i=aqi_table.childNodes.length-1;i>0;i--){
		aqi_table.removeChild(aqi_table.childNodes[i]);
	}
	
	
	var tr_intial=document.createElement("tr");
	tr_intial.innerHTML="<td>城市</td>"+"<td>空气质量</td>"+"<td>操作</td>";
	aqi_table.appendChild(tr_intial);
	
	
	var items="<td>城市</td>"+"<td>空气质量</td>"+"<td>操作</td>";
	
	for(var city in aqiData){
		items+="<tr><td>"+city+"</td>"+"<td>"+aqiData[city]+"</td>"+"<td><button>删除</button></td>";
		
	}
	//就能刷新出空的表格了！
	aqi_table.innerHTML=city?items:"";
	
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

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
function delBtnHandle() {
  // do sth.
	var del=document.getElementsByTagName("button");
	var table=document.getElementById("aqi-table");
	

	
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
					renderAqiList();
				}
			}
			
			
		}
	}
	);
	
	renderAqiList();
}

function init() {
	var aqi_table=document.getElementById("aqi-table");
	var a_tr=document.createElement("tr");
	var td1=document.createElement("td");
	var td1_text=document.createTextNode("城市");
	td1.appendChild(td1_text);
	
	var td2=document.createElement("td");
	var td2_text=document.createTextNode("空气质量");
	td2.appendChild(td2_text);
	
	var td3=document.createElement("td");
	var td3_text=document.createTextNode("操作");
	td3.appendChild(td3_text);
	
	aqi_table.appendChild(a_tr);
	a_tr.appendChild(td1);
	a_tr.appendChild(td2);
	a_tr.appendChild(td3);

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	var add=document.getElementById("add-btn");
	var mydiv=document.getElementById("mydiv");
	//add.onclick=addBtnHandle;// 用代理?
	add.addEventListener("click",addBtnHandle,false);
	
	
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	delBtnHandle();
}

init();
