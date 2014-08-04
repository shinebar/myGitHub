
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
 * @remark 页面默认引用js
 */
 
 
 
/*********全局变量定义区***********/

var g_webAppName = "/dms";   //全局webcontent应用名，避免js使用"<%=request.getContextPath()%>"
var g_webAppImagePath = "/dms/images";   //全局图片路径
var rowsPerPage = 10; //默认查询返回结果行数
var g_float = null;

var g_ResultFlag = false;
/******** end ******************/

/**
 * added by andy.ten@tom.com 
 * 页面初始化
 */
if (typeof(window.attachEvent) != "undefined")
{
    window.attachEvent("onload", doLoadPage);
    window.attachEvent("onunload", doClose);
}else
{
    if (window.onload != null)
    {
        var oldOnload = window.onload;
        window.onload = function (e) 
        {
            doLoadPage();
            oldOnload(e);
        };
    }
    else
    {
        window.onload = doLoadPage;
    }

    if (window.onunload != null)
    {
        var oldOnunload = window.onunload;
        window.onunload = function (e) 
        {
        	oldOnunload(e);
            doClosePage();
        };
    }
    else
    {
        window.onunload = doClosePage;
    }
}

/**
 * added by andy.ten@tom.com 
 * onload初始化方法，页面覆盖doInit()方法
 */
function doLoadPage()
{
	try 
	{
		//g_float = new FloatWin();
	    setMustStyle();
	    setBtnStyle();
	    //setFixArea();
	    //校验输入域提示框
	    createTip();
		addListener();
        doInit();
    }
	
    catch (e)
    {}
}

/**
 * 校验提示框
 */
var validateConfig = new Object(
{
	divCount : 1,
	isOnBlur : true,
	timeOut : 3000
});
var validateobjarr = new Array();
var tipid = "checkMsgDiv";

function createTip() 
{
	var count = validateConfig.divCount;
	for(var n=0; n<count; n++) 
	{
		createTipDiv(tipid+""+n);
		validateobjarr.push(tipid+""+n);
	}
}

function createTipDiv(did) 
{
	var tip=document.createElement("div"); 
	tip.setAttribute("id",did); 
	tip.style.visibility = "hidden";
	tip.className = "tipdiv";
	
	var nt = "";
	nt += "  <table width=\"120\" height=\"28\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"  id=\"checkMsgTable\">";
	  nt += "    <tr> ";
	  nt += "      <td  valign=\"bottom\"><img src="+g_webAppName+"/js/validate/alert_top.gif width=\"120\" height=\"6\"></td>";  
	  nt += "    </tr>";
	  nt += "    <tr> ";
	  nt += "      <td  valign=\"top\">";   
	  nt += "          <table width=\"120\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"  id=\"checkMsgTable\" style=\"font:9pt 宋体;\" >";
	  nt += "            <tr> "; 
	  //nt += "                <td  width=\"8\" valign=\"bottom\"></td>";
	  nt += "                <td width=\"136\" valign=\"top\" id=\""+did+"_msg\" background="+g_webAppName+"/js/validate/alert_middle.gif  align=\"center\" style=\"font:9pt 宋体;\">test </td>";
	  //nt += "                <td  width=\"8\" valign=\"bottom\"></td>";  
	  nt += "            </tr>";  
	  nt += "          </table>";
	  nt += "      </td>"; 
	  nt += "    </tr>";
	  nt += "    <tr>"; 
	  nt += "      <td height=\"10\" valign=\"top\"><img src="+g_webAppName+"/js/validate/alert_bottom.gif width=\"120\" ></td>";
	  nt += "    </tr>";
	  nt += "  </table>";
  	tip.innerHTML = nt;
  	//alert(tip.innerHTML);
	document.body.appendChild(tip); 
}

/**
 * added by andy.ten@tom.com 
 * 设置页面input框必填项样式
 */
