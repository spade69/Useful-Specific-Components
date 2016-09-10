/************
	Author:Jason
	Date:2016/06/02
	*******/ 
	//构造函数
define(function(){
	var BinarySearchTree=function(){
		/**
		*@property _root
		*@type Object
		*@private
		*/
		this._root=null;
		console.log('constructor running');
	}	
	//原型定义一系列的方法
	//原型~
	BinarySearchTree.prototype={
		
		//restore constructor
		constructor:BinarySearchTree,
		
		add:function(val){
			//create a new item object,place data in 
			var node={
				val:val,
				left:null,
				right:null
			},
			//Used to travse the structure currents;
			current;
			//插入节点要遍历二叉树
			if(this._root==null){
				this._root=node;//节点是node
				
			}else{
				current=this._root;
				while(true){
					//if the new value is less than this node's value .go left 
					if(val<current.val){
						//if there is no left,new node belongs there
						if(current.left==null){
							current.left=node;
							break;
						}else {
							current=current.left;
						}
					}else if(val>current.val){
						if(current.right==null){
							current.right=node;
							break;
						}else{
							current=current.right;
						}
						//if the new val is equal to current one, just ignoreCase
					}else{
						break;
					}
					
					
				}
			}
		},
		
		contains:function(val){
			var found= false,
				current=this._root   //why dont add ;
			
			while(!found&&current){
				//if the value is less than the current node's , go loft
				if(val<current.val){
					current=current.left;
				}
				else if(val>current.val){
					current=current.right;
				}
				else{
					found=true;
				}
				
				
			}
			//only proceed if that node was found
		},
		 /**
		* Traverses the tree and runs the given method on each node it comes
		* across while doing an in-order traversal.
		* @param {Function} process The function to run on each node. 调用这个process函数当遍历的时候。
		* @return {void}
		* @method traverse
		*/
		traverse:function(process){
			//helper function
			function inOrder(node){
				if(node){
					//traverse the left subtree
					if(node.left!=null){
						inOrder(node.left);
					}
					// call the process method on this node
					
					process.call(this,node);
					
					//traverse the right subtree
					if(node.right!=null){
						inOrder(node.right);
					}
				}
			}
			inOrder(this._root);
		},
		
		remove:function(val){
			
		},
		
		size:function(){
			var leng=0;
			this.traverse(function(node){
				leng++;
			});
			
			return leng;
		},
		
		toArray:function(){
			var result=[];
			
			this.traverse(function(node){
				result.push(node.value);//遍历时压入
			});
		},
		
		toString:function(){
			return this.toArray().toString();//toString()是一个js内置的方法
		}
	};
	return{
		BinarySearchTree:BinarySearchTree
	}
});