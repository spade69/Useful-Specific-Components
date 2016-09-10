/**************
 * 方法:createComparsionFunction
 * 输入：propertyName属性名
 * 返回：1，-1,0 （详情见Array sort() api）
 * 实现对一个对象数组，根据这个对象的某个属性进行排序
 * 作为传递给sort()方法的参数。
 *Author:Jason
 *Date:2016/05/23
****************************/
//requireJS  AMD Module 

define(function(){
	var compare=function(propertyName){
		return function(object1,object2){
			var value1=object1[propertyName];
			var value2=object2[propertyName];
			
			if(value1<value2){
				return -1;
			}else if(value1>value2){
				return 1;
				
			}else{
				return 0;
			}
		};
		
	};
	return{
			compare:compare
	};
});


