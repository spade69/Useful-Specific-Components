//math.js

//定义一个模块
// 如果这个模块还依赖其他模块，那么第一个参数必须是一个数组，指明该模块的依赖性
define(function(){
	var add=function(x,y){
		return x+y;
	};
	return {
		add:add
	};
});

