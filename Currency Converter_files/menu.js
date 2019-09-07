var userAgent = navigator.userAgent.toLowerCase();
var isIE = ((userAgent.indexOf("msie") != -1) && (userAgent.indexOf("opera") == -1) && (userAgent.indexOf("webtv") == -1));

var tid = new Array();
var lastMenu = new Array();
var hiddenObjects = new Array();

function show(menuName, menuType) 
{
	var actMenu = new Array();
	var subName = "";
	var subMenus = menuName.split("_");
	var addWidth = false; var addHeight = true;
	for (var m = 0; m < subMenus.length; m++) {
		if (m == 0) {
			subName = subMenus[m];
		} else {
			subName += "_" + subMenus[m];
			addWidth = true; var addHeight = false;
		}
		var parentMenuName = "m_" + subName;
		var subMenuName = "sm_" + subName;
		if (menuType == "2" || menuType == "secondary") {
			parentMenuName = "secondary_" + subName;
			subMenuName = "secondary_ddm_" + subName;
		}
		var parentMenu = document.getElementById(parentMenuName);
		var subMenu = document.getElementById(subMenuName);

		if (subMenu) {
			actMenu[subMenuName] = 1;
			//subMenu.style.top = findPosY(parentMenu, addHeight) + "px";
			//subMenu.style.left = findPosX(parentMenu, addWidth) + "px";
			subMenu.style.display='block';
			if (tid[subName]) {
				clearTimeout(tid[subName]);
				tid[subName] = "";
			}
		}
	}

	for (menuName in lastMenu) {
		if (!actMenu[menuName]) {
			var menuObj = document.getElementById(menuName);
			menuObj.style.display = "none";
		}
	}
	lastMenu = actMenu;

}

function hide(menuName, menuType)
{
	var subMenus = menuName.split("_");
	for (var m = 0; m < subMenus.length; m++) {
		if (m == 0) {
			subName = subMenus[m];
		} else {
			subName += "_" + subMenus[m];
		}
		var blockName = "sm_" + subName;
		if (menuType == "2" || menuType == "secondary") {
			blockName = "secondary_ddm_" + subName;
		}
		var blockMenu = document.getElementById(blockName);
		if (blockMenu) {
			tid[subName] = setTimeout("hideMenu('" + subName + "', '" + menuType + "')", 1500);
		}
	}
}

function hideMenu(menuName, menuType)
{
	var subMenuName = "sm_" + menuName;
	if (menuType == "2" || menuType == "secondary") {
		subMenuName = "secondary_ddm_" + menuName;
	}
	var subMenu = document.getElementById(subMenuName);
	if (subMenu) {
		subMenu.style.display='none';
	}

}

function findPosX(obj, addWidth)
{
	var curleft=0;
	if(addWidth){
		curleft+=obj.offsetWidth;
	}
	if(obj.offsetParent){
		while(obj.offsetParent){
			curleft+=obj.offsetLeft
			obj=obj.offsetParent;
		}
	}else if(obj.x){
		curleft += obj.x;
	}
	return curleft;
}

function findPosY(obj, addHeight)
{
	var curtop = 0;
	if (addHeight) {
		curtop += obj.offsetHeight;
	}
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curtop += obj.offsetTop
			obj = obj.offsetParent;
		}
	} else if (obj.y) {
		curtop += obj.y;
	}
	return curtop;
}

function getMousePos(e) 
{
	var posX = 0;
	var posY = 0;
	if (!e) var e = window.event;
	if (e.pageX || e.pageY) {
		posX = e.pageX;
		posY = e.pageY;
	}	else if (e.clientX || e.clientY) 	{
		posX = e.clientX + document.body.scrollLeft
			+ document.documentElement.scrollLeft;
		posY = e.clientY + document.body.scrollTop
			+ document.documentElement.scrollTop;
	}
	var mousePos = new Array(posX, posY);
	return mousePos;
}

