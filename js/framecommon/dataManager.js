/**
 * added by andy.ten@tom.com ，误删
 * 主数据的js manager代码实现
 * ver:20090921_v0.1
 */

var g_dataxmlPath = "dataxml";
/**
 * 创建 XMLDocument 对象
 */
function createDOMDocument()
{
    try 
    {
        //适用ie
        var objXML = new ActiveXObject("Msxml2.DOMDocument");
        objXML.async = false;
        return objXML;
    }
    catch (e) 
    {
        return null;
    }
}

/**
 * 获取主数据
 * dataname:主数据xml名称
 * 返回的是HashMap，key是id，value是name
 */
function getMainData(dataname)
{
	var dom = createDOMDocument();
	if(dom == null)
	{
		alert("获取<"+dataname+">主数据失败，请与系统管理员联系！");
		return ;
	}
    dom.load(g_webAppName+"/"+g_dataxmlPath+"/"+dataname+".xml");
    var rows = dom.selectNodes("//ROOT/ROW");
    if(!rows || !rows.length || rows.length==0)
    {
    	alert("获取<"+dataname+">主数据失败，请与系统管理员联系！");
    	return ;
    }
    
    var hm = new HashMap();
    //alert(rows.length);
    for(var i=0; i<rows.length; i++)
    {
       var idVal = "";
       var nameVal = "";
       
       var idNode = rows[i].selectSingleNode("ID");
       if(!idNode || idNode == null)
           continue;
       else
       {
       	   idVal = idNode.text;
       }
       var nameNode = rows[i].selectSingleNode("NAME");
       if(!nameNode || nameNode == null)
           continue;
       else
       {
       	   nameVal = nameNode.text;
       }
       
       hm.put(idVal,nameVal);

    }
    //alert("size:"+hm.size());
    return hm;
}

/**
 * 获取xml某一节点值
 * dataname:主数据xml名称
 * nodeName:指定节点名称
 * filterVal:  值filter
 * filterCol:  列filter
 * 返回的是节点值：nodeVal
 */
function getNodeValByName(dataname ,nodeName ,filterVal ,filterCol,id)
{
	var dom = createDOMDocument();
	if(dom == null)
	{
		alert("获取<"+dataname+">主数据失败，请与系统管理员联系！");
		return ;
	}
    dom.load(g_webAppName+"/"+g_dataxmlPath+"/"+dataname+".xml");
    var rows = dom.selectNodes("//ROOT/ROW");
    if(!rows || !rows.length || rows.length==0)
    {
    	alert("获取<"+dataname+">主数据失败，请与系统管理员联系！");
    	return ;
    }
    
    var nodeVal = "";
    var filterCol_s="";
    if(id)
    	filterCol_s= id;
    else
    	filterCol_s= "ID";
    var filterVal_s = "";
    if(filterCol)
       filterCol_s = filterCol;
    for(var i=0;i<rows.length;i++)
    {
       var nodeObj = rows[i].selectSingleNode(nodeName);
       if(!nodeObj)
       {
          alert("xml文件中没有指定节点!");
          return ;
       }
       var filterObj = rows[i].selectSingleNode(filterCol_s);
       if(!filterObj) break;
       filterVal_s = filterObj.text;
       if(nodeObj.text)
       {
          if(filterVal && filterVal_s && filterVal == filterVal_s)
          {
             nodeVal = nodeObj.text; 
             break;             
          }
       }
    }
    return nodeVal;
}

/**
 * 获取全部发动机主数据
 * 返回的是一维数组，数组中元素是HashMap对象
 */
function getMainDataTmEngine()
{
	var dom = createDOMDocument();
	if(dom == null)
	{
		alert("获取发动机主数据失败，请与系统管理员联系！");
		return ;
	}
    dom.load(g_webAppName+"/"+g_dataxmlPath+"/g_TM_ENGINE.xml");
    var rows = dom.selectNodes("//ROOT/ROW");
    if(!rows || !rows.length || rows.length==0)
    {
    	alert("获取发动机主数据失败，请与系统管理员联系！");
    	return ;
    }
    var arr = new Array();
    //alert("length:"+rows.length);
    for(var i=0; i<rows.length; i++)
    {
       var hm = new HashMap();
       var nodes = rows[i].childNodes;
       for(var j=0; j<nodes.length; j++)
       {
       	  var nodeName = nodes[j].nodeName;
       	  var nodeValue = nodes[j].text;
          hm.put(nodeName,nodeValue);
       }
       arr[i] = hm;
    }
    return arr;
}

/**
 * hm:HashMap对象
 * selObj:页面selObj对象
 * selectedId:设置选中值
 * 设置页面select框内容
 */
function setSelectOptions(hm_s ,selObj ,selectedId)
{
	if(!hm_s) 
	{
	   alert("请指明主数据!");
	   return false;	
	}
	if(!selObj)
	{
		alert("请指明页面select对象");
		return false;
	}
	//清空现有options
	while(selObj.options && selObj.options.length>0)
	{
		selObj.options.remove(0);
	}
	var arr = hm_s.keySet();
   	for(var i=0;i<arr.length;i++)
   	{
   		var key = arr[i].toString();
   		var keyVal = (hm_s.get(key)).toString();
   		var options = document.createElement("OPTION");
   		options.value = key;
   		options.text = keyVal;
   		selObj.options.add(options);
   		//设置select框选中
   		if(selectedId)
   		{
   			if(options.value == selectedId)
   			   options.selected = true;
   		}
   		
   	}
   	return true;

}

/**
 * hm:HashMap对象
 * selObj:页面selObj对象
 * 设置页面车系框内容
 */
function setSelectOptionsForSeries(selObj ,selectedId)
{
	if(!selObj)
	{
		alert("请指明页面select对象");
		return false;
	}
	var dom = createDOMDocument();
	dom.load(g_webAppName+"/"+g_dataxmlPath+"/g_TM_VHCL_MATERIAL_GROUP.xml");
	if(dom == null)
	{
		alert("获取车系、车型主数据失败，请与系统管理员联系！");
		return ;
	}
	//清空现有options
	while(selObj.options && selObj.options.length>0)
	{
		selObj.options.remove(0);
	}
	var nodes = dom.selectNodes("//ROOT/ROW");
   	for(var i=0;i<nodes.length;i++)
   	{ 	
   		var groupLevelNode = nodes[i].selectSingleNode("GROUP_LEVEL");
   		var groupLevel = groupLevelNode.text;
   		if(groupLevel && groupLevel == "2")
   		{
   		    var options = document.createElement("OPTION");
	   		options.value = nodes[i].selectSingleNode("GROUP_ID").text;
	   		options.text = nodes[i].selectSingleNode("GROUP_NAME").text;
	   		selObj.options.add(options);
	   		//设置select框选中
	   		if(selectedId)
	   		{
	   			if(options.value == selectedId)
	   			   options.selected = true;
	   		}
   		}
   	}
   	return true;

}

/**
 * parentId:车系代码，如果车系代码为空，则列出所有车型
 * selObj:页面selObj对象
 * 设置页面车型框内容
 */
function setSelectOptionsForModel(parentId ,selObj ,selectedId, setAll)
{
	if(!selObj)
	{
		alert("请指明页面select对象");
		return false;
	}
	var dom = createDOMDocument();
	dom.load(g_webAppName+"/"+g_dataxmlPath+"/g_TM_VHCL_MATERIAL_GROUP.xml");
	if(dom == null)
	{
		alert("获取车系、车型主数据失败，请与系统管理员联系！");
		return ;
	}
	//清空现有options
	while(selObj.options && selObj.options.length>0)
	{
		selObj.options.remove(0);
	}
	var nodes = dom.selectNodes("//ROOT/ROW");
	if(setAll){
		var options = document.createElement("OPTION");
   		options.value = "";
   		options.text = "-请选择-";
   		selObj.options.add(options);
	}
   	for(var i=0;i<nodes.length;i++)
   	{
   		var groupLevelNode = nodes[i].selectSingleNode("GROUP_LEVEL");
   		var groupLevel = groupLevelNode.text;
   		if(groupLevel && groupLevel == "3")
   		{
   			if(parentId)
   			{
   				var parentIds = nodes[i].selectSingleNode("PARENT_GROUP_ID").text;
   				if(parentIds && parentIds == parentId)
   				{
	   				var options = document.createElement("OPTION");
			   		options.value = nodes[i].selectSingleNode("GROUP_ID").text;
			   		options.text = nodes[i].selectSingleNode("GROUP_NAME").text;
			   		selObj.options.add(options);
			   		//设置select框选中
			   		if(selectedId)
			   		{
			   			if(options.value == selectedId)
			   			   options.selected = true;
			   		}
   				}
   			}else
   			{
   				var options = document.createElement("OPTION");
		   		options.value = nodes[i].selectSingleNode("GROUP_ID").text;
		   		options.text = nodes[i].selectSingleNode("GROUP_NAME").text;
		   		selObj.options.add(options);
		   		//设置select框选中
		   		if(selectedId)
		   		{
		   			if(options.value == selectedId)
		   			   options.selected = true;
		   		}
   			}
   		}
   	}
   	return true;

}

