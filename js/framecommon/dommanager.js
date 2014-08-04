/**
 * <p>Title: InfoFrame3.0.Cc.V01</p>
 *
 * <p>Description: </p>
 *
 * <p>Copyright: Copyright (c) 2010</p>
 *
 * <p>Company: www.infoservice.com.cn</p>
 * <p>Date: 2010-1-29</p>
 *
 * @author andy 
 * @mail   andy.ten@tom.com
 * @version 1.0
 * @remark dom对象管理js
 */
 
var g_webAppName = "/dms";
var showException = "0"; //是否显示查询异常开关
/**
  * create by andy.ten@tom.com 2010-1-29
  * version:V01
  * s: 查询条件
  */
function showBackConditons(s,tabId) 
{
	try
	{
		var xmlDoc = createDOMDocument();
		xmlDoc.async = false;
		xmlDoc.loadXML(s);
		//alert(xmlDoc.xml);
		var pageInfo = xmlDoc.selectSingleNode("//ROOT/PAGEINFO");
		var curPage = pageInfo.getAttribute("curpage");
		if(!curPage) curPage = 1;
		if($(tabId).bindCurPage)
			$($(tabId).bindCurPage).value = curPage;
		else if($("curPage"))
				$("curPage").value = curPage;
        var t = "pageInput_" + tabId;
        if($(t))
        	$(t).value = curPage;
		var condition = xmlDoc.selectNodes("//ROOT/CONDITIONS/CONDITION");
		if(condition && condition.length && condition.length>0)
		{
			for(var i=0;i<condition.length;i++)
			{
				var inputId = condition[i].getAttribute("id");
				var inputVal = condition[i].selectSingleNode("VALUE").text;
				if(inputId)
				{
					if($(inputId).tagName == "SELECT")
					{
						var s = reformat(inputVal);
						if(s && s.indexOf(",")>0)
							$(inputId).value = "";
						else
							$(inputId).value = s;
					}else
						$(inputId).value = reformat(inputVal);
				}
			}
		}
	}catch(e){} 
}	

/**
  * create by andy.ten@tom.com 2010-1-29
  * version:V01
  * tab: 查询条件tab对象
  */