function setMustStyle(arrInputs)
{
    if(arrInputs && typeof(arrInputs) == "object" && arrInputs.length > 0)
    {
    	for(var n=0;n<arrInputs.length;n++)
    	{
    		if(!arrInputs[n].datatype) continue;
			var dateType = arrInputs[n].datatype;
			var must_s = false;
			var arr = dateType.split(",");
			if(arr && arr.length > 0)
			{
				if(arr[0] == 0)
					must_s = true;
			    //设置input框的maxlength属性
			    if(arr[2])
			    {
			    	var maxLen = arr[2];
			    	try
			    	{
			    		arrInputs[n].setAttribute("maxlength",maxLen);
			    	}catch(e)
			    	{}
			    }	
			}
			//屏蔽hidden域
			if(arrInputs[n].type != "hidden" && must_s == true)
			{
				var s = document.createElement("SPAN");
				with(s.style)
				{
					fontSize = "9pt";
                    color = "red";
                    width = 7;
                    paddingLeft = "2px";
                    height = "18px";
				}
				s.innerText = "*";
				//modify 2010-06-03 start
				arrInputs[n].parentElement.insertBefore(s,arrInputs[n].nextSibling);
				//modify 2010-06-03 end
			}
    	}
    }else
    {
		//设置input输入框must=true样式
		var inputs = document.getElementsByTagName("INPUT");
		if(inputs && inputs.length)
		{
			for(var i=0;i<inputs.length;i++)
			{
				if(!inputs[i].datatype) continue;
				var dateType = inputs[i].datatype;
				var must_s = false;
				var arr = dateType.split(",");
				if(arr && arr.length > 0)
				{
					if(arr[0] == 0)
						must_s = true;
				    //设置input框的maxlength属性
				    if(arr[2])
				    {
				    	var maxLen = arr[2];
				    	try
				    	{
				    		inputs[i].setAttribute("maxlength",maxLen);
				    	}catch(e)
				    	{}
				    }	
				}
				//屏蔽hidden域
				if(inputs[i].type != "hidden" && must_s == true)
				{
					var s = document.createElement("SPAN");
					with(s.style)
					{
						fontSize = "9pt";
	                    color = "red";
	                    width = 7;
	                    paddingLeft = "2px";
	                    height = "18px";
					}
					s.innerText = "*";
					//modify  2010-06-03 start
					inputs[i].parentElement.insertBefore(s,inputs[i].nextSibling);
					//modify  2010-06-03 end
				}
			}
		}
		//设置textarea输入框must=true样式
		var textareas = document.getElementsByTagName("TEXTAREA");
		if(textareas && textareas.length)
		{
			for(var i=0;i<textareas.length;i++)
			{
				
				if(!textareas[i].datatype) continue;
				var dateType = textareas[i].datatype;
				var must_s = false;
				var arr = dateType.split(",");
				if(arr && arr.length > 0)
				{
					if(arr[0] == 0)
						must_s = true;
				}
				//屏蔽hidden域
				if(textareas[i].style.display != "none" && must_s == true)
				{
					var s = document.createElement("SPAN");
					with(s.style)
					{
						fontSize = "9pt";
	                    color = "red";
	                    width = 7;
	                    paddingLeft = "2px";
	                    height = "18px";
					}
					s.innerText = "*";
					textareas[i].parentElement.appendChild(s);
				}
			}
		}
		/**
		//设置select框must=true样式
		var selects = document.getElementsByTagName("SELECT");
		if(selects && selects.length)
		{
			for(var i=0;i<selects.length;i++)
			{
				
				if(!selects[i].datatype) continue;
				var dateType = selects[i].datatype;
				var must_s = false;
				var arr = dateType.split(",");
				if(arr && arr.length > 0)
				{
					if(arr[0] == 0)
						must_s = true;
				}
				//屏蔽hidden域
				if(selects[i].style.display != "none" && must_s == true)
				{
					var s = document.createElement("SPAN");
					with(s.style)
					{
						fontSize = "9pt";
	                    color = "red";
	                    width = 7;
	                    paddingLeft = "2px";
	                    height = "18px";
					}
					s.innerText = "*";
					selects[i].parentElement.appendChild(s);
				}
			}
		}	
		*/
	}	
}

/**
 * added by andy.ten@tom.com 
 * 设置页面input框必填项样式
 */
