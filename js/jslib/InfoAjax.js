var myPage; //定义公共的showPages对象

//yesValueFunc   等于默认值 回调函数执行
//notValueFunc   不等于默认值 回调函数执行
function makeSelectCJ2(url,tabid,value,params,addText,addValue,inValues,yesValueFunc,notValueFunc,finFunc){
	new Ajax.Request(url, 
		{
			method:'post',
			parameters:params,
			onFailure: function(){ alert('无法链接服务器！') },  
	  		onSuccess: function(transport){
				var json = transport.responseText.evalJSON();
				showSelectCJ2(json,tabid,value,addText,addValue,inValues,yesValueFunc,notValueFunc,finFunc);
			}	 			
		});
}

//根据得到的数据来构造下拉框
function showSelectCJ2(json,tabid,value,addText,addValue,inValues,yesValueFunc,notValueFunc,finFunc){
	var typeval = json.supplierList;
	var typeobj = $(tabid);
	typeobj.options.length=0;	
	var m=0;	
	if(addText){
		var options = document.createElement("OPTION");
   		options.value = addValue;
   		options.text =  addText;   		
		if(inValues){
			for(var kk=0;kk<inValues.length;kk++){
				if(inValues[kk]==addValue){					
					typeobj.options.add(options);						
					addOption(typeobj,typeval[i].showValue,typeval[i].showKey);						
					if(value){				
						if(addValue==value) 
						{
							typeobj.selectedIndex=m;
				        }
					}
					m=m+1;
				}
			}			
		}else{
	   		typeobj.options.add(options);	
	   		m=m+1;
		}
	}
	
	for(var i=0;i<typeval.length;i++){
		
		if(inValues){
			for(var kk=0;kk<inValues.length;kk++){
				if(inValues[kk]==typeval[i].showKey){
					addOption(typeobj,typeval[i].showValue,typeval[i].showKey);						
					if(value){				
						if(typeval[i].showKey==value) 
						{
							typeobj.selectedIndex=m;
				        }
					}
					m=m+1;
				}
			}			
		}else{
			addOption(typeobj,typeval[i].showValue,typeval[i].showKey);			
			if(value){				
				if(typeval[i].showKey==value) 
				{
					typeobj.selectedIndex=m;
		        }
			}
			m=m+1;
		}
	}
	
	//如果默认值存在
	if(value){
		//alert("value"+value+"***$(tabid).value"+$(tabid).value);
		//等于默认值 回调函数完成后 调用
		if($(tabid).value==value){
			if(yesValueFunc){				
				yesValueFunc();
			}	
		//不等于默认值 回调函数完成后 调用
		}else{
			if(notValueFunc){
				notValueFunc();
			}
		}
	}
	if(finFunc){
		finFunc();
	}
}




function makeSelectCJ(url,tabid,value,params,flag){
	new Ajax.Request(url, 
		{
			method:'post',
			parameters:params,
			onFailure: function(){ alert('无法链接服务器！') },  
	  		onSuccess: function(transport){
				var json = transport.responseText.evalJSON();
				showSelectCJ(json,tabid,value,flag);
			}	 			
		});
}

//根据得到的数据来构造下拉框
function showSelectCJ(json,tabid,value,flag){
	
	var typeval = json.supplierList;
	var typeobj = $(tabid);
	//清空现有options
	while(typeobj.options && typeobj.options.length>0)
	{
		typeobj.options.remove(0);
	}
	//判断是否增加“请选择”项；
	if(flag){
		var options = document.createElement("OPTION");
   		options.value = "";
   		options.text = "-请选择-";
   		typeobj.options.add(options);
	}		
	for(var i=0;i<typeval.length;i++){
		addOption(typeobj,typeval[i].showValue,typeval[i].showKey);
		if(value){
			if(typeval[i].showKey==value) 
			{
				typeobj.selectedIndex=i+1;
	        }
		}
	}
}

function makeCall(url,showFunc,params,isMask,sEventUrlId,tabId,resultTitle,showResultFlag){
	new Ajax.Request(url, 
		{
			method:'post',
			parameters:params,
			onFailure: function(){ alert('无法链接服务器！') },  
	  		onSuccess: function(transport){
				var json = transport.responseText.evalJSON();
				showFunc(json,tabId,resultTitle,showResultFlag);
				//modifid by andy.ten@tom.com
				customerFunc(json,tabId);
				if(isMask && isMask=="1")
					removeMask();
				if(sEventUrlId && $(sEventUrlId))
					$(sEventUrlId).disabled = false;
				//end
			}	 			
		});
}

