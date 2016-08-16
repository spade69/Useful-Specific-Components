/*************
function: 插入一个新元素到目标元素后面
把目标元素的parentNode属性提取到变量parent
检查目标元素是不是parent的最后一个子元素，如果是就
直接appendChild把新元素加到parent元素上，这样就紧跟着插入到目标元素的后面了。

不是就把新元素插入到目标元素和parent元素的下一个子元素的中间。
target  mewelement targetelement->nextSibling
***************************/
function insertAfter(newElment,targetElement){
	var parent=targetElement.parentNode;
	if(parent.lastChild==targetElement){
		parent.appendChild(newElment);
		
	}
	else
	{
		parent.insertBefore(newElment,targetElement.nextSibling);
	}
	
}