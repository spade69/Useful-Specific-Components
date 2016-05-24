/*******
需求：
以自然周（周一到周日）为粒度，统计一周7天的平均数为这一周的空气质量数值，如果数据中缺少一个自然周的几天，则按剩余天进行计算
月：以自然月为粒度，统一一个月所有天的平均数为这一个月的空气质量数值。

天的话直接传就行了，周和月就要算平均数

******/

/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {//91个数据 3个月，
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData; //这是一个数组， 这里数据存储也是用了名值对，即哈希，键值对 
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
	var chart=document.getElementById("aqi-chart-wrap");
	//需要判断浏览器是否支持canvas元素
	context=chart.getContext("2d");//传入上下文的名字，2d即2D上下文对象！
	//if(context){}
	
	var length_X=500,length_Y=300;//图片横纵长度
	var  baseX=60,baseY=50, //横轴纵轴对应绘制的起点坐标
		rightX=baseX+length_X, //横轴对应的坐标
		leftY=length_Y+baseY;//纵轴对应的坐标
	
	//绘制Y轴
	context.moveTo(baseX,baseY);
	context.lineTo(baseX,leftY);
	//绘制Y轴箭头
	
	context.moveTo(baseX,baseY);
	context.lineTo(baseX+5,baseY+10);
	context.moveTo(baseX,baseY);
	context.lineTo(baseX-5,baseY+10);
	
		//绘制X轴
	context.moveTo(baseX,leftY);
	context.lineTo(rightX,leftY);
	//绘制X轴箭头
	
	context.moveTo(rightX,leftY);
	context.lineTo(rightX-5,leftY-5);
	context.moveTo(rightX,leftY);
	context.lineTo(rightX-5,leftY+5);
	
	
	context.strokeStyle='black'; //绘制颜色
	context.stroke();
	context.font="bold 16px sans-serif";//设置画布字体
	context.fillText("Weather",0,leftY/2);
	context.fillText("Date",rightX/2,leftY+50);
	
	
	context.fillRect(baseX+5,leftY,10,-200);
	context.fillRect(baseX+50,leftY,10,-200);
	
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 

  // 设置对应数据,根据数据来渲染图表，不同数据对应不同的渲染方法.

  // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 

  // 设置对应数据,这个只需要切换aqiSourceData的key。

  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项

  // 给select设置事件，当选项发生变化时调用函数citySelectChange

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中, 日 周 月提取出来
	var week={},count=0,singleWeek={},
		month={},mcount=0,singleMonth={};
	var day={};	
		
	for(var key in aqiSourceData)
	{
		var tempCity=aqiSourceData[key];
		var keyArr=Object.getOwnPropertyNames(tempCity) ;//keyArr
		var tempMonth=keyArr[0].slice(5,7);//获取月份，其实换成Date对象处理也没什么效率提高
		var weekInit=4,weekCount=0;
		
		for(var i=0;i<keyArr.length;i++,weekInit++){//all date
			count+=tempCity[keyArr[i]];//按日累计的总天气值
			mcount+=tempCity[keyArr[i]];//每过一个月清空一次
			weekCount++;//每过一周清空一次
			
			//对周处理，weekinit能整除7就到一周了，或者月份改了也是一周，或者循环结束
			if((weekInit+1)%7==0||i==keyArr.length-1||keyArr[i+1].slice(5,7)!==tempMonth){
				//又新建一个名值对  2016-01月第X周 
				var tempkey=keyArr[i].slice(0,7)+"月第"+(Math.floor(weekInit/7)+1)+"周";
				singleWeek[tempkey]=Math.floor(count/weekCount);
				
				if(i!=keyArr.length-1&&keyArr[i+1].slice(5,7)!==tempMonth){
					weekInit=weekCount%7;//不等的话就等下一次，这种清空一般是满足了下一个月，但未够一周
				}
				count=0;
				weekCount=0;
			}
			//对月份处理
			if(i==keyArr.length-1||keyArr[i+1].slice(5,7)!==tempMonth){
				tempMonth=(i==keyArr.length-1)?keyArr[i].slice(5,7):keyArr[i+1].slice(5,7);
				var tempMKey=keyArr[i].slice(0,7);
				var tempDays=keyArr[i].slice(-2);
				singleMonth[tempMKey]=Math.floor(mcount/tempDays);
				mcount=0;
			}
			
		}
		week[key]=singleWeek;
		month[key]=singleMonth;
		singleWeek={};
		singleMonth={};
	}
	//处理好的数据存到chartData
	chartData.day=aqiSourceData;//每日数据都是直接存就好。
	chartData.week=week;
	chartData.month=month;
	
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}
renderChart();
initAqiChartData();
//init();