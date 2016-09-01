/**************
 * 方法:sortAqiData(data)
 * 输入：data_一个二维数组。 i第几个元素
 * 返回：Number数值，根据它是正数 负数 or 0来排序（详情见Array sort() api）
 * 实现对一个二维数组，根据这个数组的第i个元素进行排序
 * 作为传递给sort()方法的参数。
 
 例如：  
  data = [
    ["北京", 90],
    ["上海", 70]
    ……
  ]
  我们可以根据 第二个元素的值进行排序 即i=1
  
 *Author:Jason
 *Date:2016/05/23
****************************/

define(function(){
	var sortAqiData=function(data,i) {
		
		data.sort(function(a,b){
			if(a.length>1&&b.length>1){
				var tmp=a[i]-b[i];
				return tmp;
			}
		
			else{
				return a-b;
			}
		});
	};
	return{
		sortAqiData:sortAqiData
	};
});