/**
 * modelId:车型代码
 * selObj:页面selObj对象
 * 设置页面驱动形式框内容
 */
function setSelectOptionsForDriveType(modelId ,selObj ,selectedId)
{
	if(!selObj)
	{
		alert("请指明页面select对象");
		return false;
	}
	var dom = createDOMDocument();
	dom.load(g_webAppName+"/"+g_dataxmlPath+"/g_TT_VS_DRIVE_TYPE.xml");
	if(dom == null)
	{
		alert("获取驱动形式主数据失败，请与系统管理员联系！");
		return ;
	}
	//清空现有options
	while(selObj.options && selObj.options.length>0)
	{
		selObj.options.remove(0);
	}
	var nodes = dom.selectNodes("//ROOT/ROW");
   	for(var i=0;i<nodes.length;i++)
   	{
		if(modelId)
		{
			var groupId = nodes[i].selectSingleNode("MATERIAL_GROUP_ID").text;
			if(groupId && groupId == modelId)
			{
   				var options = document.createElement("OPTION");
		   		options.value = nodes[i].selectSingleNode("DRIVE_TYPE_ID").text;
		   		options.text = nodes[i].selectSingleNode("DRIVE_TYPE_NAME").text;
		   		selObj.options.add(options);
		   		//设置select框选中
		   		if(selectedId)
		   		{
		   			if(options.value == selectedId)
		   			   options.selected = true;
		   		}
			}
		}else
		{
			var options = document.createElement("OPTION");
	   		options.value = nodes[i].selectSingleNode("DRIVE_TYPE_ID").text;
	   		options.text = nodes[i].selectSingleNode("DRIVE_TYPE_NAME").text;
	   		selObj.options.add(options);
	   		//设置select框选中
	   		if(selectedId)
	   		{
	   			if(options.value == selectedId)
	   			   options.selected = true;
	   		}
		}
   	}
   	return true;

}

/**
 * selObj:页面selObj对象
 * 设置页面驱动形式框内容
 */
function setSelectOptionsForAllDriveType(selObj ,selectedId,flag)
{
	if(!selObj)
	{
		alert("请指明页面select对象");
		return false;
	}
	var dom = createDOMDocument();
	dom.load(g_webAppName+"/"+g_dataxmlPath+"/g_TT_VS_DRIVE_TYPE.xml");
	if(dom == null)
	{
		alert("获取驱动形式主数据失败，请与系统管理员联系！");
		return ;
	}
	//清空现有options
	while(selObj.options && selObj.options.length>0)
	{
		selObj.options.remove(0);
	}
	if(flag){
		var options = document.createElement("OPTION");
   		options.value = "";
   		options.text = "-请选择-";
   		selObj.options.add(options);
	}
	var nodes = dom.selectNodes("//ROOT/ROW");
   	for(var i=0;i<nodes.length;i++)
   	{
		var options = document.createElement("OPTION");
   		options.value = nodes[i].selectSingleNode("DRIVE_TYPE_ID").text;
   		options.text = nodes[i].selectSingleNode("DRIVE_TYPE_NAME").text;
   		selObj.options.add(options);
   		//设置select框选中
   		if(selectedId)
   		{
   			if(options.value == selectedId)
   			   options.selected = true;
   		}
   	}
   	return true;

}
/**
 * modelId:车型代码
 * selObj:页面selObj对象
 * 设置页面驾驶室框内容
 */
function setSelectOptionsForCab(modelId ,selObj ,selectedId)
{
	if(!selObj)
	{
		alert("请指明页面select对象");
		return false;
	}
	var dom = createDOMDocument();
	dom.load(g_webAppName+"/"+g_dataxmlPath+"/g_TT_VS_CAB.xml");
	if(dom == null)
	{
		alert("获取驾驶室主数据失败，请与系统管理员联系！");
		return ;
	}
	//清空现有options
	while(selObj.options && selObj.options.length>0)
	{
		selObj.options.remove(0);
	}
	var nodes = dom.selectNodes("//ROOT/ROW");
   	for(var i=0;i<nodes.length;i++)
   	{
		if(modelId)
		{
			var groupId = nodes[i].selectSingleNode("MATERIAL_GROUP_ID").text;
			if(groupId && groupId == modelId)
			{
   				var options = document.createElement("OPTION");
		   		options.value = nodes[i].selectSingleNode("CAB_ID").text;
		   		options.text = nodes[i].selectSingleNode("CAB_NAME").text;
		   		selObj.options.add(options);
		   		//设置select框选中
		   		if(selectedId)
		   		{
		   			if(options.value == selectedId)
		   			   options.selected = true;
		   		}
			}
		}else
		{
			var options = document.createElement("OPTION");
	   		options.value = nodes[i].selectSingleNode("CAB_ID").text;
	   		options.text = nodes[i].selectSingleNode("CAB_NAME").text;
	   		selObj.options.add(options);
		   	//设置select框选中
	   		if(selectedId)
	   		{
	   			if(options.value == selectedId)
	   			   options.selected = true;
	   		}
		}
   	}
   	return true;

}

/**
 * selObj:页面selObj对象
 * 设置页面发动机品牌框内容
 */
function setSelectOptionsForEngineBrand(selObj ,selectedId)
{
	if(!selObj)
	{
		alert("请指明页面select对象");
		return false;
	}
	var dom = createDOMDocument();
	dom.load(g_webAppName+"/"+g_dataxmlPath+"/g_TT_VS_ENGINE_BRAND.xml");
	if(dom == null)
	{
		alert("获取发动机品牌主数据失败，请与系统管理员联系！");
		return ;
	}
	//清空现有options
	while(selObj.options && selObj.options.length>0)
	{
		selObj.options.remove(0);
	}
	var nodes = dom.selectNodes("//ROOT/ROW");
   	for(var i=0;i<nodes.length;i++)
   	{
		var options = document.createElement("OPTION");
   		options.value = nodes[i].selectSingleNode("ENGINE_TYPE_ID").text;
   		options.text = nodes[i].selectSingleNode("BRAND_NAME").text;
   		selObj.options.add(options);
	   	//设置select框选中
   		if(selectedId)
   		{
   			if(options.value == selectedId)
   			   options.selected = true;
   		}
   	}
   	return true;

}

/**
 * brandId_s:发动机品牌
 * selObj:页面selObj对象
 * 设置页面发动机型号框内容
 */
function setSelectOptionsForEngine(brandId_s ,selObj ,selectedId)
{
	if(!selObj)
	{
		alert("请指明页面select对象");
		return false;
	}
	var dom = createDOMDocument();
	dom.load(g_webAppName+"/"+g_dataxmlPath+"/g_TT_VS_ENGINE.xml");
	if(dom == null)
	{
		alert("获取发动机型号主数据失败，请与系统管理员联系！");
		return ;
	}
	//清空现有options
	while(selObj.options && selObj.options.length>0)
	{
		selObj.options.remove(0);
	}
	var nodes = dom.selectNodes("//ROOT/ROW");
   	for(var i=0;i<nodes.length;i++)
   	{
   		var brandIdObj = nodes[i].selectSingleNode("BRAND_ID");
   		//var brandId = brandIdObj.text;
		if(brandId_s)
		{
			var brandId = nodes[i].selectSingleNode("BRAND_ID").text;
			if(brandId && brandId == brandId_s)
			{
   				var options = document.createElement("OPTION");
		   		options.value = nodes[i].selectSingleNode("ENGINE_ID").text;
		   		options.text = nodes[i].selectSingleNode("ENGINE_NAME").text;
		   		selObj.options.add(options);
		   		//设置select框选中
		   		if(selectedId)
		   		{
		   			if(options.value == selectedId)
		   			   options.selected = true;
		   		}
			}
		}else
		{
			var options = document.createElement("OPTION");
	   		options.value = nodes[i].selectSingleNode("ENGINE_ID").text;
	   		options.text = nodes[i].selectSingleNode("ENGINE_NAME").text;
	   		selObj.options.add(options);
	   		//设置select框选中
	   		if(selectedId)
	   		{
	   			if(options.value == selectedId)
	   			   options.selected = true;
	   		}
		}
   	}
   	return true;

}
/**
 * selObj:页面selObj对象
 * 设置页面发动机品牌框内容
 */
