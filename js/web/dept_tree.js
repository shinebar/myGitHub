/*
 * CreateDate : 2009-10-09
 * CreateBy   : ChenLiang
 * Comment    : 部门树
 */
 
 var mybody;
 var subStr = "funlist";
 var addDeptNodeId;
 var deptTreew;
 var deptTreeh;
 var depttree;
 
 var mydeptTree = new Element('div',{
 	'class' : 'dtree',
 	'id' : 'deptt',
 	'styles' : {
 		'z-index' : '3000',
 		'position' : 'absolute',
 		'border' : '1px solid #5E7692',
 		'width' : '220px',
 		'height' : '380px',
 		'padding' : '1px',
 		'orphans' : '0',
 		'background' : '#F5F5F5',
 		'overflow:':'auto'
 	}
 });
 
 var tree_script = new Element('script',{
 	'type' : 'text/javascript'
 });
 
 window.addEvent('domready', function(){
 	mybody = window.document.body;
 	tree_script.setText("depttree = new dTree('depttree','deptt','false','false','true');");
 	tree_script.injectInside(mydeptTree);
 	mydeptTree.injectInside(mybody);
 	$("deptt").setOpacity("0");
	$('deptt').setStyle("top",-1000);
	$('deptt').setStyle("overflow","auto");
	deptTreew = $('deptt').getStyle('width');
	deptTreeh = $('deptt').getStyle('height');
	myEffects = new Fx.Styles('deptt', {duration: 277,transition: Fx.Transitions.linear});
 });
 
 function ShowTree() {
	$('deptt').setStyle("top",$('DEPT_NAME').getCoordinates().top);
	$('deptt').setStyle("left",$('DEPT_NAME').getCoordinates().left);
	
	myEffects.start({
	    'opacity': [0,1],
	    'width' : [0,deptTreew],
	    'height' : [0,deptTreeh]
	});
 }
 
 function showDEPT() {
 	
 	$('tree_root_id').value = "";
 	tree_script.injectInside(mydeptTree);
 	mydeptTree.injectInside(mybody);
 	tree_script.setText("depttree = new dTree('depttree','deptt','false','false','true');");
	$('deptt').setStyle("top",$('DEPT_NAME').getCoordinates().top);
	$('deptt').setStyle("left",$('DEPT_NAME').getCoordinates().left);
	
	myEffects.start({
	    'opacity': [0,1]
	});
	
	if(getIEV() <= 6) {
		HideSels('deptt');
	}
	initDeptTree();
 }

 function initDeptTree() {
	 depttree.config.closeSameLevel=false;
	 depttree.config.myfun="deptpos";
	 depttree.config.folderLinks=true;
	 depttree.delegate=function (id)
	{
		addDeptNodeId = depttree.aNodes[id].id;
	    var nodeID = depttree.aNodes[id].id;
	    $('tree_root_id').value = nodeID;
	    sendAjax(dept_tree_url,createDeptNode,'fm');
	}
	sendAjax(dept_tree_url,createDeptTree,'fm');
	depttree.closeAll();
 }

 function deptpos(id) {
	var orgid = depttree.aNodes[id].id;
	var orgname = depttree.aNodes[id].name;
	$('DEPT_ID').value = orgid;
	$('DEPT_NAME').value = orgname;
	closeTreeDiv('deptt');
 }

 function createDeptTree(reobj) {
	var orglistobj = reobj[subStr];
	var orgId,parentOrgId,orgName,orgCode,orgId;

	for(var i=0; i<orglistobj.length; i++) {
		orgId = orglistobj[i].orgId;
		orgName = orglistobj[i].orgName;
		orgCode = orglistobj[i].orgCode;
		parentOrgId = orglistobj[i].parentOrgId;

		if(parentOrgId == -1) {
			depttree.add(orgId,"-1",orgName,orgCode);
		} else {
			depttree.add(orgId,parentOrgId,orgName,orgCode);
			//depttree.add(orgId+"_",orgId,"loading...","","","",depttree.icon.loading,"","");
		}
	}
	depttree.draw();
 }

 function createDeptNode(reobj) {
	var orglistobj = reobj[subStr];
	var orgId,parentOrgId,orgName,orgCode;
	depttree.remove(addDeptNodeId+"_");
	for(var i=0; i<orglistobj.length; i++) {
		orgId = orglistobj[i].orgId;
		orgName = orglistobj[i].orgName;
		orgCode = orglistobj[i].orgCode;
		parentOrgId = orglistobj[i].parentOrgId;
		depttree.add(orgId,addDeptNodeId,orgName,orgCode);
		//depttree.add(orgId+"_",orgId,"loading...","","","",depttree.icon.loading,"","");
	}
	depttree.draw();
 }
 
 
 