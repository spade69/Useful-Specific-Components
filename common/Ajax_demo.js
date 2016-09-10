/**
Jquery Ajax& Javascript
Author: Jason
**/

//Jquery $.ajax
var jqxhr = $.ajax({
  url: url,
  type: "GET",      // 默认值GET，可根据需要配置
  cache: true,      // 默认值true, dataType是'script'或'jsonp'时为false，可根据需要配置
  data: {},         // 请求参数对象
  dataType: "json", // 设置数据类型
  jsonp: "callback",// 只在操作JSONP时设置此项
  statusCode: {     // 针对特定错误码的回调处理函数
    404: handler404,
    500: handler500
  }
});
jqxhr.done(successHandler);
jqxhr.fail(failureHandler);


/************Javascript*Implementation****************************************/

if(window.XMLHttpRequest){
  xmlhttp=new XMLHttpRequest();
}else{
  xmlhttp=new ActiveXObject("Microsoft XMLHTTP");
}

//因为异步async=true的时候，一旦调用了open() send()方法后就会立即请求，然后立即响应。所以必须先定义好onreadystatechange事件
//规定好当处于就绪状态时执行的函数，这才能获取到返回的数据。
xmlhttp.onreadystatechange=function(){
  if(xmlhttp.readyState==4&&xmlhttp.status==200){
    document.getElementById("xxx").innerHTML=xmlhttp.responseText;
  }
}

xmlhttp.open("GET","/service/gethint.php?q="+str,true);
xmlhttp.send();

}