function setSelectOptionsForAllEngine(selObj ,selectedId,flag)
{
	if(!selObj)
	{
		alert("请指明页面select对象");
		return false;
	}
	var dom = createDOMDocument();
	dom.load(g_webAppName+"/"+g_dataxmlPath+"/g_TT_VS_ENGINE.xml");
	if(dom == null)
	{
		alert("获取发动机品牌主数据失败，请与系统管理员联系！");
		return ;
	}
	//清空现有options
	while(selObj.options && selObj.options.length>0)
	{
		selObj.options.remove(0);
	}
	if(flag){
		var options = document.createElement("OPTION");
   		options.value = "";
   		options.text = "-请选择-";
   		selObj.options.add(options);
	}
	var nodes = dom.selectNodes("//ROOT/ROW");
   	for(var i=0;i<nodes.length;i++)
   	{
		var options = document.createElement("OPTION");
		options.value = nodes[i].selectSingleNode("ENGINE_ID").text;
   		options.text = nodes[i].selectSingleNode("ENGINE_NAME").text;
   		selObj.options.add(options);
   		//设置select框选中
   		if(selectedId)
   		{
   			if(options.value == selectedId)
   			   options.selected = true;
   		}
   	}
   	return true;

}
/**
 * selObj:页面selObj对象
 * 设置页面大梁框内容
 */
function setSelectOptionsForGirder(selObj ,selectedId)
{
	if(!selObj)
	{
		alert("请指明页面select对象");
		return false;
	}
	var dom = createDOMDocument();
	dom.load(g_webAppName+"/"+g_dataxmlPath+"/g_TT_VS_GIRDER.xml");
	if(dom == null)
	{
		alert("获取大梁主数据失败，请与系统管理员联系！");
		return ;
	}
	//清空现有options
	while(selObj.options && selObj.options.length>0)
	{
		selObj.options.remove(0);
	}
	var nodes = dom.selectNodes("//ROOT/ROW");
   	for(var i=0;i<nodes.length;i++)
   	{
		var options = document.createElement("OPTION");
   		options.value = nodes[i].selectSingleNode("GIRDER_ID").text;
   		options.text = nodes[i].selectSingleNode("GIRDER_NAME").text;
   		selObj.options.add(options);
	   	//设置select框选中
   		if(selectedId)
   		{
   			if(options.value == selectedId)
   			   options.selected = true;
   		}
   	}
   	return true;

}

/**
 * selObj:页面selObj对象
 * 设置页面变速箱品牌框内容
 */
function setSelectOptionsForGearboxType(selObj ,selectedId)
{
	if(!selObj)
	{
		alert("请指明页面select对象");
		return false;
	}
	var dom = createDOMDocument();
	dom.load(g_webAppName+"/"+g_dataxmlPath+"/g_TT_VS_GEARBOX_TYPE.xml");
	if(dom == null)
	{
		alert("获取变速箱品牌主数据失败，请与系统管理员联系！");
		return ;
	}
	//清空现有options
	while(selObj.options && selObj.options.length>0)
	{
		selObj.options.remove(0);
	}
	var nodes = dom.selectNodes("//ROOT/ROW");
   	for(var i=0;i<nodes.length;i++)
   	{
		var options = document.createElement("OPTION");
   		options.value = nodes[i].selectSingleNode("GEARBOX_TYPE_ID").text;
   		options.text = nodes[i].selectSingleNode("BRAND_NAME").text;
   		selObj.options.add(options);
	   	//设置select框选中
   		if(selectedId)
   		{
   			if(options.value == selectedId)
   			   options.selected = true;
   		}
   	}
   	return true;

}

/**
 * selObj:页面selObj对象
 * 设置页面变速箱框内容
 */
function setSelectOptionsForGearBox(selObj ,selectedId, setAll)
{
	if(!selObj)
	{
		alert("请指明页面select对象");
		return false;
	}
	var dom = createDOMDocument();
	dom.load(g_webAppName+"/"+g_dataxmlPath+"/g_TT_VS_GEARBOX.xml");
	if(dom == null)
	{
		alert("获取变速箱主数据失败，请与系统管理员联系！");
		return ;
	}
	//清空现有options
	while(selObj.options && selObj.options.length>0)
	{
		selObj.options.remove(0);
	}
	var nodes = dom.selectNodes("//ROOT/ROW");
	if(setAll){
		var options = document.createElement("OPTION");
   		options.value = "";
   		options.text = "-请选择-";
   		selObj.options.add(options);
	}
   	for(var i=0;i<nodes.length;i++)
   	{
		var options = document.createElement("OPTION");
   		options.value = nodes[i].selectSingleNode("GEARBOX_ID").text;
   		options.text = nodes[i].selectSingleNode("GEARBOX_NAME").text;
   		selObj.options.add(options);
   		//设置select框选中
   		if(selectedId)
   		{
   			if(options.value == selectedId)
   			   options.selected = true;
   		}
   	}
   	return true;

}

/**
 * selObj:页面selObj对象
 * 设置页面驱动桥型号框内容
 */
function setSelectOptionsForDriveAxle(selObj ,selectedId, setAll)
{
	if(!selObj)
	{
		alert("请指明页面select对象");
		return false;
	}
	var dom = createDOMDocument();
	dom.load(g_webAppName+"/"+g_dataxmlPath+"/g_TT_VS_DRIVE_AXLE.xml");
	if(dom == null)
	{
		alert("获取驱动桥型号主数据失败，请与系统管理员联系！");
		return ;
	}
	//清空现有options
	while(selObj.options && selObj.options.length>0)
	{
		selObj.options.remove(0);
	}
	var nodes = dom.selectNodes("//ROOT/ROW");
	if(setAll){
		var options = document.createElement("OPTION");
   		options.value = "";
   		options.text = "-请选择-";
   		selObj.options.add(options);
	}
   	for(var i=0;i<nodes.length;i++)
   	{
		var options = document.createElement("OPTION");
   		options.value = nodes[i].selectSingleNode("DRIVE_AXLE_ID").text;
   		options.text = nodes[i].selectSingleNode("DRIVE_AXLE_NAME").text;
   		selObj.options.add(options);
   		//设置select框选中
   		if(selectedId)
   		{
   			if(options.value == selectedId)
   			   options.selected = true;
   		}
   	}
   	return true;

}

/**
 * selObj:页面selObj对象
 * selectedId:设置select框选中值
 * 设置页面前桥型号框内容
 */
function setSelectOptionsForFrontAxle(selObj ,selectedId)
{
	if(!selObj)
	{
		alert("请指明页面select对象");
		return false;
	}
	var dom = createDOMDocument();
	dom.load(g_webAppName+"/"+g_dataxmlPath+"/g_TT_VS_FRONT_AXLE.xml");
	if(dom == null)
	{
		alert("获取前桥型号主数据失败，请与系统管理员联系！");
		return ;
	}
	//清空现有options
	while(selObj.options && selObj.options.length>0)
	{
		selObj.options.remove(0);
	}
	var nodes = dom.selectNodes("//ROOT/ROW");
   	for(var i=0;i<nodes.length;i++)
   	{
		var options = document.createElement("OPTION");
   		options.value = nodes[i].selectSingleNode("FRONT_AXLE_ID").text;
   		options.text = nodes[i].selectSingleNode("FRONT_AXLE_NAME").text;
   		selObj.options.add(options);
   		//设置select框选中
   		if(selectedId)
   		{
   			if(options.value == selectedId)
   			   options.selected = true;
   		}
   	}
   	return true;

}

/**
 * selObj:页面selObj对象
 * selectedId:设置select框选中值
 * 设置页面轴距框内容
 */
function setSelectOptionsForWheelBase(selObj ,selectedId)
{
	if(!selObj)
	{
		alert("请指明页面select对象");
		return false;
	}
	var dom = createDOMDocument();
	dom.load(g_webAppName+"/"+g_dataxmlPath+"/g_TT_VS_WHEELBASE.xml");
	if(dom == null)
	{
		alert("获取轴距主数据失败，请与系统管理员联系！");
		return ;
	}
	//清空现有options
	while(selObj.options && selObj.options.length>0)
	{
		selObj.options.remove(0);
	}
	var nodes = dom.selectNodes("//ROOT/ROW");
   	for(var i=0;i<nodes.length;i++)
   	{
		var options = document.createElement("OPTION");
   		options.value = nodes[i].selectSingleNode("WHEELBASE_ID").text;
   		options.text = nodes[i].selectSingleNode("WHEELBASE_NAME").text;
   		selObj.options.add(options);
   		//设置select框选中
   		if(selectedId)
   		{
   			if(options.value == selectedId)
   			   options.selected = true;
   		}
   	}
   	return true;

}


/**
 * selObj:页面selObj对象
 * 设置页面轮胎框内容
 */