function setBtnStyle(arrInputs)
{
    //设置input输入框hasbtn=true样式
    if(arrInputs && typeof(arrInputs) == "object" && arrInputs.length > 0)
    {
    	for(var n=0;n<arrInputs.length;n++)
    	{
    	    var imgObj=document.createElement("IMG");
		    imgObj.src = g_webAppImagePath+"/default/btn.gif";
	   		imgObj.id  = "srtImg";
		    imgObj.width = 15;
		    imgObj.height = 15;
		    imgObj.title = "点击按钮";
			imgObj.style.cursor = "pointer"; //添加点击样式为“手”		    		    
	        var btn = document.createElement("SPAN");
	        btn.appendChild(imgObj);
		    if(arrInputs[n].callFunction)
		    {
	      		btn.onclick=new Function(arrInputs[n].callFunction);
	    	}
		    /**
		     * 对于多个input按钮添加的位置问题修改
		     */
		    //inputs[i].parentElement.appendChild(btn);
		    arrInputs[n].parentElement.insertBefore(btn,arrInputs[n].nextSibling);
    	}
    }else
    {
		var inputs = document.getElementsByTagName("INPUT");
		if(inputs && inputs.length)
		{
			for(var i=0;i<inputs.length;i++)
			{
				//屏蔽hidden域
				if(inputs[i].type != "hidden" && inputs[i].hasbtn == "true")
				{
					var imgObj=document.createElement("IMG");
				    imgObj.src = g_webAppImagePath+"/default/btn.gif";
		    		imgObj.id  = "srtImg";
				    imgObj.width = 15;
				    imgObj.height = 15;
				    imgObj.title = "点击按钮";
				    imgObj.style.cursor = "pointer";//添加点击样式为“手”
	                var btn = document.createElement("SPAN");
	                btn.appendChild(imgObj);
				    if(inputs[i].callFunction)
				    {
			      		btn.onclick=new Function(inputs[i].callFunction);
			    	}
			    	
				    /**
				     * 对于多个input按钮添加的位置问题修改
				     */
				    //inputs[i].parentElement.appendChild(btn);
				    inputs[i].parentElement.insertBefore(btn,inputs[i].nextSibling);
				}
				
			}
		}
	}			
}

/**
 * 设置页面固定区域值
 * 固定区域段：<div id="fixarea"></div>
 * 查询条件固定区域：<input type="text" id="querycondition" name="querycondition">
 */
function setFixArea()
{
	var div = document.createElement("DIV");
	div.id = "fixarea";
	div.name = "fixarea";
	div.style.display = "none";
	document.body.appendChild(div);
	
    var inputCond = document.createElement("INPUT");
    inputCond.id = "querycondition";
    inputCond.name = "querycondition";
    var inputAction = document.createElement("INPUT");
    inputAction.id = "queryaction";
    inputAction.name = "queryaction";
    div.appendChild(inputCond);
    div.appendChild(inputAction);
    
}
//onunload方法，页面覆盖doClose()方法
function doClosePage()
{
	try 
	{
        doClose();
        //window.close();
    }
    catch (e)
    {}
}
function doInit()
{}
function doClose()
{}

/**
 * added by andy.ten@tom.com 
 * 设置页面折叠框
 */
function onTitleClick(id)
{
//	alert(window.event.srcElement.innerHTML);
	var display = document.getElementById(id).style.display;
	if (display == "none")
	{
		document.getElementById(id).style.display = "";
		window.event.srcElement.src = g_webAppImagePath + "/default/expand.gif";
	}
	else if (display == "")
	{
		document.getElementById(id).style.display = "none";
		window.event.srcElement.src = g_webAppImagePath + "/default/collapse.gif";
	}
}


/**
  * 提交方法
  * add by andy.ten@tom.com 2010-12-06
  * url: 提交请求url
  * eventUrlId: 提交句柄的id
  * curPage：如果是查询请求，表示当前页
  * param:参数
  * tabId:如果是查询，则指查询列表table id
  * resultHead:如果是查询，则指列表的json对象
  */
