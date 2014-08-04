/*
 * CreateDate : 2009-08-04
 * CreateBy   : ChenLiang
 * Comment    : 角色维护模块
 */

window.addEvent('domready', function(){
	pageload();
});

function myresize() {
	var ww = document.body.clientWidth;
	var hh = document.body.clientHeight;
	
	$('dtree').setStyle("left",(ww-$('dtree').getCoordinates().width)/2);
	$('dtree').setStyle("height",(hh-$('dtree').getCoordinates().top-25) < 0 ? "430" : (hh-$('dtree').getCoordinates().top-25));
	$('treetd').setStyle("height",$('dtree').getStyle("height").toInt()+25);
}

var tree_root_id = {"tree_root_id" : ""};
var subStr = "funlist";
var addNodeId;

var tree_script;

function pageload() {
	myresize();
	$('dtree').setHTML("<img src='"+path+"/img/tree/loading.gif' />载入中...");
	sendAjax(tree_url,createTree,'myfm');
}

function selType(obj,sgmCode,dealerCode) {
	if(obj.value == sgmCode) {
		$('dtree').setHTML("<img src='"+path+"/img/tree/loading.gif' />载入中...");
		sendAjax(tree_url,createTree,'myfm');
	}else if(obj.value == dealerCode) {
		$('dtree').setHTML("<img src='"+path+"/img/tree/loading.gif' />载入中...");
		sendAjax(tree_url,createTree,'myfm');
	}
}

PPPID = "10090102,10090101";
function setsele() {
	a.chkclickByFunId(PPPID);
}

function createTree(reobj) {
 
	$('dtree').empty();
	tree_script = new Element('script',{
 		'type' : 'text/javascript'
	});

	tree_script.setText("a = new dTree('a','dtree','true','true');");
 	tree_script.injectInside($('dtree'));

	a.config.folderLinks=true;
	a.config.closeSameLevel=false;
	a.delegate=function (id)
	{
		addNodeId = a.aNodes[id].id;
	    var nodeID = a.aNodes[id].id;
	    
	    for(var n=0; n<a.aNodes.length; n++) {
	    	if(a.aNodes[n].id.contains(addNodeId+"01")) {
	    		return;
	    	}
	    }
	}
	
	var funlistobj = reobj[subStr];
	var funcCode,parFuncId,funcId,funcName;
	for(var i=0; i<funlistobj.length; i++) {
		parFuncId = funlistobj[i].parFuncId;
		funcId = funlistobj[i].funcId;
		funcName = funlistobj[i].funcName;
		if("10" == funcId) { //系统根节点
			a.add(funcId,"-1",funcName);
		} else if(funcId.length<=10){
			a.add(funcId,parFuncId,funcName);
		}
	}
	a.draw();
	setsele();
	a.closeAll();
}

function getFunList() {
	var flist = new Array();
	for(var n=0; n<a.aNodes.length; n++) {
		var tid = a.aNodes[n].id;
		var tsrc = $('ckk' + a.obj + a.aNodes[n]._ai).src;
		if(tid.indexOf('1012')!=-1 && tid.indexOf('101204')==-1&& 
		tid.indexOf('101205')==-1 && tid.indexOf('101206')==-1 && tid.indexOf('101208')==-1
		&& tid.indexOf('101210')==-1 && tid.indexOf('101211')==-1){
				if(tid.length == 10  && tsrc.contains("/checked.gif")) {
			flist.push(tid);
		}
		}
		else{
		if(tid.length == 8 && tsrc.contains("/checked.gif")) {
			flist.push(tid);
		}
		}
	}
	return flist;
}

function sub(url) {
	$('mysub').disabled = true;
	$('myfh').disabled = true;
	$('FUNS').value = getFunList().toString();
	$('ROLE_NAME').value = $('ROLE_NAME').value.clean();
	$('ROLE_DESC').value = $('ROLE_DESC').value.clean();
	
	submitForm('myfm') ? sendAjax(url,addRoleCallBack,'myfm') : $('myfh').disabled = false,$('mysub').disabled = false;
}

function addRoleCallBack(json) {
	if(json.st != null && json.st == "succeed") {
		toGoRoleSearch();
	}else {
		if(json.st == "roleName_error") {
			showError('ermsg','erdiv','ROLE_NAME','角色代码重复,请重新输入!',170);
			$('ROLE_NAME').select();
		} else if(json.st == "roleDesc_error") {
			showError('ermsg','erdiv','ROLE_DESC','角色名称重复,请重新输入!',170);
			$('ROLE_DESC').select();
		}
		$('mysub').disabled = false;
		$('myfh').disabled = false;
	}
}

function clearDiv() {
	$('erdiv').setStyle("display","none");
}

function toGoRoleSearch() {
	window.location = roleSearch;
}
