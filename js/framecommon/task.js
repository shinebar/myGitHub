var xml_Http = null;
var xml_ReturnDoc = null;
function bar_MsOver() {
	var obj = event.srcElement;
	if (obj.tagName == "TD") {
		obj.className = "Title_active";
	}
}
function bar_MsOut() {
	var obj = event.srcElement;
	if (obj.tagName == "TD") {
		obj.className = "Title";
	}
}
//切换显示类型
function doSort() {
	
}
//伸展任务列表
function doStretch()
{
	try {
		var element = event.srcElement;
		var obj = element;
		while (obj.tagName != "DIV") {
			obj = obj.parentElement;
		}
		if (element.tagName != "IMG") {
			element = element.parentElement;
			element = element.childNodes(1).childNodes(0);
		}
		obj = obj.nextSibling;
		var oList = obj.firstChild;
		var oNode = obj.lastChild;
		if (oList.style.display == "") {
			//obj.style.border = "0px solid white";
			oList.style.display = "none";
			//oNode.style.background = "white";
			element.src = element.src.replace("down", "up");
		}
		else {
			//obj.style.border = "1px solid white";
			oList.style.display = "";
			//oNode.style.background = "transparent";
			element.src = element.src.replace("up", "down");
		}
	}
	catch (e) {}
}
function list_MsOver()
{
	var obj = event.srcElement;
	while (obj.tagName != "TR") {
		obj = obj.parentElement;
	}
	obj.style.background = "wheat";
}
function list_MsOut()
{
	var obj = event.srcElement;
	while (obj.tagName != "TR") {
		obj = obj.parentElement;
	}
	obj.style.background = "transparent";
}



//------------------------------------------------------------add end--------------------------------------
//执行转换
function doTransform()
{
	objTaskList.innerHTML = objXml.transformNode(objXsl);
//alert( objXml.transformNode(objXsl));
}
//初始化
function doInit()
{
	doQueryTask(1);
}

function doQueryTask(n){
	
}



function drawClient()
{
	var obj = null;
	var btnSorts = document.getElementsByName("btnSort");
	for(var i=0;i<btnSorts.length;i++){
		btnSorts[i].childNodes(1).className = "Sort";
		obj = btnSorts[i];
	}
	obj.childNodes(1).className = "Sort_active";
	var btnByOpTime = btnSorts[btnSorts.length-1];
	if(obj == btnByOpTime)
		btnByOpTime.childNodes(0).nodeValue = "办理时间";
	else
		btnByOpTime.childNodes(0).nodeValue = "等待时间";
	var sortNode = objXsl.selectSingleNode("//xsl:sort");
	var paramNode = objXsl.selectSingleNode("//xsl:param[@name='OrderBy']");
	sortNode.setAttribute("select", "CJSJ");
	paramNode.text = obj.order;
	doTransform();
}