function doSubmitCall(url ,eventUrlId ,curPage ,param ,tabId ,resultTitle ,ps ,showResultFlag)
{
    var sCurPage,sReturnPage,sParam;
    var sEventUrlId;
    if(!url) { alert("查询操作失败，请与系统管理员联系！"); return false;}
    if(eventUrlId) sEventUrlId = eventUrlId;
    if(sEventUrlId && $(sEventUrlId))
    {
    	$(sEventUrlId).disabled = true;
    }
    if(param)
    	param = param.replace("curpage","curpage='1' oldpage");
    else
    	param = "<ROOT><PAGEINFO curpage='1' /><CONDITIONS></CONDITIONS></ROOT>";
    if(tabId.bindCond)
    	$(tabId.bindCond).value = param;
    else if($("condition"))
    	$("condition").value = param;
    if(curPage) sCurPage = curPage;
    else        sCurPage = 1;
    //alert(param);
    if(param)   sParam = {"params":param};
    else        sParam = {"params":''};
	showMask();
	if(tabId)
	{
		$(tabId).queryAction = url;
		$(tabId).queryCondition = sParam;
	}
	var sCP = "curPage";
	if($(tabId).bindCurPage)
		sCP = $(tabId).bindCurPage;
	var sUrl = 	url+(url.lastIndexOf("?") == -1?"?":"&")+sCP+"="+sCurPage;
	if(tabId.bindCurPage)
		$(tabId.bindCurPage).value = 1;
	else if($("curPage"))
		$("curPage").value = 1;
	if($("pageInput_"+tabId))
		$("pageInput_"+tabId).value = 1;
//	alert(sParam);
	
	makeCall(sUrl,callBack,sParam,1,sEventUrlId,tabId,resultTitle,ps,showResultFlag);
}

/**
  * add by andy.ten@tom.com 2010-12-06
  * 
  */
function toNewPage(page,tabId)
{
	
	var s = "pageInput_"+tabId;
	$(s).value = page;
	$(tabId).myPage.toPage(page);
	
}

/**
 * added by andy.ten@tom.com 2010-12-06
 */
function translate(param,value,sDom)
{
	if(!param) return false;
	if(!value) return false;
	var type,source,target,sValue;
	var dom = null;
	try
	{
		if(param && param.indexOf(":")>0)
		{
			type = param.split(":")[0];
			source = param.split(":")[1];
			target = param.split(":")[2];
			//alert()
		}
		if(!type) return false;
		if(sDom)
		{
			dom = sDom;
		}else 
		{
			dom = createDOMDocument();
			dom.load(g_webAppName+"/"+g_dataxmlPath+"/g_"+type+".xml");
		}	
		if(dom == null)
		{
			alert("获取主数据失败，请与系统管理员联系！");
			return ;
		}
		//alert(dom.xml);
		var nodes = dom.selectNodes("//ROOT/ROW");
		for(var i=0;i<nodes.length;i++)
		{
			var sCode = nodes[i].selectSingleNode(source).text;
   			var sName = nodes[i].selectSingleNode(target).text;
			if(sCode && sCode == value)
			{			
				sValue = sName;
				break;
			}
		}
		return sValue; 
	}catch(e){ return false;}
}

/**
 * added by andy.ten@tom.com 2010-12-06
 */