function doCombineCond(tab) 
{
	if(!tab) return false;
    var sXML = "";
    var len;
    var arr_Condition = [];
    var inputs = tab.getElementsByTagName("INPUT");
    if(inputs && inputs.length > 0)
    {
    	var sId, sDataSource, sValue, sCode, sOperation, sKind, sMaxlenth, sDateFormat, sAction,isReplace;
    	for(var i=0;i<inputs.length;i++)
    	{
    		if(inputs[i].type == "radio" || inputs[i].type == "checkbox")
    		   continue;
    		   
    		//查询条件如果action="ignore" ，则不组查询条件
    		if(inputs[i].action && inputs[i].action.toLowerCase() == "ignore")
    		   continue;
    		
    		if(inputs[i].datasource && inputs[i].value.length > 0)
    		{
    			//value
    			sValue = inputs[i].value;
    			if(format(sValue)=="") continue;
    			len = arr_Condition.length;
    			sId = inputs[i].id;
    			//maxlength
    			sMaxLength = inputs[i].maxlength ? inputs[i].maxlength:"";
    			//kind
    			sKind = inputs[i].kind ? inputs[i].kind.toLowerCase():"";
    			//datasource
    			sDataSource = inputs[i].datasource.toUpperCase();
    			//value
    			sCode = sDataSource;
    			sAction = inputs[i].action ? inputs[i].action.toLowerCase():"";
    			
    		    if(sKind == "date" || sKind == "datetime")
    		    {
    		    	if(inputs[i].code)
    		    		sCode = inputs[i].code;
    		    	if(inputs[i].dateformat)
    		    		sDateFormat = inputs[i].dateformat;
    		    	else
    		    	    sDateFormat = "YYYY-MM-DD";
    		    }else if (sKind == "code")
    		    {
    		    	if(inputs[i].code)
    		    		sCode = inputs[i].code;
    		    }
    		    //operation
    		    sOperation = inputs[i].operation ? inputs[i].operation : "=";
				sOperation = sOperation.replace(/</,"&lt;");
				sOperation = sOperation.replace(/>/,"&gt;");
				
				//isReplace
				if(inputs[i].isReplace=="true"){
					isReplace = true;
				}else{
					isReplace = false;
				}
                
                if(!sDateFormat) sDateFormat = "";
                if(!sOperation) sDateFormat = "=";
                
                arr_Condition[len] =makeCondition(sId,sDataSource, sValue, sCode, sOperation, sKind, sDateFormat, sAction,isReplace);      		
    		}	  
    	}
    }
    //拼接textarea
    var textArea = tab.getElementsByTagName("TEXTAREA");
    if(textArea && textArea.length > 0)
    {
    	var sId, sDataSource, sValue, sCode, sOperation, sKind, sMaxlenth, sDateFormat, sAction;
    	for(var i=0;i<textArea.length;i++)
    	{
    		//查询条件如果action="ignore" ，则不组查询条件
    		if(textArea[i].action && textArea[i].action.toLowerCase() == "ignore")
    		   continue;
    		if(textArea[i].datasource && textArea[i].value.length > 0)
    		{
    			//value
    			sValue = textArea[i].value;
    			if(format(sValue)=="") continue;
    			sId = textArea[i].id;
    			len = arr_Condition.length;
    			//maxlength
    			sMaxLength = textArea[i].maxlength ? textArea[i].maxlength:"";
    			//kind
    			sKind = textArea[i].kind ? textArea[i].kind.toLowerCase():"";
    			//datasource
    			sDataSource = textArea[i].datasource.toUpperCase();
    			
    			sCode = sDataSource;
    			
    			sAction = textArea[i].action ? textArea[i].action.toLowerCase():"";
    		    //operation
    		    sOperation = textArea[i].operation ? textArea[i].operation : "=";
				sOperation = sOperation.replace(/</,"&lt;");
				sOperation = sOperation.replace(/>/,"&gt;");
                if(!sDateFormat) sDateFormat = "";
                if(!sOperation) sDateFormat = "=";
                arr_Condition[len] =makeCondition(sId,sDataSource, sValue, sCode, sOperation, sKind, sDateFormat, sAction);
    		}	  
    	}
    }	
    //拼接select
    var selectO = tab.getElementsByTagName("SELECT");
    if(selectO && selectO.length > 0)
    {
    	var sId, sDataSource, sValue, sCode, sOperation, sKind, sMaxlenth, sDateFormat, sAction;
    	for(var i=0;i<selectO.length;i++)
    	{
    		//查询条件如果action="ignore" ，则不组查询条件
    		if(selectO[i].action && selectO[i].action.toLowerCase() == "ignore")
    		   continue;
    		if(selectO[i].datasource)
    		{
    			//value
    			sValue = selectO[i].value;
    			sId = selectO[i].id;
    			len = arr_Condition.length;
    			//maxlength
    			sMaxLength = selectO[i].maxlength ? selectO[i].maxlength:"";
    			//kind
    			sKind = selectO[i].kind ? selectO[i].kind.toLowerCase():"";
    			//datasource
    			sDataSource = selectO[i].datasource.toUpperCase();
    			
    			
    			 //operation
    		    sOperation = selectO[i].operation ? selectO[i].operation : "=";
				sOperation = sOperation.replace(/</,"&lt;");
				sOperation = sOperation.replace(/>/,"&gt;");

    			if(!sValue)
    			{
    				sOperation = "in";
    				var options = selectO[i].options;
    				if(options)
    				{
    					for(var j=0;j<options.length;j++)
    					{
    						if(sValue)
    							sValue += "," + options[j].value;
    						else
    							sValue += options[j].value;
    					}
    				}
    			}
    			if(!sValue) continue;
    			sCode = sDataSource;
    			
    			sAction = selectO[i].action ? selectO[i].action.toLowerCase():"";
    				
                
                if(!sDateFormat) sDateFormat = "";
                if(!sOperation) sDateFormat = "=";
                arr_Condition[len] =makeCondition(sId,sDataSource, sValue, sCode, sOperation, sKind, sDateFormat, sAction);      		
    		}	  
    	}
    }
    var xmlConditions= appendConditions(arr_Condition,tab);
    
    //设置页面固定域
    if(document.getElementById("querycondition"))
    	document.getElementById("querycondition").value = xmlConditions;
    	
    //sXML = addXmlHead("",xmlConditions);
    sXML = xmlConditions;
    //alert("debug:"+sXML);
    return  sXML;
}

function addXmlHead(sPredicate,strConditions)
{
    try 
    {
        var sXML = "<?xml version='1.0'?>" + strConditions;
            
       return sXML;
    }
    catch (e) 
    {
        return null;
    }
}