function customerFunc(jsonObj,tabId)
{

}
function sendAjax(url,showFunc,formName){
	new Ajax.Request(url, 
		{
			method:'post',
			parameters:$(formName).serialize(true),
			onFailure: function(){ alert('无法链接服务器！') },  
	  		onSuccess: function(transport){
				var json = transport.responseText.evalJSON();
				showFunc(json);
			}	 			
		});
}

function makeSelect(url,showFunc,obj,params){
	new Ajax.Request(url, 
		{
			method:'post',
			parameters:params,
			onFailure: function(){ alert('无法链接服务器！') },  
	  		onSuccess: function(transport){
				var json = transport.responseText.evalJSON();
				showFunc(obj,json);
	 		} 
	 	});
}
function makeFormCall(url,showFunc,formName){
	new Ajax.Request(url, 
		{
			method:'post',
			parameters:$(formName).serialize(true),
			onFailure: function(){ alert('无法链接服务器！') },  
	  		onSuccess: function(transport){
				var json = transport.responseText.evalJSON();
				showFunc(json);
				if(json.Exception==undefined){
					
				}else{
					doError(json);
				}
			}
	 	});
}

//处理错误信息  open by liuqiang 要alert错误提示
function doError(json){
	var exception = "";
	//modify by zhaojinyu 2011-01-13 修改提示错误信息
	//var errorCode = json.Exception.errCode;
	//if(errorCode!=undefined){
		//exception="错误代码"+errorCode+":</br>";
	//}
	var message = json.Exception.message;
	if(message!=undefined){
		if(exception==null){
			exception=message;
		}else{
			exception+=message;
		}
	}
	//end
	alert(exception);
}
function makeNomalCall(url,showFunc,params){
	new Ajax.Request(url, 
		{
			method:'post',
			parameters:params,
			onFailure: function(){ alert('无法链接服务器！') },  
	  		onSuccess: function(transport){
					showFunc(transport.responseText);
	 			} 
	 	});
}
function makeNomalFormCall(url,showFunc,formName){
    if(submitForm(formName)==false)return;;
	var arguments1 = arguments;
	for(var i=3;i<arguments.length;i++){
		if(arguments[i]!=null&&$(arguments[i])!=undefined&&typeof(arguments[i])=="string"){
			disableBtn($(arguments[i]));
		}
	}
	new Ajax.Request(url, 
			{
				method:'post',
				parameters:$(formName).serialize(true),
				onFailure: function(){ alert('无法链接服务器！') },  
		  		onSuccess: function(transport){
		  			//added by andy.ten@tom.com
		  			var result = transport.responseText;
		  			try
		  			{
		  				json = result.evalJSON();
		  			}catch(e)
		  			{
		  				try
		  				{
		  					var s = transport.status;
		  					transport.status = null;
		  					transport = null;
		  					document.write(result);		
		  				}catch(ee){}
		  				return;
		  			}
		  			
                    //end
					for(var i=3;i<arguments1.length;i++){
						if(arguments1[i]!=null&&$(arguments1[i])!=undefined&&typeof(arguments1[i])=="string"){
							useableBtn($(arguments1[i]));
						}else if(arguments1[i]!=null&&$(arguments1[i])!=undefined&&typeof(arguments1[i])=="function"){
							arguments1[i](json);
						}
					}
					if(json.Exception==undefined||json.Exception.type=="2"){
						showFunc(json);
						//modifid by andy.ten@tom.com
						customerFunc(json);
						//end
					}else{
						doError(json);
					}
				}
		 	});
		 	
		 	
}
function customerFunc(obj){};
function contentUpdate(id, ele){
	var childs=$(id).childNodes;
	for(var i=0;i<childs.length;i++){
		childs[i].parentNode.removeChild(childs[i]);
	}
	$(id).appendChild(ele);
}



//========================================================================================================