function doSelected(obj,showVal,showNames,showAreaId)
{
	//alert(obj.outerHTML);
	if(!obj) return false;
	var sId,sRows,sNames;
	if(showAreaId)
		sId = showAreaId;
	else
		sId = "showSelected";
	sRows = "showRows";
	sNames = "showNames";
	if(obj.checked == true)
	{
		if($(sId).value)
			$(sId).value = $(sId).value +","+ obj.value;
		else
			$(sId).value = obj.value;
		if($(sRows))
		{
			if($(sRows).value)
			{
				$(sRows).value = $(sRows).value + "," + showVal;
			}else
				$(sRows).value = showVal;
			
		}
		if($(sNames))
		{
			if($(sNames).value)
			{
				$(sNames).value = $(sNames).value + "," + showNames;
			}else
				$(sNames).value = showNames;
			
		}
	}else if(obj.checked == false)
	{
		var s = $(sId).value;
		if(s.indexOf(","+obj.value)>0)
		{
			var tmp = s.substr(s.indexOf(","+obj.value)+obj.value.length+1,1);
			var tt = s;
			while(tmp != "," && tmp != "")
			{
				tt = tt.substr(tt.indexOf(","+obj.value)+obj.value.length+1);
				tmp = tt.substr(tt.indexOf(","+obj.value)+obj.value.length+1,1);
			}
			$(sId).value = s.substr(0,s.indexOf(tt)) + (tt.replace(","+obj.value,""));
		}
		if(s.indexOf(obj.value+",")>=0)
			$(sId).value = s.replace(obj.value+",","");
		if(s.indexOf(obj.value)>=0 && s.length == obj.value.length)
		    $(sId).value = s.replace(obj.value,"");
		if($(sRows))
		{
			var t = $(sRows).value;
			if(t.indexOf(","+showVal)>0)
			{
				var tmp = t.substr(t.indexOf(","+showVal)+showVal.length+1,1);
				var tt = t;
				while(tmp != "," && tmp != "")
				{
					tt = tt.substr(tt.indexOf(","+showVal)+showVal.length+1);
					tmp = tt.substr(tt.indexOf(","+showVal)+showVal.length+1,1);
				}

				$(sRows).value = t.substr(0,t.indexOf(tt)) + (tt.replace(","+showVal,""));
			}
			if(t.indexOf(showVal+",")>=0)
				$(sRows).value = t.replace(showVal+",","");
		    if(t.indexOf(showVal)>=0 && t.length == showVal.length)
		      	$(sRows).value = t.replace(showVal,"");
		}
		if($(sNames))
		{
			var t = $(sNames).value;
			if(t.indexOf(","+showNames)>0)
			{
				var tmp = t.substr(t.indexOf(","+showNames)+showNames.length+1,1);
				var tt = t;
				while(tmp != "," && tmp != "")
				{
					tt = tt.substr(tt.indexOf(","+showNames)+showNames.length+1);
					tmp = tt.substr(tt.indexOf(","+showNames)+showNames.length+1,1);
				}

				$(sNames).value = t.substr(0,t.indexOf(tt)) + (tt.replace(","+showNames,""));
			}
			if(t.indexOf(showNames+",")>=0)
				$(sNames).value = t.replace(showNames+",","");
		    if(t.indexOf(showNames)>=0 && t.length == showNames.length)
		      	$(sNames).value = t.replace(showNames,"");
		}
	}		 
		
}
function doSelected2(obj,showVal,showNames,showAreaId)
{
	//alert(obj.outerHTML);
	if(!obj) return false;
	var sId,sRows,sNames;
	if(showAreaId)
		sId = showAreaId;
	else
		sId = "showSelected";
	sRows = "showRowsGroup";
	sNames = "showNames";
	if(obj.checked == true)
	{
		if($(sId).value)
			$(sId).value = $(sId).value +","+ obj.value;
		else
			$(sId).value = obj.value;
		if($(sRows))
		{
			if($(sRows).value)
			{
				$(sRows).value = $(sRows).value + "," + showVal;
			}else
				$(sRows).value = showVal;
			
		}
		if($(sNames))
		{
			if($(sNames).value)
			{
				$(sNames).value = $(sNames).value + "," + showNames;
			}else
				$(sNames).value = showNames;
			
		}
	}else if(obj.checked == false)
	{
		var s = $(sId).value;
		if(s.indexOf(","+obj.value)>0)
		{
			var tmp = s.substr(s.indexOf(","+obj.value)+obj.value.length+1,1);
			var tt = s;
			while(tmp != "," && tmp != "")
			{
				tt = tt.substr(tt.indexOf(","+obj.value)+obj.value.length+1);
				tmp = tt.substr(tt.indexOf(","+obj.value)+obj.value.length+1,1);
			}
			$(sId).value = s.substr(0,s.indexOf(tt)) + (tt.replace(","+obj.value,""));
		}
		if(s.indexOf(obj.value+",")>=0)
			$(sId).value = s.replace(obj.value+",","");
		if(s.indexOf(obj.value)>=0 && s.length == obj.value.length)
		    $(sId).value = s.replace(obj.value,"");
		if($(sRows))
		{
			var t = $(sRows).value;
			if(t.indexOf(","+showVal)>0)
			{
				var tmp = t.substr(t.indexOf(","+showVal)+showVal.length+1,1);
				var tt = t;
				while(tmp != "," && tmp != "")
				{
					tt = tt.substr(tt.indexOf(","+showVal)+showVal.length+1);
					tmp = tt.substr(tt.indexOf(","+showVal)+showVal.length+1,1);
				}

				$(sRows).value = t.substr(0,t.indexOf(tt)) + (tt.replace(","+showVal,""));
			}
			if(t.indexOf(showVal+",")>=0)
				$(sRows).value = t.replace(showVal+",","");
		    if(t.indexOf(showVal)>=0 && t.length == showVal.length)
		      	$(sRows).value = t.replace(showVal,"");
		}
		if($(sNames))
		{
			var t = $(sNames).value;
			if(t.indexOf(","+showNames)>0)
			{
				var tmp = t.substr(t.indexOf(","+showNames)+showNames.length+1,1);
				var tt = t;
				while(tmp != "," && tmp != "")
				{
					tt = tt.substr(tt.indexOf(","+showNames)+showNames.length+1);
					tmp = tt.substr(tt.indexOf(","+showNames)+showNames.length+1,1);
				}

				$(sNames).value = t.substr(0,t.indexOf(tt)) + (tt.replace(","+showNames,""));
			}
			if(t.indexOf(showNames+",")>=0)
				$(sNames).value = t.replace(showNames+",","");
		    if(t.indexOf(showNames)>=0 && t.length == showNames.length)
		      	$(sNames).value = t.replace(showNames,"");
		}
	}		 
		
}