function appendConditions(arr_xmlCondition,tab)
{
    try 
    {
        var sXML="";
        if(arr_xmlCondition != null && arr_xmlCondition.length >0)
        {
          for(var n=0;n<arr_xmlCondition.length;n++)
          {
	           if(arr_xmlCondition[n]!=null)
	           {
	            	sXML+=arr_xmlCondition[n];
	           }
          }
        }
        var curPage = 1;
        var s = "pageInput_" + tab.id;
        var tabBindPage;
        //获取列表tabId
        var tabs = document.getElementsByTagName("TABLE");
        for(var i=0;i<tabs.length;i++)
        {
        	if(tabs[i].bindQTab && tabs[i].bindQTab == tab.id)
        	{
        		s = "pageInput_" + tabs[i].id;
        		
        		if(tabs[i].bindCurPage)
        			tabBindPage = tabs[i].bindCurPage;
        		break;
        	}
        }
        if($(s) && $(s).value)
        {
//        	alert(33);
        	curPage = $(s).value;
        }else
        {
        	if($(tabBindPage))
        	{
        		curPage = $(tabBindPage).value;
        	}else if($("curPage"))
        	{
        		curPage = $("curPage").value;
        	}
        }
        sXML = "<ROOT><PAGEINFO curpage='"+curPage+"' /><CONDITIONS>" + sXML + "</CONDITIONS></ROOT>";
        //alert(sXML);
        return sXML;
    }
    catch (e) 
    {
        return "<ROOT><PAGEINFO curpage='1' /><CONDITIONS></CONDITIONS></ROOT>";
    }
}
function makeCondition(sId,datasource,value,code, operation, kind, dateformat, sAction,isReplace)
{
    try 
    {
        var sXML = "<CONDITION id='"+ sId +"'>" +
            "<DATASOURCE code='" + code + "'>" + datasource + "</DATASOURCE>" +
            "<OPERATION>" + operation + "</OPERATION>" +
            "<VALUE>" + format(value) + "</VALUE>" +
            "<KIND>" + format(kind) + "</KIND>" +
            "<DATEFORMAT>" + format(dateformat) + "</DATEFORMAT>" +
            "<ACTION>" + format(sAction) + "</ACTION>" +
            "<ISREPLACE>" + format(isReplace) + "</ISREPLACE>" +
            "</CONDITION>";

        return sXML;
    }
    catch (e) 
    {
        return null;
    }
}

function format(s)
{
	var ss = s;
	try
	{
		ss = s.replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/\r\n/g,"^^");
		ss = ss.trim();
	}catch(e){}
    return ss;
}

//added by andy.ten@tom.com 2010-12-06
function reformat(s)
{
	
	var ss = s.replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/\^\^/g,"\r\n");
    return ss;
}

/**
  * create by andy.ten@tom.com 2010-1-29
  * Ajax提交
  * version:V01
  * sActionURL: 提交actionUrl
  * submitData：传递参数，xml格式，可为空
  * tabList:返回的结果集生成的列表对象
  */
