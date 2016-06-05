	/************
	1.在页面中展现一颗二叉树的结构
	2.提供一个按钮，显示开始遍历，点击后，以动画的形式呈现遍历的过程
	3.二叉树的遍历算法和方式自定，前序中序后序皆可，但推荐可以提供多种算法的展示（增加多个按钮，每个按钮对应不同的算法）
	4.当前被遍历到的节点做一个特殊显示（比如不同的颜色）
	5.每隔一段时间（500ms，1s等时间自定）再遍历下一个节点
	
	Author:Jason
	Date:2016/06/02
	*******/
	//node 是一个元素节点，实质上。
	var arry=[];	

	
	var createBinary=(function(){
		//
		
		function main(arr,travel,btn){
			//私有属性
			var b_tree=new BinarySearchTree();
			
			
			// 属性，构造函数中定义的 
			this.arr=arr;
			this.btn=btn;//创建的控件类型
			this.travel=document.getElementById(travel);
			
			//将数组arr转换为二叉树
			this.trans_tree=function(){
				for(var i=0;i<arr.length;i++){
					b_tree.add(arr[i]);
					var dix=document.getElementById("tree");
					var bn=document.createElement(this.btn);
					
					var txt=document.createTextNode(arr[i]);
					bn.appendChild(txt);
					bn.setAttribute("class","flex-item");
					bn.style.backgroundColor="blue";
					dix.appendChild(bn);
					arry[arr[i]]=bn;
					//alert(b_tree._root.val);
				}
				
			};
			
			//开始travel
			this.travel_tree=function(){
				//alert(arr[0]);// we can access arr here
				//alert(arry[arr[0]]);
				var i=0;
				b_tree.traverse(function(){//函数A						
						//alert(arr[0]);
						
						
						//var myVar= 加上这句话就创建了闭包！
						 setTimeout(function(){//闭包b
						arry[arr[i]].style.backgroundColor="#FFFFFF";
						i++;
						callback();
					},1000);
					
					
				});
				//var c=myVar;
			};
			
			this.init();
		}
		
		main.prototype={
			
		
			
			init:function(){
				var self=this;
				
				this.trans_tree();
				this.travel.addEventListener("click",function(event){
						self.travel_tree();//this 在这里面不一样了
				});
				
			}
			
			
		};//prototype
		
		return main;
		
	})();
	
	var arrx=[2,3,4,5,6,19,8];
	var binary=new createBinary(arrx,'traverse','button');
	