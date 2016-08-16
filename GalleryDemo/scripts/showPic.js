function countBodyChildren(){
	var body_element=document.getElementsByTagName("body")[0];
	alert(body_element.childNodes.length);
}

function addLoadEvent(func){
	var oldonload=window.onload;
	if(typeof window.onload!='function'){
		
		window.onload=func;
	}else{
		
		window.onload=function(){
			
			oldonload();
			func();
		}
	}
}

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

function preparePlaceholder()
{	
/* 对浏览器是否支持这些DOM方法进行检测！
*/
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
	
	var placeholder=document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","images/placeholder.jpeg");
	placeholder.setAttribute("alt","my image gallery");
	var description=document.createElement("p");
	description.setAttribute("id","description");
	var desctext=document.createTextNode("Choose a image");
	
	description.appendChild(desctext);
	//document.body.appendChild(placeholder);
	//document.body.appendChild(description);
	
	var gallery=document.getElementById("imagegallery");
	insertAfter(placeholder,gallery);
	insertAfter(description,placeholder);
	
}


//加入功能，如果图片切换成功，showPic()函数应该返回false
//如果图片切换不成功则返回true，即实现跳转
function showPic(whichpic){
	if(!document.getElementById("placeholder")) return true;
	var source=whichpic.getAttribute("href");//得到whichpic这个元素节点的href属性的值
	var placeholder=document.getElementById("placeholder");//得到这个元素节点。
	placeholder.setAttribute("src",source);//set img的src为source
	
	if(!document.getElementById("description")) return false;
	//alert(description.childNodes[0].nodeValue); //放在前面才行
	var text=whichpic.getAttribute("title")?
	whichpic.getAttribute("title"):"";
	
	var description=document.getElementById("description");
	if(description.firstChild.nodeType==3){ //nodeType 3  textnode
	description.firstChild.nodeValue=text;
	}
	return false;
}

function prepareGallery(){

	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
	var gallery=document.getElementById("imagegallery");//即ul元素，
	var links=gallery.getElementsByTagName("a");//去遍历整个ul元素，即id==imagegallery的元素里面的所有tag是a的
	//getElementByTagName返回对象的集合:
	for(var i=0;i<links.length;i++)
	{
		links[i].onclick=function(){
			return showPic(this); //我们根据showPic返回的值来判断是否跳转！
			//return false;
		}
		//links[i].onkeypress=links[i].onclick;
		//inks[i].onkeypress=links[i].onclick;//实现确保onkeypress 和onclick事件有同样的行为~
		
	}
}




//window.onload=preparePlaceholder;
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