/**
 * added by andy.ten@tom.com 2010-12-06
 */
var m_content = [];
function expand_textarea(obj)
{
  var w = obj.offsetWidth;
  var t = parseInt(obj.offsetTop,10);
  var l = parseInt(obj.offsetLeft,10);
  //if(obj.parentNode && obj.parentNode.offsetLeft,10){
  	//l = parseInt(obj.parentNode.offsetLeft,10)+l;
  //}
  var e = obj;
  while(e != document.body)
  {
    t+=parseInt(e.offsetTop,10);
    l+=parseInt(e.offsetLeft,10);
    e = e.offsetParent;
  }
  if(m_content.length > 0)
  {
  	/**解决多个textArea使用,赋值不正确的问题**/
  	if(m_content[0].childNodes.length > 0){
  		m_content[0].childNodes[0].pID = obj.id;
  	}
    m_content[0].style.display = "";
    with(m_content[0].style)
    {
	    position = "absolute";
	    height = "200px";
	    //height = t+obj.offsetHeight+"px";
	    width = w +200+ "px";
	    top = t;
	    left = l + 5;
	    background = "silver";
	    border = "0px solid black";
    }
    m_content[0].firstChild.style.overflow = "auto";
    m_content[0].firstChild.style.width = "100%";
    m_content[0].firstChild.style.height = "200px";
    m_content[0].firstChild.value = obj.value;
    m_content[0].firstChild.focus();
  }
  else
  {
      //var w = parseInt(obj.style.width)-15;
      
      var newdiv = document.createElement("DIV");
      newdiv.id = "temp_div";
      var newtextarea = document.createElement("TEXTAREA");
      newtextarea.value = obj.value;
      newtextarea.backenable="true";
		
      newtextarea.style.width="100%";
      newtextarea.style.height="200px";
      //newtextarea.style.height= "100%";
      newtextarea.style.overflow = "auto";
      newtextarea.pID = obj.id;
      if(obj.readOnly == true)
      	newtextarea.readOnly = true;
      with(newdiv.style)
      {
        position = "absolute";
        height = "200px";
        //height = t+obj.offsetHeight+"px";
        width = w +200+ "px";
        top = t;
        left = l + 5;
        background = "silver";
        border = "0px solid black";
      }
      newtextarea.onblur = new Function("shrink_textarea(this,this.pID)");
      newdiv.appendChild(newtextarea);
      document.body.appendChild(newdiv);
      newdiv.firstChild.focus();
      m_content[0] = newdiv;
  }
}
function shrink_textarea(obj,objName)
{
  document.getElementById(objName).value = obj.value;
  document.getElementById("temp_div").style.display = "none";
}