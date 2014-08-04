function getBrand(elementId,params){
	var url = g_webAppName+"/uc/replace/manager/UcBrandMaintainAction/queryBrandInfo.json";
    new Ajax.Request(url, 
		{
			method:'post',
			parameters:params,
			onFailure: function(){ alert('无法链接服务器！') },  
	  		onSuccess: function(transport){
	  			var json = transport.responseText.evalJSON();
	  			if(json.Exception != null && json.Exception != undefined) {
					doError(json);
				} else {
					var objS = document.getElementById(elementId);
					addDefaultOpt(elementId);
					var list = json.brandList;
					for(var i=0;i<list.size();i++){
						objS.options.add(new Option(list[i].BRAND_NAME,list[i].BRAND_CODE));
					}
				}
			}	 			
		});
}

function changeBrand(brandCode,elementId,modelElementId){
	var objS = document.getElementById(elementId);
	if(brandCode==""){
 		objS.innerHTML = '';
    	objS.length=0;
		addDefaultOpt(elementId);
		if(document.getElementById(modelElementId)){
			document.getElementById(modelElementId).innerHTML = '';
	    	document.getElementById(modelElementId).length=0;
			addDefaultOpt(modelElementId);
		}
   	}else{
		var url = g_webAppName+"/uc/replace/manager/UcBrandMaintainAction/querySeriesInfo.json";
	    new Ajax.Request(url, 
		{
			method:'post',
			parameters:{brandCode:brandCode},
			onFailure: function(){ alert('无法链接服务器！') },  
	  		onSuccess: function(transport){
	  			var json = transport.responseText.evalJSON();
	  			if(json.Exception != null && json.Exception != undefined) {
					doError(json);
				} else {
					objS.innerHTML = '';
    				objS.length=0;
					addDefaultOpt(elementId);
					if(document.getElementById(modelElementId)){
						document.getElementById(modelElementId).innerHTML = '';
				    	document.getElementById(modelElementId).length=0;
						addDefaultOpt(modelElementId);
					}
					for(var i=0;i<json.seriesList.length;i++){
				   		var series_desc = json.seriesList[i].SERIES_DESC;
				   		if(series_desc != '' && series_desc != null){
				   			var seriesArr = series_desc.split(",");
				   			var group1=document.createElement('OPTGROUP');  
							group1.label = json.seriesList[i].MAKE_NAME;
							group1.innerText= " ";
							objS.appendChild(group1);
				   			for(var j=0,k=seriesArr.length;j<k;j++){
				   				var seriesObject = seriesArr[j].split("@");
				   				objS.options.add(new Option(seriesObject[0],seriesObject[1]));
				   			}
				   		}
					} 
				}
			}	 			
		});
   	}	
}

function changeSeries(seriesCode,elementId){
	var objS = document.getElementById(elementId);
 	if(seriesCode==""){
 		objS.innerHTML = '';
    	objS.length=0;
		addDefaultOpt(elementId);
   	}else{
   		var url = g_webAppName+"/uc/replace/manager/UcBrandMaintainAction/queryModelInfo.json";
	    new Ajax.Request(url, 
		{
			method:'post',
			parameters:{seriesCode:seriesCode},
			onFailure: function(){ alert('无法链接服务器！') },  
	  		onSuccess: function(transport){
	  			var json = transport.responseText.evalJSON();
	  			if(json.Exception != null && json.Exception != undefined) {
					doError(json);
				} else {
					objS.innerHTML = '';
					objS.length=0;
					addDefaultOpt(elementId);
					for(var i=0;i<json.modelList.length;i++){
				   		objS.options.add(new Option(json.modelList[i].MODEL_NAME,json.modelList[i].MODEL_CODE));
					} 
				}
			}	 			
		});
   	}
}
