function prepareGallery(){

	if(!document.getElementByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
	var gallery=document.getElementById("imagegallery");//即ul元素，
	var links=gallery.getElementByTagName("a");//去遍历整个ul元素，即id==imagegallery的元素里面的所有tag是a的
	//getElementByTagName返回对象的集合:
	for(var i=0;i<links.length;i++)
	{
		links[i].onclick=function(){
			return showPic(this); //我们根据showPic返回的值来判断是否跳转！
			//return false;
		}
		
		//inks[i].onkeypress=links[i].onclick;//实现确保onkeypress 和onclick事件有同样的行为~
		
	}
}