function setSelectOptionsForTire(selObj ,selectedId,setAll)
{
	if(!selObj)
	{
		alert("请指明页面select对象");
		return false;
	}
	var dom = createDOMDocument();
	dom.load(g_webAppName+"/"+g_dataxmlPath+"/g_TT_VS_TIRE.xml");
	if(dom == null)
	{
		alert("获取轮胎主数据失败，请与系统管理员联系！");
		return ;
	}
	//清空现有options
	while(selObj.options && selObj.options.length>0)
	{
		selObj.options.remove(0);
	}
	var nodes = dom.selectNodes("//ROOT/ROW");
	var temp = "";
	if(setAll){
		var options = document.createElement("OPTION");
   		options.value = "";
   		options.text = "-请选择-";
   		selObj.options.add(options);
	}
   	for(var i=0;i<nodes.length;i++)
   	{
		var options = document.createElement("OPTION");
   		options.value = nodes[i].selectSingleNode("TIRM_ID").text;
   		options.text = nodes[i].selectSingleNode("TIRE_NAME").text;
   		if(temp != options.value) {
   			selObj.options.add(options);
	   		temp = options.value;
	   		//设置select框选中
	   		if(selectedId)
	   		{
	   			if(options.value == selectedId)
	   			   options.selected = true;
	   		}
   		}
   	}
   	return true;

}

/**
 * selObj:页面selObj对象
 * 设置页面颜色框内容
 */
function setSelectOptionsForColor(selObj ,selectedId, setAll)
{
	if(!selObj)
	{
		alert("请指明页面select对象");
		return false;
	}
	var dom = createDOMDocument();
	dom.load(g_webAppName+"/"+g_dataxmlPath+"/g_TT_VS_COLOR.xml");
	if(dom == null)
	{
		alert("获取颜色主数据失败，请与系统管理员联系！");
		return ;
	}
	//清空现有options
	while(selObj.options && selObj.options.length>0)
	{
		selObj.options.remove(0);
	}
	var nodes = dom.selectNodes("//ROOT/ROW");
	var temp = "";
	if(setAll){
		var options = document.createElement("OPTION");
   		options.value = "";
   		options.text = "-请选择-";
   		selObj.options.add(options);
	}
   	for(var i=0;i<nodes.length;i++)
   	{
		var options = document.createElement("OPTION");
   		options.value = nodes[i].selectSingleNode("COLOR_ID").text;
   		options.text = nodes[i].selectSingleNode("COLOR_NAME").text;
   		if(temp != options.value) {
   			selObj.options.add(options);
	   		temp = options.value;
	   		//设置select框选中
	   		if(selectedId)
	   		{
	   			if(options.value == selectedId)
	   			   options.selected = true;
	   		}
   		}
   	}
   	return true;

}

/**
 * selObj:页面selObj对象
 * 设置页面颜色框内容
 */
function setSelectOptionsForMaterialGroupColor(selObj ,selectedId, groupId)
{
	if(!selObj)
	{
		alert("请指明页面select对象");
		return false;
	}
	var dom = createDOMDocument();
	dom.load(g_webAppName+"/"+g_dataxmlPath+"/g_TR_MATERIAL_GROUP_COLOR.xml");
	if(dom == null)
	{
		alert("获取颜色主数据失败，请与系统管理员联系！");
		return ;
	}
	//清空现有options
	while(selObj.options && selObj.options.length>0)
	{
		selObj.options.remove(0);
	}
	var nodes = dom.selectNodes("//ROOT/ROW");
	var temp = "";
   	for(var i=0;i<nodes.length;i++)
   	{
		var options = document.createElement("OPTION");
		var modelId = nodes[i].selectSingleNode("GROUP_ID").text;
		if(groupId==modelId){
	   		options.value = nodes[i].selectSingleNode("COLOR_ID").text;
	   		options.text = nodes[i].selectSingleNode("COLOR_NAME").text;
	   		if(temp != options.value) {
	   			selObj.options.add(options);
		   		temp = options.value;
		   		//设置select框选中
		   		if(selectedId)
		   		{
		   			if(options.value == selectedId)
		   			   options.selected = true;
		   		}
	   		}
		}
   	}
   	return true;
}

/**
 * selObj:页面selObj对象
 * selectedId:设置select框选中值
 * 设置页面箱体尺寸框内容
 */
function setSelectOptionsForContainerSize(selObj ,selectedId)
{
	if(!selObj)
	{
		alert("请指明页面select对象");
		return false;
	}
	var dom = createDOMDocument();
	dom.load(g_webAppName+"/"+g_dataxmlPath+"/g_TT_VS_CONTAINER_SIZE.xml");
	if(dom == null)
	{
		alert("获取箱体尺寸主数据失败，请与系统管理员联系！");
		return ;
	}
	//清空现有options
	while(selObj.options && selObj.options.length>0)
	{
		selObj.options.remove(0);
	}
	var nodes = dom.selectNodes("//ROOT/ROW");
   	for(var i=0;i<nodes.length;i++)
   	{
		
		var options = document.createElement("OPTION");
   		options.value = nodes[i].selectSingleNode("CONTAINER_SIZE_ID").text;
   		options.text = nodes[i].selectSingleNode("CONTAINER_SIZE_DESC").text;
   		selObj.options.add(options);
   		//设置select框选中
   		if(selectedId)
   		{
   			if(options.value == selectedId)
   			   options.selected = true;
   		}
   	}
   	//其他
   	var options = document.createElement("OPTION");
	options.value = "";
	options.text = "其他";
	selObj.options.add(options);
	//设置select框选中
  	if(selectedId == "")
  	{
  		options.selected = true;
  	}
   	return true;

}

/**
 * selObj:页面selObj对象
 * selectedId:设置select框选中值
 * 设置页面举升类型框内容
 */
function setSelectOptionsForHydraulic(selObj ,selectedId)
{
	if(!selObj)
	{
		alert("请指明页面select对象");
		return false;
	}
	var dom = createDOMDocument();
	dom.load(g_webAppName+"/"+g_dataxmlPath+"/g_TT_VS_HYDRAULIC.xml");
	if(dom == null)
	{
		alert("获取举升类型主数据失败，请与系统管理员联系！");
		return ;
	}
	//清空现有options
	while(selObj.options && selObj.options.length>0)
	{
		selObj.options.remove(0);
	}
	var nodes = dom.selectNodes("//ROOT/ROW");
   	for(var i=0;i<nodes.length;i++)
   	{
		var options = document.createElement("OPTION");
   		options.value = nodes[i].selectSingleNode("HYDRAULIC_ID").text;
   		options.text = nodes[i].selectSingleNode("HYDRAULIC_DESC").text;
   		selObj.options.add(options);
   		//设置select框选中
   		if(selectedId)
   		{
   			if(options.value == selectedId)
   			   options.selected = true;
   		}
   	}
   	return true;

}

/**
 * dealerIds:经销商id
 * selObj:页面selObj对象
 * selectedId:设置select框选中值
 * 设置页面经销商地址框内容
 */
function setSelectOptionsForDealerAddress(dealerIds ,selObj ,selectedId)
{
	if(!selObj)
	{
		alert("请指明页面select对象");
		return false;
	}
	var dom = createDOMDocument();
	dom.load(g_webAppName+"/"+g_dataxmlPath+"/g_TM_VS_ADDRESS.xml");
	if(dom == null)
	{
		alert("获取经销商地址主数据失败，请与系统管理员联系！");
		return ;
	}
	//清空现有options
	while(selObj.options && selObj.options.length>0)
	{
		selObj.options.remove(0);
	}
	var nodes = dom.selectNodes("//ROOT/ROW");
   	for(var i=0;i<nodes.length;i++)
   	{
		if(dealerIds)
		{
			var dealerId = nodes[i].selectSingleNode("DEALER_ID").text;
			if(dealerId && dealerId == dealerIds)
			{
   				var options = document.createElement("OPTION");
		   		options.value = nodes[i].selectSingleNode("ADDRESS_ID").text;
		   		options.text = nodes[i].selectSingleNode("ADDRESS_NAME").text;
		   		selObj.options.add(options);
		   		//设置select框选中
		   		if(selectedId)
		   		{
		   			if(options.value == selectedId)
		   			   options.selected = true;
		   		}
			}
		}else
		{
	   		//判断是否是海外订单，如海外订单，只列出港口
	   		/*var addressType = nodes[i].selectSingleNode("ADDRESS_TYPE").text;
	   		if(addressType && addressType == '10361003')
	   		{
	   		   var options = document.createElement("OPTION");
	   		   if(nodes[i].selectSingleNode("ORG_NAME").text)
	   		      options.text = "(" + nodes[i].selectSingleNode("ORG_NAME").text +")"+ nodes[i].selectSingleNode("NAME").text;
	   		   else
	   		      options.text = nodes[i].selectSingleNode("NAME").text;
	   		   options.value = nodes[i].selectSingleNode("ID").text;
	   		   selObj.options.add(options);
	   		   //设置select框选中
	   		   if(selectedId)
	   		   {
	   			 if(options.value == selectedId)
	   			   options.selected = true;
	   		   }
	   		}*/
		}
   	}
   	return true;

}

