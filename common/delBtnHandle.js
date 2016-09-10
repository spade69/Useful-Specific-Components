	
	//删除队列中的元素,捕捉的是div之下的，跟上面的div中的button无关！
define(['EventUtil'],function(EventUtil){
	return	function(div,arr){
		
		var del=document.getElementsByTagName("button");
		var divx=document.getElementById(div);
		
		//该div注册一个事件，但是target不是它
		EventUtil.addHandler(divx,"click",function(event){
			var target=EventUtil.getTarget(event);//target是一个元素节点对象
			if(target.tagName.toLowerCase()=="button"){
			//通过捕捉这个事件来实现，事件肯定会冒泡
				//var item=target.parentNode;
				var valx=target.childNodes[0].textContent;//v=
				var idx=target.getAttribute("id");
				
				for(var i=0;i<arr.length;i++)
				{
					if(i==idx)
					//alert(valx.valueOf());
					{
						//delete arr[i];
						//事件只有一次，但是值可能都相同啊！
						//alert(valx.valueOf());
						arr.splice(i,1);
						refresh();
					}
				}
				
			}
		});
		//console.log("Handler Running");
	};
});	