function getPageSize(){
  var w = 0, h = 0;
  if (window.innerWidth) { //Non-IE
    w = window.innerWidth;
    h = window.innerHeight;
  } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
    //IE 6+ in 'standards compliant mode'
    w = document.documentElement.clientWidth;
    h = document.documentElement.clientHeight;
  } else if ( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    w = document.body.clientWidth;
    h = document.body.clientHeight;
  }

	var pageSize= new Array(w, h);    
	return pageSize;
}

function getPageSizeWithScroll()
{
	var xWithScroll = 0; var yWithScroll = 0; 
	if (window.innerHeight && window.scrollMaxY) { // Firefox         
		yWithScroll = window.innerHeight + window.scrollMaxY;         
		xWithScroll = window.innerWidth + window.scrollMaxX;     
	} else if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac         
		yWithScroll = document.body.scrollHeight;         
		xWithScroll = document.body.scrollWidth;     
	} else { // works in Explorer 6 Strict, Mozilla (not FF) and Safari         
		yWithScroll = document.body.offsetHeight;         
		xWithScroll = document.body.offsetWidth;       
	}     
	// check if page size larger
	if (window.innerWidth) { 
    var w = window.innerWidth;
    var h = window.innerHeight;
		if (w > xWithScroll) { xWithScroll = w; }
		if (h > yWithScroll) { yWithScroll = h; }
	}

	var arrayPageSizeWithScroll = new Array(xWithScroll,yWithScroll);    
	return arrayPageSizeWithScroll; 
} 

function getScroll()
{
	var w = window.pageXOffset ||
		document.body.scrollLeft ||
		document.documentElement.scrollLeft;
	var h = window.pageYOffset ||
		document.body.scrollTop ||
		document.documentElement.scrollTop;
	var arrayScroll = new Array(w, h);    
	return arrayScroll;
}

// function to show more filter options
function popupBlock(linkName, blockName, imageName)
{                              	
	var linkObj = document.getElementById(linkName);
	var blockObj = document.getElementById(blockName);
	var imageObj = document.getElementById(imageName);

	if (blockObj.style.display == "none" || blockObj.style.display == "") {
		//blockObj.style.left = findPosX(linkObj, 0) + "px";
		//blockObj.style.top = findPosY(linkObj, 1) + "px";
		blockObj.style.display = "block";
		if (imageObj) {
			imageObj.src = "images/icons/minus_small.gif";
		}
	} else {
		blockObj.style.display = "none";
		if (imageObj) {
			imageObj.src = "images/icons/plus_small.gif";
		}
	}
}

function openPopup(pageUrl, width, height){
	var scrollbars="yes";
	var popupWin = window.open(pageUrl,'popupWin','toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=' + scrollbars + ',resizable=yes,width=' + width + ',height=' + height);
	popupWin.focus();
	return false;
}
function toggleMenu(){
	var headerBlock=document.getElementsByClassName("bk-header");
	var menuObj=headerBlock[0].getElementsByClassName("menu");
	var icoObj=headerBlock[0].getElementsByClassName("ico-menu");
	if (menuObj) {
		menuObj=menuObj[0];	
		icoObj=icoObj[0];	
		if (menuObj.style.display==""||menuObj.style.display=="none") {
			menuObj.style.display="block";
			icoObj.className="ico-menu ico-close";
		} else {
			menuObj.style.display="none";
			icoObj.className="ico-menu";
		}
	}
}

function expandBody(expandObj){
	var headObj = expandObj.parentNode;
	var blockObj = headObj.parentNode;
	var bodyObj = blockObj.getElementsByClassName("body")[0];
	if (expandObj.className == "expand") {
		headObj.className = "head shrink";
		expandObj.className = "expand shrink";
		bodyObj.style.display = "block";
	} else {
		headObj.className = "head";
		expandObj.className = "expand";
		bodyObj.style.display = "none";
	}

}