/**
 * modelId:车型号
 * tabObj:页面tabObj对象
 * selectedIdType:类型选中值
 * selectedIdPart:配置选中值
 * 设置页面选装配置框内容
 */
function setSelectOptionsForOptionalConfig(modelId ,tabObj ,selectedIdType ,selectedIdPart)
{
	//alert(selectedIdType);
	//alert(selectedIdPart);
	if(!tabObj)
	{
		alert("请指明页面select对象");
		return false;
	}
	var dom_type = createDOMDocument();
	dom_type.load(g_webAppName+"/"+g_dataxmlPath+"/g_TM_OPTIONAL_TYPE.xml");
	if(dom_type == null)
	{
		alert("获取选装类别主数据失败，请与系统管理员联系！");
		return ;
	}
	var dom_part = createDOMDocument();
	dom_part.load(g_webAppName+"/"+g_dataxmlPath+"/g_TM_OPTIONAL_PART.xml");
	if(dom_part == null)
	{
		alert("获取选装配置主数据失败，请与系统管理员联系！");
		return ;
	}
	//清空现有table
	while(tabObj.rows && tabObj.rows.length>0)
	{
		tabObj.rows[tabObj.rows.length-1].removeNode(true);
	}
	
	var nodesType = dom_type.selectNodes("//ROOT/ROW");
	var nodesPart = dom_part.selectNodes("//ROOT/ROW");
	var perRow = 3;
	var count = 1;
	var countRows = nodesType.length;
	var newRow = null;
   	var newCell = null;
   	
    if(modelId)
    {
    	for(var i=0;i<nodesType.length;i++)
   		{
	   		var typeId_Type = nodesType[i].selectSingleNode("ID").text;  
	   		var groupId = nodesType[i].selectSingleNode("GROUP_ID").text;     
			if(groupId && groupId == modelId)
			{
				if(count%perRow == 1 && count<=nodesType.length)
		   		{
		   		     newRow = tabObj.insertRow();
		   		     newRow.align = "left";
		   		     //newRow.className = "zi";
		   		     newRow.style.height = "13pt";
		   		     newCell = newRow.insertCell();
		   		     newCell.style.border = "#A3A3A3 1px solid";
		   		     newCell.style.height = "35px";
		   		     newCell.align = "left";
		   		     newCell.style.width = "200px";
		   		     count++;
		   		}else
		   		{
		   			 newCell = newRow.insertCell();
		   			 newCell.style.border = "#A3A3A3 1px solid";
		   			 newCell.style.height = "35px";
		   		     newCell.align = "left";
		   		     newCell.style.width = "200px";
		   			 count++;
		   		}
	   		
				var selObj = document.createElement("SELECT");
		   		selObj.style.width = "110px";
		   		selObj.className = "SearchInput";
		   		selObj.id = "select"+typeId_Type;
	   			selObj.name = "select"+typeId_Type;
	   			//设置默认值
	   			//var checkObj = document.createElement("INPUT");
	   			//checkObj.type = "checkbox";
	   		    //checkObj.id = "check"+typeId_Type;
	   			//checkObj.name = "check"+typeId_Type;
	   			//checkObj.value = typeId_Type;
	   			//checkObj.onclick = new Function("showSelect("+typeId_Type+")");
	   			//设置type回显
	   			
	   			if(selectedIdType && selectedIdType.indexOf(typeId_Type)>=0)
	   			{
	   			    //对于特殊情况，例如自卸车底盘才可以出来的增加底盘的校验
	   			    if(typeId_Type==1000000021)
	   			    {
	   			    if(getModleAndVocValue(modelId))
	   			    	{
	   			    		newCell.innerHTML = "<INPUT type='checkbox' id='check"+typeId_Type+"' name='check"+typeId_Type+"' value='"+typeId_Type+"' onclick='showSelect("+typeId_Type+")' checked>";
	   			    		gongYong(newCell,nodesPart,typeId_Type,selectedIdPart,selObj,nodesType[i]);
	   			    	}
	   			    }else
	   			    {
	   			    	newCell.innerHTML = "<INPUT type='checkbox' id='check"+typeId_Type+"' name='check"+typeId_Type+"' value='"+typeId_Type+"' onclick='showSelect("+typeId_Type+")' checked>";
	   			    	gongYong(newCell,nodesPart,typeId_Type,selectedIdPart,selObj,nodesType[i]);
	   			    }
	   			}else
	   			{
	   			    //对于特殊情况，例如自卸车底盘才可以出来的增加底盘的校验
	   			    if(typeId_Type==1000000021)
	   			    {
	   			    if(getModleAndVocValue(modelId))
	   			    	{
	   				    	selObj.disabled = "disabled";
	   						newCell.innerHTML = "<INPUT type='checkbox' id='check"+typeId_Type+"' name='check"+typeId_Type+"' value='"+typeId_Type+"' onclick='showSelect("+typeId_Type+")'>";
	   						gongYong(newCell,nodesPart,typeId_Type,selectedIdPart,selObj,nodesType[i]);
	   					}	
	   				}else
	   			    {  
	   			        selObj.disabled = "disabled";
	   			    	newCell.innerHTML = "<INPUT type='checkbox' id='check"+typeId_Type+"' name='check"+typeId_Type+"' value='"+typeId_Type+"' onclick='showSelect("+typeId_Type+")'>";
	   			    	gongYong(newCell,nodesPart,typeId_Type,selectedIdPart,selObj,nodesType[i]);
	   			    }
	   			}
			}	
		}
    }else
    {
    	for(var i=0;i<nodesType.length;i++)
   		{
	   		var typeId_Type = nodesType[i].selectSingleNode("ID").text;  
	   		var groupId = nodesType[i].selectSingleNode("GROUP_ID").text;     
			if(count%perRow == 1 && count<=nodesType.length)
	   		{
	   		     newRow = tabObj.insertRow();
	   		     newRow.align = "left";
	   		     newRow.className = "zi";
	   		     newRow.style.height = "13pt";
	   		     newCell = newRow.insertCell();
	   		     newCell.style.border = "#A3A3A3 1px solid";
	   		     newCell.style.height = "35px";
	   		     newCell.align = "left";
	   		     newCell.style.width = "200px";
	   		     count++;
	   		}else
	   		{
	   			 newCell = newRow.insertCell();
	   			 newCell.style.border = "#A3A3A3 1px solid";
	   			 newCell.style.height = "35px";
	   		     newCell.align = "left";
	   		     newCell.style.width = "200px";
	   			 count++;
	   		}
   		
			var selObj = document.createElement("SELECT");
	   		selObj.style.width = "110px";
	   		selObj.className = "SearchInput";
	   		selObj.id = "select"+typeId_Type;
   			selObj.name = "select"+typeId_Type;
   			//设置默认值
   			selObj.disabled = "disabled";
   			var checkObj = document.createElement("INPUT");
   			checkObj.type = "checkbox";
   		    checkObj.id = "check"+typeId_Type;
   			checkObj.name = "check"+typeId_Type;
   			checkObj.value = "check";
   			//设置type回显
   			if(selectedIdType && selectedIdType.indexOf(typeId_Type)>=0)
   			{
   				checkObj.checked = true;
   			}
   			checkObj.onclick = new Function("showSelect("+typeId_Type+")");
   		    newCell.appendChild(checkObj);
   			gongYong(newCell,nodesPart,typeId_Type,selectedIdPart,selObj,nodesType[i]);
   			
		}
    }
   	return true;

}

function gongYong(newCell,nodesPart,typeId_Type,selectedIdPart,selObj,nodesTypeValue)
{
	var spanObj = document.createElement("SPAN");
	spanObj.innerText = nodesTypeValue.selectSingleNode("NAME").text+" ";
  	newCell.appendChild(spanObj);
	for(var j=0;j<nodesPart.length;j++)
	{
		var typeIdPart = nodesPart[j].selectSingleNode("TYPE_ID").text;
		if(typeIdPart == typeId_Type)
		{
			var options = document.createElement("OPTION");
	   		options.value = nodesPart[j].selectSingleNode("ID").text+"|"+nodesPart[j].selectSingleNode("NAME").text;
	   		options.text = nodesPart[j].selectSingleNode("NAME").text;
	   		selObj.options.add(options);
	   		//设置part回显
   			if(selectedIdPart && selectedIdPart.indexOf(nodesPart[j].selectSingleNode("ID").text)>=0)
   			{
   				options.selected = true;
   			}
	   		
		}
	}
	if(newCell)
	{
	   	newCell.appendChild(selObj);
	}
}