function doSubmitByXmlHttp(sActionURL, querycondition ,tabList ,ncurrentpagenum, ntotalpagenum, nrecordsperpage, ncountrows) 
{
	if(!querycondition && document.getElementById("querycondition"))
	    querycondition = document.getElementById("querycondition").value;
	    
	if (!querycondition) 
	{
		querycondition = "<ROOT><CONDITION/></ROOT>";
	}
	
	var xmlDoc = createDOMDocument();
	xmlDoc.async = false;

	xmlDoc.loadXML(querycondition);
	if(xmlDoc.selectSingleNode("//ROOT/PAGEINFO"))
	{
	  	if(!nrecordsperpage)
	  		nrecordsperpage = rowsPerPage;
		xmlDoc.selectSingleNode("//ROOT/PAGEINFO").setAttribute("recordsperpage",nrecordsperpage);
	  	if(ncurrentpagenum)
	  	{
	      	xmlDoc.selectSingleNode("//ROOT/PAGEINFO").setAttribute("currentpagenum",ncurrentpagenum);
	  	}
	  	if(ntotalpagenum && ntotalpagenum >= 0)
	  	{
	    	xmlDoc.selectSingleNode("//ROOT/PAGEINFO").setAttribute("totalpage",ntotalpagenum);
	  	}
	  	if(ncountrows && ncountrows >= 0)
	  	{
	  		xmlDoc.selectSingleNode("//ROOT/PAGEINFO").setAttribute("countrows",ncountrows);
	  	}
	} 	
		
	if (!sActionURL) 
	{
		alert("请求路径无效，请与系统管理员联系！");
		return false;
	} else 
	{
		if (sActionURL.substring(0, 1) != "/") 
		{
			sActionURL = "/" + sActionURL;
		}
		if (sActionURL.indexOf(g_webAppName) < 0) 
		{
			sActionURL = g_webAppName + sActionURL;
		}
	}
	if(tabList)
	{
		tabList.queryaction = sActionURL;
		tabList.querycondition = querycondition;
	}else
	{
		if(document.getElementById("querycondition"))
		   document.getElementById("querycondition").value = querycondition;
		if(document.getElementById("queryaction"))
		   document.getElementById("queryaction").value = actionURL;   
	}
	
	try 
	{
		var xmlhttp2 = new ActiveXObject("Msxml2.XMLHTTP");
		xmlhttp2.Open("POST", sActionURL, false);
		xmlhttp2.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 
    	xmlhttp2.setRequestHeader("Charset","UTF-8");
        //alert(xmlDoc.xml);
		xmlhttp2.Send("inputxml="+xmlDoc.xml+"&loginSession=1");
		var res = "";
		/**
		 * ext用法，但是前提是页面必须引用js类库:prototype.js
		 */
//		new Ajax.Request(sActionURL, 
//		{
//			method:'post',
//			parameters:"inputxml="+querycondition,
//			onFailure: function(){ alert('无法链接服务器！') },  
//	  		onSuccess: function(transport){
//					res = transport.responseText;
//	 			} 
//	 	});
	    var res = "";
	    //alert(xmlhttp2.responseText);
	    if(xmlhttp2.readyState && xmlhttp2.readyState == 4)
	    {
	    	var status = xmlhttp2.status;
	    	if(!status || (status >= 200 && status<300))
	    	{
	    		res = xmlhttp2.responseText;	
	    	}else
	    	{
	    		alert("没有返回应答结果!") ;
				return false;
	    	}
	    }
		//alert("result:"+res);
		xmlhttp2 = null;
		
  		//调试信息
		if (document.getElementById("res")) 
		{
			document.getElementById("res").innerText = res;
		}
		
  		if(!res)
  		{
			alert("没有返回应答结果!") ;
			return false;
  		}
  		var xmlDom = createDOMDocument();
  		try
  		{
      	   xmlDom.loadXML(res);
  		}catch (ee)
  		{
  			alert("查询返回结果无效，请与系统管理员联系！");
  			xmlDom = null;
  			return false;
  		}
  		if(!xmlDom.selectSingleNode("//response"))
  		{
  		   document.write(res);
  		   /**
  		   if(tabList)
  		   {
  		   	   tabList.clearResult();
  		   	   var rowObj = tabList.insertRow();
  		   	   var cellObj=rowObj.insertCell();   
               cellObj.align="center";    
 			   cellObj.innerHTML="<font color='red'>没有查询到任何符合条件的相关数据!</font>";   
			   cellObj.colSpan = tabList.rows[0].cells.length;  
  		   }else
  		   {
  		       document.write(res);
  		   }
  		   */    
  		   return false;
  		}      
  		//alert(res);
  		//调试结束
  		if(xmlDom.selectNodes("//response/OUTPUTXML/SESSION"))
  		{
  		   var session = xmlDom.selectNodes("//response/OUTPUTXML/SESSION").text;	
  		   if(session == false)
  		   {
  		   	  alert("当前登录用户会话已失效，请重新登录！");
  		   	  return false;
  		   }
  		}
  		
  		
  		//生成列表
  		var rows = xmlDom.selectNodes("//response/OUTPUTXML/ROOT/ROW");
  		if(tabList)
  		{
  			var objHtc = tabList.pagecontrol? window.document.getElementById(tabList.pagecontrol):null;
			
			if(!rows || rows.length==0)
			{
				if(objHtc) objHtc.setnum(0,0,0,0);
				tabList.clearResult();
  		   	    var rowObj = tabList.insertRow();
  		   	    var cellObj=rowObj.insertCell();   
                cellObj.align="center";    
 			    cellObj.innerHTML="<font color='red'>没有查询到任何符合条件的相关数据!</font>";   
			    cellObj.colSpan = tabList.rows[0].cells.length;
				return true;
			}
  			tabList.clearResult();
  			tabList.listResult(xmlDom);
  			if(tabList.order > -1)
			{
				try
				{
					if(tabList.rows[0].cells[tabList.order].ordertype && tabList.rows[0].cells[tabList.order].ordertype.toLowerCase() == "local")
						tabList.doTabListSort(tabList.rows[0].cells[tabList.order]);
				}catch(e){}
			}
  		}

		if(!nrecordsperpage)
			nrecordsperpage = rowsPerPage;
			
		if(xmlDom.selectSingleNode("//response/OUTPUTXML/ROOT/PAGEINFO/@recordsperpage"))
			nrecordsperpage = xmlDom.selectSingleNode("//response/OUTPUTXML/ROOT/PAGEINFO/@recordsperpage").text;
			
		if(xmlDom.selectSingleNode("//response/OUTPUTXML/ROOT/PAGEINFO/@currentpagenum"))
			ncurrentpagenum = xmlDom.selectSingleNode("//response/OUTPUTXML/ROOT/PAGEINFO/@currentpagenum").text;
		else if(!ncurrentpagenum) ncurrentpagenum = '0';
		
		if(xmlDom.selectSingleNode("//response/OUTPUTXML/ROOT/PAGEINFO/@totalpage"))
			ntotalpagenum = xmlDom.selectSingleNode("//response/OUTPUTXML/ROOT/PAGEINFO/@totalpage").text;
		else if(!ntotalpagenum) ntotalpagenum = '0';
		
		if(xmlDom.selectSingleNode("//response/OUTPUTXML/ROOT/PAGEINFO/@countrows"))
			ncountrows = xmlDom.selectSingleNode("//response/OUTPUTXML/ROOT/PAGEINFO/@countrows").text;
			
		else if(!ncountrows) ncountrows = '0';
		//alert(ncurrentpagenum+":"+ntotalpagenum+":"+nrecordsperpage+":"+ncountrows);
		
		initPreNextPageControl(ncurrentpagenum,ntotalpagenum,nrecordsperpage,ncountrows,objHtc);
  		
  		xmlDom = null;
		return true;
	}
	catch (e) 
	{
		alert(e.description);
		xmlhttp2 = null;
		return null;
	}
}
/**
 * create by andy.ten@tom.com 2010-1-29
 * 创建 XMLDocument 对象
 * return 空的dom对象
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


function initPreNextPageControl(nCurrentPage,nTotalPage,nrecordsperpage,ncountrows,objHtc)
{
	
	if(!objHtc || objHtc==null)
    	objHtc = document.getElementsByTagName("newcontrol")?document.getElementsByTagName("newcontrol").item(0):null;
    if(objHtc)
    {
    	if(!nrecordsperpage) nrecordsperpage = rowsPerPage;
    	if(!nCurrentPage) nCurrentPage = '0';
    	if(!nTotalPage) nTotalPage = '0';
    	if(!ncountrows) ncountrows = '0';
    	objHtc.setnum(nCurrentPage,nTotalPage,nrecordsperpage,ncountrows);
	}
}

function PreNextFlashRownum(obj)
{
    var objHtc = obj?obj:(event?(event.srcElement?event.srcElement:null):null);
    
    var tablist = objHtc.tablist ? document.getElementById(objHtc.tablist):null;
    var queryaction = "";
    var querycondition = "";
    if(tablist && tablist.queryaction)
        queryaction = tablist.queryaction;
    else
    {
    	queryaction = document.getElementById("queryaction");
    	querycondition = document.getElementById("querycondition");
    }
    
    doSubmitByXmlHttp(queryaction,querycondition, tablist, objHtc.currentnum, objHtc.totalnum, objHtc.rowsperpage, objHtc.countrows);
}


function doSubmit(sActionURL ,submitData)
{
	var xmlhttp2 = new ActiveXObject("Msxml2.XMLHTTP");
	if(!sActionURL)
	{
		alert("请求路径无效，请与系统管理员联系！");
		return false;
	}else
	{
		if(sActionURL.substring(0,1)!="/")
			sActionURL = "/" + sActionURL ;
		if(sActionURL.indexOf(g_webAppName)<0)
			sActionURL = g_webAppName + sActionURL;
	}
	try
 	{
 		
  		xmlhttp2.Open("POST",sActionURL,false);
  		xmlhttp2.Send(null);
  		var res = xmlhttp2.responseText;
  		xmlhttp2 = null;
  		//调试信息
  		if(document.all("res")) document.all("res").innerText = res;
  		//alert(res);
  		//调试结束
  		return res;
  	}
  	catch(e)
  	{
  		alert('系统错误！无法提交请求！');
			xmlhttp2 = null;
			return null;
  	}
} 
