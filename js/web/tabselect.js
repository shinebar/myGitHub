function clearDealerCode(){
			$('dealerCode').value = "";
		}	
function changTab(obj,changeTabVal){
	var tabs = document.getElementById("tabs").getElementsByTagName("li");
	for(var i=0;i<tabs.length;i++)
	{
		tabs[i].className="sd02";
	}
	for(var i=1;i<10;i++)
	{
		if(document.getElementById("d"+i)){
			document.getElementById("d"+i).style.display="none";
		}
	}
	obj.className="sd01";
	var divId = obj.getAttribute("name");
	if(document.getElementById(divId)){
		document.getElementById(divId).style.display="";
	}
	changeTabVal(divId);
}

var myPage;
	var flag;
	var pageTemp;
	var valflagTemp;
	//modified by andy.ten@tom.com 
	function __extQuery__(page,valflag, sFormName)
	{   
		var formName;
		if(formName)
			formName = sformName;
		else
			formName = "fm";
		pageTemp=page;
		valflagTemp = valflag;
		if(valflag==false||flag==false){
			flag = false;
		}
		if(flag!=false)
		{
			
			if(submitForm(formName)) {
				makeNomalFormCall(url+(url.lastIndexOf("?") == -1?"?":"&")+"curPage="+page,callBack,formName,'queryBtn'); 
			}
		}else{
			makeNomalFormCall(url+(url.lastIndexOf("?") == -1?"?":"&")+"curPage="+page,callBack,formName,'queryBtn');
		}
		
	}
	function __extQueryAddFunction__(page,fun){
		if(submitForm(formName)) makeNomalFormCall(url+(url.lastIndexOf("?") == -1?"?":"&")+"curPage="+page,callBack,formName,'queryBtn',fun); 
	}
	
	window.document.onkeydown = function (){
		if(event.keyCode==13){
			__extQuery__(1,valflagTemp);
		};
	}