function getModleAndVocValue(modelId)
{
	var vehicleOrChassis=document.getElementById("CON_VEHICLE_OR_CHASSIS").value;//整车或者底盘
	var v=false;
	if((modelId==1000000006||modelId==1000000016||modelId==1000000026)&&vehicleOrChassis=="10121002")
	v=true;
	return v; 
}

function showSelect(obj)
{
  var checkObj = document.getElementById("check"+obj);
  var selectObj = document.getElementById("select"+obj);
  if(selectObj && checkObj && checkObj.checked)
  {
		selectObj.disabled = "";
  }else
  {
		selectObj.disabled = "disabled";
  }
}

/**
 * tabObj:页面tabObj对象
 * selectedIdType:类别选中值
 * selectedIdPart:配置选中值
 * 设置页面车辆用途框内容
 */
function setSelectOptionsForPurposeConfig(tabObj ,selectedIdType ,selectedIdPart)
{
	if(!tabObj)
	{
		alert("请指明页面select对象");
		return false;
	}
	var dom_type = createDOMDocument();
	dom_type.load(g_webAppName+"/"+g_dataxmlPath+"/g_TT_ORDER_PURPOSE_TYPE.xml");
	if(dom_type == null)
	{
		alert("获取车辆用途类别主数据失败，请与系统管理员联系！");
		return ;
	}
	var dom_part = createDOMDocument();
	dom_part.load(g_webAppName+"/"+g_dataxmlPath+"/g_TT_ORDER_PURPOSE.xml");
	if(dom_part == null)
	{
		alert("获取车辆用途主数据失败，请与系统管理员联系！");
		return ;
	}
	
	//清空现有table
	while(tabObj.rows && tabObj.rows.length>0)
	{
		tabObj.rows[tabObj.rows.length-1].removeNode(true);
	}
	
	var nodesType = dom_type.selectNodes("//ROOT/ROW");
	var nodesPart = dom_part.selectNodes("//ROOT/ROW");
	var perRow = 3;
	var count = 1;
	var countRows = nodesType.length;
	var newRow = null;
   	var newCell = null;
    for(var i=0;i<nodesType.length;i++)
	{
   		var typeId_Type = nodesType[i].selectSingleNode("ID").text;     
		if(count%perRow == 1 && count<=nodesType.length)
   		{
   		     newRow = tabObj.insertRow();
   		     newRow.align = "left";
   		     newRow.className = "zi";
   		     newRow.style.height = "13pt";
   		     newCell = newRow.insertCell();
   		     newCell.style.border = "#A3A3A3 1px solid";
   		     newCell.style.height = "35px";
   		     newCell.align = "left";
   		     newCell.style.width = "200px";
   		     count++;
   		}else
   		{
   			 newCell = newRow.insertCell();
   			 newCell.style.border = "#A3A3A3 1px solid";
   			 newCell.style.height = "35px";
   		     newCell.align = "left";
   		     newCell.style.width = "200px";
   			 count++;
   		}
	
		var selObj = document.createElement("SELECT");
   		selObj.style.width = "80px";
   		selObj.className = "SearchInput";
   		selObj.id = "vhclselect"+typeId_Type;
		selObj.name = "vhclselect"+typeId_Type;
		var spanObj = document.createElement("SPAN");
		spanObj.innerText = nodesType[i].selectSingleNode("NAME").text+" ";
		newCell.appendChild(spanObj);
		for(var j=0;j<nodesPart.length;j++)
		{
			var typeIdPart = nodesPart[j].selectSingleNode("TYPE_ID").text;
			if(typeIdPart == typeId_Type)
			{
				var options = document.createElement("OPTION");
		   		options.value = nodesPart[j].selectSingleNode("ID").text;
		   		options.text = nodesPart[j].selectSingleNode("NAME").text;
		   		selObj.options.add(options);
		   		//设置part回显
	   			if(selectedIdPart && selectedIdPart.indexOf(nodesPart[j].selectSingleNode("ID").text)>=0)
	   			{
	   				options.selected = true;
	   			}
			}
		}
		if(newCell)
		{
   			 newCell.appendChild(selObj);
		}
	}
   	return true;

}


/**
 * modelId:车型id
 * spanObj:页面spanObj对象
 * modifyObj:页面modifyObj对象
 * selObj:页面selObj对象
 * 设置整车、底盘是否显示
 */
function showVehicleOrChassis2(modelId ,spanObj, modifyObj, selObj) {   
    var ret = getNodeValByName("g_TM_VHCL_MATERIAL_GROUP", "IS_DISTINCT_V_C", modelId);
    var value=selObj.value;
    if(ret)
    {
     if(ret == 0)
     {
       spanObj.style.display = "inline";
       selObj.options.length=2;
       selObj.options[0].value="10121002";
       selObj.options[0].text="底盘";
       selObj.options[1].value="10121001";
       selObj.options[1].text="整车";
       if(value-0==10121001)
       {
       selObj.options[1].selected=true;
       }else
       {
       selObj.options[0].selected=true;
       } 
     }
     else if(ret==1)
     {
       spanObj.style.display = "inline";
       selObj.options.length=1;
       selObj.options[0].value="10121001";
       selObj.options[0].text="整车";
       spanObj.value="10121001";
       
     }else
     {
    spanObj.style.display = "inline";
    spanObj.value="10121002";
    selObj.options.length=1;
    selObj.options[0].value="10121002";
    selObj.options[0].text="底盘";
     }
    }else
    {
    spanObj.style.display = "inline";
    }
    if(selObj.value == "10121001"){
        if(showContainer(modelId))
        {
        modifyObj.style.display="inline";
        }else
        {
        modifyObj.style.display="none";
        }
		
	}else{
		modifyObj.style.display="none";
	}
}
/**
 * modelId:车型id
 * 设置上装信息是否显
 * RETURN TRUE可以显示,false不可以显示
 */
function showContainer(modelId) 
{   var a = getNodeValByName("g_TM_VHCL_MATERIAL_GROUP", "IS_CONTAINER", modelId);
    var b=true;
    if(a&&a==1)
    {
     b=true;
    }else
    {
    b=false;
    }
    return b;
}
/**
 * modelId:车型id
 * spanObj:页面spanObj对象
 * modifyObj:页面modifyObj对象
 * selected:设置回显
 * 设置取力器是否显示
 */
function showQuliQi(modelId,spanObj,modifyObj,selected) 
{   
	var a = getNodeValByName("g_TM_VHCL_MATERIAL_GROUP", "IS_PTO", modelId);
    if(a&&a==1)
    {    
    spanObj.style.display = "inline";
    modifyObj.value=1;
    if(selected&&selected==1)
     {
      modifyObj.checked="true";
     }else
     {
      modifyObj.checked="false";
     }
    }else
    {
    spanObj.style.display = "none";
    modifyObj.value=0;
    modifyObj.checked="false";
    }
}
/**
 * 校验身份证
 * added by andy.ten@tom.com 20091127
 */
function isIDCard(sValue)
{
    return UpID(sValue) ? true : false;
}


function trim(str)
{
  for (i = 0; i < str.length; i++) 
  {
     var ch = str.substring(i, i + 1)
	 if (ch != " ") 
	 {
     	str = str.substring(i, str.length)
     	for (i = str.length - 1; i >= 0; i--) 
     	{
           ch = str.substring(i, i + 1)
           if (ch != " ") 
           {
     	      str = str.substring(0, i + 1)
     	      break
           }
        }
     } else if (i == str.length-1) 
     {
     	 alert("请输入有效内容！");
         str = ""
     }
  }
  return str
}

/**
 * 把15或17位身份证升级位18位，并进行判断
 * added by andy.ten@tom.com 20091127
 */
function UpID(sId)
{
    var s = sId.trim();
    if (s.length == 15) 
    {
        if (isNaN(sId)) return false;
        if (verifyDate(s.substr(10,2),s.substr(8,2),s.substr(6,2)))
            return CalID_15to18(s);
        else
            return false;
    }
    else if (s.length == 17) 
    {
        if (isNaN(s)) return false;
        if (verifyDate(s.substr(12,2),s.substr(10,2),s.substr(8,2)))
        {
            return CalID_17to18(s);
        }    
        else
            return false;
    }
    else if (s.length == 18) 
    {
        if (isNaN(s.substr(0,17))) return false;
        if (verifyDate(s.substr(12,2),s.substr(10,2),s.substr(8,2))) 
        {
            if (CalID_17to18(s.substr(0,17)) == s)
                return s;
            else
                return false;
        }
        else
            return false;
    }
    return false;
}