//用于输出分页页码
/*
type: 显示类型(short|medium|full)
pageInfoObj : java的PageingObject对象
jsFunc : 点击链接时调用的function名字 例：jsFunc(curPage)
*/
function PageInfo(type, pageInfoObj,jsFunc){
	this.type=type;
	this.pageInfoObj=pageInfoObj;
	this.jsFunc = jsFunc;
	this.print=function(){
		var txt ='';
		if( this.type=='short' ){
			if ( (this.pageInfoObj.CurrentPage-1) <= 0 ){
				txt+="&lt;&lt;";
			}else{
				txt+="<a href=\"javascript:"+this.jsFunc+"("+(this.pageInfoObj.CurrentPage-1)+");\">&lt;&lt;</a>";
			}
						
			txt+="&nbsp;&nbsp;"+this.pageInfoObj.CurrentPage+'/'+this.pageInfoObj.TotalPage+"&nbsp;&nbsp;";
			
			if ( this.pageInfoObj.CurrentPage >= this.pageInfoObj.TotalPage ){
				txt+="&gt;&gt;";
			}else{
				txt+="<a href=\"javascript:"+jsFunc+"("+(this.pageInfoObj.CurrentPage+1)+");\">&gt;&gt;</a>";
			}
			return txt;
		}else if (this.type=='medium') {
			if ( (this.pageInfoObj.CurrentPage-1) <= 0 ){
				txt += "首页&nbsp;&nbsp;";
				txt += "上一页&nbsp;&nbsp;";
			}else{
				txt += "<a href=\"javascript:"+jsFunc+"(1);\">首页</a>&nbsp;&nbsp;";
				txt += "<a href=\"javascript:"+this.jsFunc+"("+(this.pageInfoObj.CurrentPage-1)+");\">上一页</a>&nbsp;&nbsp;";
			}
			
			if ( this.pageInfoObj.CurrentPage >= this.pageInfoObj.TotalPage ){
				txt += "下一页&nbsp;&nbsp;";
				txt += "尾页&nbsp;&nbsp;";
			}else{
				txt += "<a href=\"javascript:"+jsFunc+"("+(this.pageInfoObj.CurrentPage+1)+");\">下一页</a>&nbsp;&nbsp;";
				txt += "<a href=\"javascript:"+jsFunc+"("+(this.pageInfoObj.TotalPage)+");\">尾页</a>&nbsp;&nbsp;";
			}
			
			txt += "第"+this.pageInfoObj.CurrentPage+"页/共"+this.pageInfoObj.TotalPage+"页&nbsp;&nbsp;";
			return txt;
		}else{
			return "not support page info type: "+this.type;
		}
	}
}



//根据节点信息打印节点路径
function printTreePath(node,funcName){
	var split = "--&gt;";
	var txt = "";
	var nd = '';
	do{
		if ( nd == '' ){
			nd = node;
		}else{
			nd = nd.Childs[0];
		}
		txt+=split;
		txt+="<a href=\"javascript:"+funcName+"('"+nd.Id+"');\">";
		txt+=nd.Name;
		txt+="</a>";
	}while(nd.Childs)
	
	if ( txt=='' )
		return txt;
	else
		return txt.substring(split.length,txt.length);
}

//间隔查询数据
function queryUpd(url, params, objId, funcName, interval){
	var myAjax = new Ajax.PeriodicalUpdater(	
	objId,                          //object Id
	url+"?sid="+Math.random(),							//Request Url
	{
		method:'post', 				//HTTP Requset Method:get or post
		parameters:params, 			//parameter
		onFailure: function(){ alert('无法链接服务器！') },  
  		onSuccess: function(){
				funcName();
 			},
		frequency:interval*60       //Interval
	});	
}
/*
 * ============================create by andy z on 2009-7-30=======================================
 */
//AJAX 下拉框联动共用方法
function addOption(objSelectNow,txt,val){
	var objOption = document.createElement("OPTION");
	objOption.text = txt;
	objOption.value = val;
	objOption.title = txt;
	objSelectNow.options.add(objOption);
	return objOption;
}
//AJAX 构造下拉框
function formatCheckBox(obj,json) {
		var val = json.RETURN_LIST;
		obj.options.length = 1;
		for ( var i = 0; i < val.length; i++) {
			addOption(obj, val[i].codeDesc, val[i].codeId);
		}
	}	
	
function fmtPrice(value){ //去小数点后多余的零
	var val = "";
	if(value.indexOf(".")==-1){
		return value+"万";
	}
	var _pattern = /0{1,3}$|.0000$/;
	if(value!=null && value!=""){
		//if(value.lastIndexOf(_pattern)){
			return value.replace(_pattern,"")+"万";
		//}
	}
	return val;
}

function printFmtPrice(value){
	document.write(fmtPrice(value));
}

function valiPrice(price){
	return /^[0-9]{1,8}(|.[0-9]{1,4})$/.test(price);
}	

function __getRecord__(record){ //将对象中的null转成""
   var _keys = Object.keys(record);
   for(var i=0;i<_keys.length;i++){
   		if(record[_keys[i]] == null)
   			record[_keys[i]] = "";
   }
   return record;
}

//生成下拉框
function makeSelectCall(url,showFunc,formName){
new Ajax.Request(url,
	{
		method:'post',
		parameters:$(formName).serialize(true),
		onFailure: function(){ alert('无法链接服务器！') },  
  		onSuccess: function(transport){
			var json = transport.responseText.evalJSON();
			showFunc(json);
			if(json.Exception==undefined){
				
			}else{
				doError(json);
			}
		}
 	});
}