/**
 * 判断指定日期是否正确
 * 当输入参数为verifyDate(dd,mm,ccyy)时，表示要检查年，月，日
 * 当输入参数为verifyDate(dd,mm) 表示默认年为当前年
 * 当输入参数为verifyDate(dd)    表示默认年，月为当前年月
 * 注意：输入月份保证在1-12以内。
 * added by andy.ten@tom.com 20091127
 */
function verifyDate(day,month,year)
{
    if (!day) return false;
    var iToday = new Date();
    month = month ? month-1 : iToday.getMonth();
    year = year ? parseInt(year,10) : iToday.getFullYear();
    var iDate = new Date(year,month,day);
    if ((iDate.getYear() == year) && (iDate.getMonth() == month) && (iDate.getDate() == day))
        return true;
    else
        return false;
}


/**
 * 根据17位身份证算出18位身份证
 * added by andy.ten@tom.com 20091127
 * 是否属于重复代码:是
 */

function CalID_17to18(sId)
{
    var aW = new Array(1,2,4,8,5,10,9,7,3,6,1,2,4,8,5,10,9,7);
    var aA = new Array("1","0","X","9","8","7","6","5","4","3","2");
    var aP = new Array(17);
    var aB = new Array(17);
    var i,iSum = 0;

    for (i=1;i<18;i++)
        aP[i] = sId.substr(17-i, 1);
    for (i=1;i<18;i++) {
        aB[i] = parseInt(aP[i]) * parseInt(aW[i]);
        iSum += aB[i];
    }
    return sId + aA[iSum%11];
}

/**
 * 根据15位身份证算出18位身份证
 * added by andy.ten@tom.com 20091127
 * 是否属于重复代码:是
 */
function CalID_15to18(sId)
{
    return CalID_17to18(sId.substr(0,6) + "19" + sId.substr(6));
}
function checkContainer()
{
	 var returnStr=true;
	 var testContainer=showContainer(document.getElementById("CON_GROUP").value);
	if (!document.getElementById("CON_ENABLE_DATE").value)
	   {
			alert("请输入期望交车日期!");
			returnStr=false;
		}
		else{
			var dateStr1 = (new Date()).pattern("yyyy-MM-dd");
			var dateStr2 = document.getElementById("CON_ENABLE_DATE").value;
			var dt1 =  new Date(dateStr1.replace(/-/g,"\/"));
			var dt2 =  new Date(dateStr2.replace(/-/g,"\/"));
			if(document.getElementById("CON_VEHICLE_OR_CHASSIS").value == "10121001"&&testContainer){
			  	if(dt2.getTime() - dt1.getTime() < 25*24*60*60*1000){
				    alert("期望交车日期不能小于25天!");
				    returnStr=false;
				}
			}
			else{
				if(dt2.getTime() - dt1.getTime() < 15*24*60*60*1000){
				    alert("期望交车日期不能小于15天!");
				    returnStr=false;
				}
			}
		}
	if (document.getElementById("CON_VEHICLE_OR_CHASSIS").value == "10121001"&&testContainer)
		{
			if (!document.getElementById("CON_CONTAINER_SIZE").value)
			{
				if (!isUnsignedNumeric(document.getElementById("CON_LENGTH"))||document.getElementById("CON_LENGTH").value==0)
				{
			       	document.getElementById("CON_LENGTH").value=0;
			        MyAlert(document.getElementById("CON_LENGTH"), "箱体长度不能为空，必须为数字!");
			        returnStr=false;
			    }
			    if (!isUnsignedNumeric(document.getElementById("CON_WIDTH"))||document.getElementById("CON_WIDTH").value==0)
			    {
			       	document.getElementById("CON_WIDTH").value=0;
			        MyAlert(document.getElementById("CON_WIDTH"), "箱体宽度不能为空，必须为数字!");
			        returnStr=false;
			    }
			    if (!isUnsignedNumeric(document.getElementById("CON_HEIGHT"))||document.getElementById("CON_HEIGHT").value==0)
			    {
			       	document.getElementById("CON_HEIGHT").value=0;
			        MyAlert(document.getElementById("CON_HEIGHT"), "箱体高度不能为空，必须为数字!");
			        returnStr=false;
			    }
			}
		    if (!isUnsignedNumeric(document.getElementById("CON_BOTTOM")))
		    {
		       	//document.getElementById("CON_BOTTOM").value=0;
		        MyAlert(document.getElementById("CON_BOTTOM"), "大箱底不能为空，必须为数字!");
		        returnStr=false;
		    }
		    if (!isUnsignedNumeric(document.getElementById("CON_BORDER")))
		    {
		       	//document.getElementById("CON_BORDER").value=0;
		        MyAlert(document.getElementById("CON_BORDER"), "大箱边不能为空，必须为数字!");
		        returnStr=false;
		    }
		}
		if(!testContainer)
		{
		document.getElementById("CON_CONTAINER_SIZE").value="";
		document.getElementById("CON_HYDRAULIC").value="";
		document.getElementById("CON_LENGTH").value="";
		document.getElementById("CON_WIDTH").value="";
		document.getElementById("CON_HEIGHT").value="";
		document.getElementById("CON_BOTTOM").value="";
		document.getElementById("CON_BORDER").value="";
		document.getElementById("CON_BOX_COLOR").value="";
		}
		return returnStr;
}

/**
 * selObj:页面selObj对象
 * 设置页面仓库下拉框内容
 */
function setSelectOptionsForWarehouse(selObj ,warehouseType ,selectedId ,flag)
{
	if(!selObj)
	{
		alert("请指明页面select对象");
		return false;
	}
	var dom = createDOMDocument();
	dom.load(g_webAppName+"/"+g_dataxmlPath+"/g_TM_WAREHOUSE.xml");
	if(dom == null)
	{
		alert("获取仓库主数据失败，请与系统管理员联系！");
		return ;
	}
	//清空现有options
	while(selObj.options && selObj.options.length>0)
	{
		selObj.options.remove(0);
	}
	if(flag){
		var options = document.createElement("OPTION");
   		options.value = "";
   		options.text = "-请选择-";
   		selObj.options.add(options);
	}
	var nodes = dom.selectNodes("//ROOT/ROW");
	var temp = "";
   	for(var i=0;i<nodes.length;i++)
   	{
		var options = document.createElement("OPTION");
		if(!warehouseType){
			options.value = nodes[i].selectSingleNode("WAREHOUSE_ID").text;
	   		options.text = nodes[i].selectSingleNode("WAREHOUSE_NAME").text;
	   		if(temp != options.value) {
	   			selObj.options.add(options);
		   		temp = options.value;
		   		//设置select框选中
		   		if(selectedId)
		   		{
		   			if(options.value == selectedId)
		   			   options.selected = true;
		   		}
	   		}
		}
		if(warehouseType&&warehouseType==nodes[i].selectSingleNode("WAREHOUSE_TYPE").text){
	   		options.value = nodes[i].selectSingleNode("WAREHOUSE_ID").text;
	   		options.text = nodes[i].selectSingleNode("WAREHOUSE_NAME").text;
	   		if(temp != options.value) {
	   			selObj.options.add(options);
		   		temp = options.value;
		   		//设置select框选中
		   		if(selectedId)
		   		{
		   			if(options.value == selectedId)
		   			   options.selected = true;
		   		}
	   		}
		}
   	}
   	return true;
}
/**
 * selObj:页面selObj对象
 * 设置页面库区下拉框内容
 */
function setSelectOptionsForReservoir(selObj ,warehouseId ,selectedId ,flag)
{
	if(!selObj)
	{
		alert("请指明页面select对象");
		return false;
	}
	var dom = createDOMDocument();
	dom.load(g_webAppName+"/"+g_dataxmlPath+"/g_TT_VS_RESERVOIR.xml");
	if(dom == null)
	{
		alert("获取库区主数据失败，请与系统管理员联系！");
		return ;
	}
	//清空现有options
	while(selObj.options && selObj.options.length>0)
	{
		selObj.options.remove(0);
	}
	if(flag){
		var options = document.createElement("OPTION");
   		options.value = "";
   		options.text = "-请选择-";
   		selObj.options.add(options);
	}
	var nodes = dom.selectNodes("//ROOT/ROW");
	var temp = "";
   	for(var i=0;i<nodes.length;i++)
   	{
		var options = document.createElement("OPTION");
		if(nodes[i].selectSingleNode("WAREHOUSE_ID").text==warehouseId){
	   		options.value = nodes[i].selectSingleNode("RESERVOIR_ID").text;
	   		options.text = nodes[i].selectSingleNode("RESERVOIR_NAME").text;
	   		if(temp != options.value) {
	   			selObj.options.add(options);
		   		temp = options.value;
		   		//设置select框选中
		   		if(selectedId)
		   		{
		   			if(options.value == selectedId)
		   			   options.selected = true;
		   		}
	   		}
		}
   	}
   	return true;
}
/**
 * selObj:页面selObj对象
 * 设置页面库位下拉框内容
 */
function setSelectOptionsForLocation(selObj ,reservoirId ,selectedId,flag)
{
	if(!selObj)
	{
		alert("请指明页面select对象");
		return false;
	}
	var dom = createDOMDocument();
	dom.load(g_webAppName+"/"+g_dataxmlPath+"/g_TT_VS_LOCATION.xml");
	if(dom == null)
	{
		alert("获取库位主数据失败，请与系统管理员联系！");
		return ;
	}
	//清空现有options
	while(selObj.options && selObj.options.length>0)
	{
		selObj.options.remove(0);
	}
	if(flag){
		var options = document.createElement("OPTION");
   		options.value = "";
   		options.text = "-请选择-";
   		selObj.options.add(options);
	}
	var nodes = dom.selectNodes("//ROOT/ROW");
	var temp = "";
   	for(var i=0;i<nodes.length;i++)
   	{
		var options = document.createElement("OPTION");
		if(nodes[i].selectSingleNode("RESERVOIR_ID").text==reservoirId){
	   		options.value = nodes[i].selectSingleNode("LOCATION_ID").text;
	   		options.text = nodes[i].selectSingleNode("LOCATION_NAME").text;
	   		if(temp != options.value) {
	   			selObj.options.add(options);
		   		temp = options.value;
		   		//设置select框选中
		   		if(selectedId)
		   		{
		   			if(options.value == selectedId)
		   			   options.selected = true;
		   		}
	   		}
		}
   	}
   	return true;
}

/**
 * selObj:页面selObj对象
 * selectedId:设置select框选中值
 * 设置页面承运商下拉框内容
 */
function setSelectOptionsForCarrier(selObj ,selectedId,flag)
{
	if(!selObj)
	{
		alert("请指明页面select对象");
		return false;
	}
	var dom = createDOMDocument();
	dom.load(g_webAppName+"/"+g_dataxmlPath+"/g_TT_VS_CARRIER.xml");
	
	if(dom == null)
	{
		alert("获取承运商主数据失败，请与系统管理员联系！");
		return ;
	}
	//清空现有options
	while(selObj.options && selObj.options.length>0)
	{
		selObj.options.remove(0);
	}
	if(flag){
		var options = document.createElement("OPTION");
   		options.value = "";
   		options.text = "-请选择-";
   		selObj.options.add(options);
	}
	var nodes = dom.selectNodes("//ROOT/ROW");
   	for(var i=0;i<nodes.length;i++)
   	{
		var options = document.createElement("OPTION");
   		options.value = nodes[i].selectSingleNode("CARRIER_ID").text;
   		options.text = nodes[i].selectSingleNode("CARRIER_NAME").text;
   		selObj.options.add(options);
   		//设置select框选中
   		if(selectedId)
   		{
   			if(options.value == selectedId)
   			   options.selected = true;
   		}
   	}
   	return true;

}


/**
 * selObj:页面selObj对象
 * selectedId:设置select框选中值
 * 设置页面市场活动类别下拉框内容
 */
function setSelectOptionsForMarketType(selObj ,selectedId,flag)
{
	if(!selObj)
	{
		alert("请指明页面select对象");
		return false;
	}
	var dom = createDOMDocument();
	dom.load(g_webAppName+"/"+g_dataxmlPath+"/g_TT_VS_MARKET_INFO_TYPE.xml");
	
	if(dom == null)
	{
		alert("获取市场信息类别主数据失败，请与系统管理员联系！");
		return ;
	}
	//清空现有options
	while(selObj.options && selObj.options.length>0)
	{
		selObj.options.remove(0);
	}
	if(flag){
		var options = document.createElement("OPTION");
   		options.value = "";
   		options.text = "-请选择-";
   		selObj.options.add(options);
	}
	var nodes = dom.selectNodes("//ROOT/ROW");
   	for(var i=0;i<nodes.length;i++)
   	{
		var options = document.createElement("OPTION");
   		options.value = nodes[i].selectSingleNode("TYPE_ID").text;
   		options.text = nodes[i].selectSingleNode("TYPE_NAME").text;
   		selObj.options.add(options);
   		//设置select框选中
   		if(selectedId)
   		{
   			if(options.value == selectedId)
   			   options.selected = true;
   		}
   	}
   	return true;

}
//设置底盘和整车内容和改装信息是否显示
/**
 * modelId:车型id
 * spanObj:页面spanObj对象
 * selObj:页面selObj对象
 * 设置整车、底盘是否显示
 */
/*
function showVehicleOrChassis(modelId ,spanObj, selObj,value) {  
    var ret = getNodeValByName("g_TM_VHCL_MATERIAL_GROUP", "FORCAST_FLAG", modelId,'',"GROUP_ID");
    //var value=selObj.value;
    //清空现有options
	while(selObj.options && selObj.options.length>0)
	{
		selObj.options.remove(0);
	}
    if(ret && ret==1)
    {
    	
       if(selObj)
       {
    	   selObj.options.length=1;
           selObj.options[0].value="11381001";
           selObj.options[0].text="整车";
       }
       spanObj.style.display = "none";
    }else
    {
    	if(selObj)
    	{
    		selObj.options.length=2;
        	selObj.options[0].value="11381001";
            selObj.options[0].text="整车";
            selObj.options[1].value="11381002";
            selObj.options[1].text="底盘";
            if(value){
	            if(value==11381001)
	        	{
	            	selObj.options[0].selected=true;
	            	spanObj.style.display = "inline";
	        	}
	            if(value==11381002)
	        	{	
	            	selObj.options[1].selected=true;
	            	spanObj.style.display = "none";
	        	}
	        }else
            {
        		selObj.options[1].selected=true;
            	spanObj.style.display = "none";
            }
    	}
    }	
}*/
function showVehicleOrChassis(modelId ,spanObj, selObj,value) {   
    var ret = getNodeValByName("g_TM_VHCL_MATERIAL_GROUP", "FORCAST_FLAG", modelId,'',"GROUP_ID");
	while(selObj.options && selObj.options.length>0)
	{
		selObj.options.remove(0);
	}
    if(ret && ret==1)
    {
       if(selObj)
       {
    	   selObj.options.length=1;
           selObj.options[0].value="11381001";
           selObj.options[0].text="整车";
       }	
       
       spanObj.style.display = "none";
    }else
    {
    	if(selObj)
    	{
    		selObj.options.length=2;
        	selObj.options[0].value="11381002";
            selObj.options[0].text="底盘";
            selObj.options[1].value="11381001";
            selObj.options[1].text="整车";
            selObj.options[0].selected=true;
    	}
        if(value)
        {
        	
        	if(value==11381001)
        	{
        		if(selObj) selObj.options[1].selected=true;
        		spanObj.style.display = "inline";
        	}
        	 
        	if(value==11381002)
        	{
        		if(selObj) selObj.options[0].selected=true;
        		spanObj.style.display = "none";
        	}
        }else
        {
        	spanObj.style.display = "none";
        }
        
    }
}
/**
 * modelId:车型id
 * spanObj1:页面spanObj1对象
 * spanObj2:页面spanObj2对象
 * selObj:页面selObj对象
 * 设置鞍座是否显示
 */
function showAz(modelId ,spanObj1,spanObj2, selObj,selectId) {   
    var ret = getNodeValByName("g_TM_VHCL_MATERIAL_GROUP", "FORCAST_FLAG", modelId,'',"GROUP_ID");
    //var value=selObj.value;
    //清空现有options
	while(selObj.options && selObj.options.length>0)
	{
		selObj.options.remove(0);
	}
    if(ret && ret==1)
    {
       if(selObj)
       {
    	   selObj.options.length=4;
    	   selObj.options[0].value="";
    	   selObj.options[0].text="-请选择-";
           selObj.options[1].value="11741001";
           selObj.options[1].text="50鞍座";
           selObj.options[2].value="11741002";
           selObj.options[2].text="90鞍座";
           selObj.options[3].value="11741003";
           selObj.options[3].text="90重型鞍座";
           if(selectId)
           {
    			if(selObj.options[1].value == selectId)
    				selObj.options[1].selected = true;
    			if(selObj.options[2].value == selectId)
    				selObj.options[2].selected = true;
    			if(selObj.options[3].value == selectId)
    				selObj.options[3].selected = true;
    			
    	   }else 
    		   selObj.options[0].selected=true;
       }	
       spanObj1.style.display = "inline";
       spanObj2.style.display = "inline";
    }else
    {
    	spanObj1.style.display = "none";
    	spanObj2.style.display = "none";
    }
	
}

