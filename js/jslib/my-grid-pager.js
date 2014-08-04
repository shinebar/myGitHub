	
  /*增加String的format方法*/
	Object.extend(String, {
		  format: function(str) {
			try {
			  return str;
			} catch (e) {
			  throw e;
			}
		  }
		 });
	
	//删除grid
	function removeGird(id){
		$(id).innerHTML = '';
	}
    
    /**
     * created by andy.ten@tom.com
     * tabArr:生成列表数组对象
     * dataArr:dataIndex数组对象
     * funcArr：render数组对象
     * 生成表头功能
     */
    
    function doRowClick(obj)
    {
    	if(obj.cells[0].firstChild.checked == true)
    		obj.cells[0].firstChild.checked = false;
    	else
    		obj.cells[0].firstChild.checked = true;
    }
    function customTableFunc(tabObj)
    {
    }
    //end
	function createGrid(title, columns, cnt, ps, tabId){
		createGrid.backColor = "#FDFDFD";	
		createGrid.hoverColor = "#BDEDCD";
		createGrid.clickColor = "#BDEDCD";

		this.title = title;
		this.columns = columns;
		this.container = cnt;
		this.table;
		this.curRow;
		this.curCell;
		this.curColums;
		this.jsonData = ps.records;
		this.remoteSort = true;
		this.curPage = ps.curPage;
		this.pageSize = ps.pageSize;
        this.tabId = tabId;
		var CurGrid = this;
		this.createTableHead = function(tabArr,dataArr,funcArr)
	    {
	    	//modified by andy.ten@tom.com 2010-12-06
	    	if(this.tabId)
	    		tabArr.push("<table id='x_"+this.tabId+"' class='table_list' >");
	    	else
	    		tabArr.push("<table id='myTable' class='table_list' >");
	    	//生成合并表头
			var rowspan;
			rowspan = this.columns[0].rowspan;
			if(this.columns && this.columns[0])
			{
			    rowspan = this.columns[0].rowspan ? this.columns[0].rowspan : 1;
			}
			else
			{
				return false;
			}
		    for(var n=1; n<=rowspan; n++)
		    {
			    tabArr.push("<tr class='table_list_th'>");
			    var columnColspan = 0;
			    var count = 0;
		    	for(var i=0; i< this.columns.length; i++)//列名
				{
					var columnObj = this.columns[i];
					if(n==1)
					{
						dataArr.push(columnObj.dataIndex);//记录dataIndex				
						funcArr.push(columnObj.renderer);  //记录renderer
					}
					var columnRowspan = columnObj.rowspan;
					if(n==1 && columnObj.colspan)
						columnColspan = columnObj.colspan;
		    		if(columnObj.orderCol)
		    		{
						if($("orderCol").value == columnObj.orderCol||$("orderCol").value.split("-")[0] == columnObj.orderCol)
						{
							if($("order").value == '-1')
							{
								colMask = "descMask";						
							}else if($("order").value == '1')
							{
								colMask = "ascMask";
							}
						}else
						{
							colMask = "sortMask";
						}
					}else
					{
						colMask = "noSort";
					}
					if(!columnObj.width)
					{
						if(n==1)
						{
							if(columnRowspan)
							{
							   tabArr.push("<th class='"+ colMask + "' rowspan='"+columnRowspan+"' style='padding-right: 0.65em;'>" + columnObj.header + "</th>");	
							}
						    else if(columnColspan)
						    {
						    	if(count == columnColspan) count = 0;
						    	if(columnColspan && columnColspan > 0 && count < columnColspan)
						    	{
						    		if(count == 0)
						    		{
						        		tabArr.push("<th class='"+ colMask + "' colspan='"+columnColspan+"' style='padding-right: 0.65em;'>" + columnObj.colspanName + "</th>");
						        		count ++ ;
						    		}else
						    		{
						    			count ++ ;
						    			continue;
						    		}	
						    	}
						    }else 
						    {
						    	var styleV;
						    	if(columnObj.style == undefined)
						    	{
									styleV = '';
								}else
								{
									styleV = columnObj.style;
								}
						    	tabArr.push("<th class='"+ colMask + "' style='"+styleV+";padding-right: 0.65em;'>" + columnObj.header + "</th>");
						    }
						}else if(!columnRowspan)
				        {
				        	var styleV;
					    	if(columnObj.style == undefined)
					    	{
								styleV = '';
							}else
							{
								styleV = columnObj.style;
							}
				      		tabArr.push("<th class='"+ colMask + "' style='"+styleV+";padding-right: 0.65em;'>" + columnObj.header + "</th>");
				        }
						    
					}else
					{	
						if(n==1)
						{
							if(columnRowspan)
							{
							   tabArr.push("<th style='padding-right: 0.65em;' class='"+ colMask +"'"+" width=" + columnObj.width +" rowspan='"+columnRowspan+"' >" + columnObj.header + "</th>");	
							}
						    else if(columnColspan)
						    {
						    	if(count == columnColspan) count = 0;
						    	if(columnColspan && columnColspan > 0 && count < columnColspan)
						    	{
						    		if(count == 0)
						    		{
						        		tabArr.push("<th style='padding-right: 0.65em;' class='"+ colMask + "'" + " width=" + columnObj.width  + "'  colspan='"+columnColspan+"'>" + columnObj.colspanName + "</th>");
						        		count ++ ;
						    		}else
						    		{
						    			count ++ ;
						    			continue;
						    		}	
						    	}
						    }else 
						    {
						    	var styleV;
						    	if(columnObj.style == undefined)
						    	{
									styleV = '';
								}else
								{
									styleV = columnObj.style;
								}
							    tabArr.push("<th class='"+ colMask + "' width='" + columnObj.width  + "' style='"+styleV+";padding-right: 0.65em;'>" + columnObj.header + "</th>");
							 }
						}else if(!columnRowspan)
				        {
				        	var styleV;
					    	if(columnObj.style == undefined)
					    	{
								styleV = '';
							}else
							{
								styleV = columnObj.style;
							}
				      		tabArr.push("<th class='"+ colMask + "' " + "width=" + columnObj.width +" style='"+styleV+";padding-right: 0.65em;'>" + columnObj.header + "</th>");
				        }
					}
				}
				tabArr.push("</tr>");	
		    }
		    //alert("debug:"+dataArr);
		    //alert(tabArr);	
	    }
	    //end 
	    //added by andy.ten@tom.com
		this.load = function(){//grid重画模块
//		    if(g_webAppName.length !=9)
//    		{
//    			alert("未经授权，请与andy.ten@tom.com联系");
//    			return false;
//    		}
			if($('myTable') != null){
				removeGird(this.container);
			}
			var tbStr = [], dataIndexArr = [], rendererArr = [], cellCnt=[],index,noWrap,colMask;
			/**
			 * modified by andy.ten@tom.com
			 */
			CurGrid.createTableHead(tbStr,dataIndexArr,rendererArr);
		    //end
			//added by andy.ten@tom.com 如有计算功能，获取计算配置信息
			var bindTableList,subTotalColumns,subTotalScolumns,totalColumns,totalSumMap,subTotalSumMap;
			
			try
			{
				if(calculateConfig)
				{
				    if(calculateConfig.bindTableList)
						bindTableList = calculateConfig.bindTableList;
					var s;
					if(calculateConfig.subTotalColumns)
						s = calculateConfig.subTotalColumns;
					if(s && s.indexOf("|") >0)
					{
						subTotalColumns = s.split("|")[0];
						subTotalScolumns = s.split("|")[1];
					}
					if(calculateConfig.totalColumns)
						totalColumns = calculateConfig.totalColumns;
					if(totalColumns)
						totalSumMap = new HashMap();						
				}
			}catch(e)
			{}	
			//end
			
			var rowColor = -1;
			for(var i=0; i< this.jsonData.length;i++)
			{//
				
				var rowsum = 0;
				var calculateFlag = false;
				
				//modified by andy.ten@tom.com
				switch(rowColor)
				{
					case -1:
					        if((i & 1)==1)
							{
								tbStr.push("<tr class='table_list_row2'>");
								rowColor = 2;
							}else
							{
								tbStr.push("<tr class='table_list_row1'>");
								rowColor = 1;
							}
					  break;
					case  1:
					        tbStr.push("<tr class='table_list_row2'>");
							rowColor = 2;
					  break;
					case  2:
					        tbStr.push("<tr class='table_list_row1'>");
					        rowColor = 1;
					  break;
				}
				
				//end
				var subTotalIndex = 0;
				for(var j=0;j<dataIndexArr.length;j++)
				{	
					
					//added by andy.ten@tom.com
					if(!subTotalSumMap)
					    subTotalSumMap = new HashMap();
					    
					cellCnt = this.jsonData[i][dataIndexArr[j]];//根据dataIndex显示后台数据
					//alert("测试222222："+this.jsonData[i][dataIndexArr[j]]);
					if(cellCnt == null || cellCnt == undefined){
						cellCnt ='';
					}
					//alert(this.jsonData[i][dataIndexArr[j]] == undefined);
					
					if(typeof(rendererArr[j])=='function'){//列名有renderer属性
						var __data__ = {};
						__data__.data = this.jsonData[i];
						cellCnt = this.columns[j].renderer(cellCnt,{},__data__);//显示renderer函数，传值		
					}
					
					if(this.columns[j].style == undefined){
						styleV = '';
					}else{
						styleV = this.columns[j].style;
					}
					if(this.columns[j].isColor == undefined)
					{
						//added by andy.ten@tom.com 2010-12
						if(this.columns[j].showsize)
						{
							
							if(cellCnt && cellCnt.length && cellCnt.length > parseInt(this.columns[j].showsize,10))
							{
								var s = cellCnt.substr(0,parseInt(this.columns[j].showsize,10))+"...";
								/* add by wjb at 2012-06-07 
								   实现带有showsize的超链接弹出明细页；
								   begin
								*/
								if(cellCnt.indexOf("<a") != -1)
								{
								 	var strs= new Array();
								 	strs=cellCnt.split(">");
								 	var ss = strs[1].substr(0,parseInt(this.columns[j].showsize,10))+"...";
								 	var shows = strs[1].substr(0,strs[1].length-3);
								 	cellCnt = strs[0] + ">" + ss + "</a>";
								 	//alert(cellCnt);
									tbStr.push("<td style='"+ styleV +";padding-right: 0.65em;' title='"+shows+"'>" + cellCnt + "</td>");
								}
								/*
									end;
								*/
								else{
									tbStr.push("<td style='"+ styleV +";padding-right: 0.65em;' title='"+cellCnt+"'>" + s + "</td>");
								}
							}else
							{
								tbStr.push("<td style='"+ styleV +";padding-right: 0.65em;'>" + cellCnt + "</td>");
							}	
						}else
						
			  				tbStr.push("<td style='"+ styleV +";padding-right: 0.65em;'>" + cellCnt + "</td>");
					}else
					{
						  if(this.columns[j].isColor == 'true')
						  {
						  	//added by andy.ten@tom.com 2010-12
							if(this.columns[j].showsize)
							{
								if(cellCnt.length && cellCnt.length > this.columns[j].showsize)
								{
									var s = cellCnt.substr(0,parseInt(this.columns[j].showsize,10))+"...";
									tbStr.push("<td  style='padding:2px;background:"+s+"' title='"+cellCnt+"'>" + '&nbsp;' + "</td>");
								}else
								{
									tbStr.push("<td  style='padding:2px;background:"+cellCnt+"'>" + '&nbsp;' + "</td>");
								}	
									
							}else
						  		tbStr.push("<td  style='padding:2px;background:"+cellCnt+"'>" + '&nbsp;' + "</td>");
						  }else
						  {
						  	//added by andy.ten@tom.com 2010-12
							if(this.columns[j].showsize)
							{
								if(cellCnt.length && cellCnt.length > this.columns[j].showsize)
								{
									var s = cellCnt.substr(0,parseInt(this.columns[j].showsize,10))+"...";
									tbStr.push("<td  style='padding-right: 0.65em;' bgcolor='"+cellCnt+"' title='"+cellCnt+"'>" + s + "</td>");
								}else
								{
									tbStr.push("<td  bgcolor='"+cellCnt+"'>" + cellCnt + "</td>");
								}	
									
							}else
						  		tbStr.push("<td  style='padding-right: 0.65em;' bgcolor='"+cellCnt+"'>" + cellCnt + "</td>");
						  	
						  }
					}	
					
					
					//added by andy.ten@tom.com
					var totalIndex = 0;
					if(totalColumns && totalColumns == dataIndexArr[j])
					{
						totalIndex = j;
					}
					if(totalColumns && totalIndex < j)
					{
						if(totalSumMap.get(dataIndexArr[j]))
						{
							 var num = this.jsonData[i][dataIndexArr[j]];
							 if(!num)  num = 0.00;
						     totalSumMap.put(dataIndexArr[j],parseFloat((totalSumMap.get(dataIndexArr[j]) + parseFloat(num)),10));
						}     
						else
						{
							 var num = this.jsonData[i][dataIndexArr[j]];
							 if(!num)  num = 0.00;
						     totalSumMap.put(dataIndexArr[j],parseFloat(num,10));
						}    
					}
					var sIndex = 0;
					if(subTotalColumns && subTotalColumns == dataIndexArr[j])
					{
						sIndex = j;
						subTotalIndex = j;
					}
					if(subTotalColumns && sIndex < j)
					{
						if(subTotalSumMap.get(dataIndexArr[j]))
						{
							 var num = this.jsonData[i][dataIndexArr[j]];
							 if(!num)  num = 0.00;
						     subTotalSumMap.put(dataIndexArr[j],parseFloat((subTotalSumMap.get(dataIndexArr[j]) + parseFloat(num)),10));
						}     
						else
						{
							 var num = this.jsonData[i][dataIndexArr[j]];
							 if(!num)  num = 0.00;
						     subTotalSumMap.put(dataIndexArr[j],parseFloat(num,10));
						}    
					}
					//end	     
					
				}
				tbStr.push("</tr>");
				//added by andy.ten@tom.com
				if(subTotalColumns && i < this.jsonData.length)
				{
					var curRows,nextRows,curColumnVal,nextColumnVal;
					if(i < this.jsonData.length-1)
					{
					   curRows = this.jsonData[i];
					   nextRows = this.jsonData[i+1];
					   curColumnVal = curRows[subTotalColumns];
					   nextColumnVal = nextRows[subTotalColumns];
					   if(curColumnVal == nextColumnVal)
				        	calculdateFlag = false;
				       else
				       {
				            calculdateFlag = true;
				       }     
					}else
					{
					   calculdateFlag = true;
					}
					if(calculdateFlag == true)
				    {
				        //calculdateFlag = true;
				        switch(rowColor)
						{
							case -1:
							        if((i & 1)==1)
									{
										tbStr.push("<tr class='table_list_row2'>");
										rowColor = 2;
									}else
									{
										tbStr.push("<tr class='table_list_row1'>");
										rowColor = 1;
									}
							  break;
							case  1:
							        tbStr.push("<tr class='table_list_row2'>");
									rowColor = 2;
							  break;
							case  2:
							        tbStr.push("<tr class='table_list_row1'>");
							        rowColor = 1;
							  break;
						}
						
						var colspan = -1;
						for(var n=0;n<dataIndexArr.length;n++)
						{
							if(subTotalScolumns == dataIndexArr[n])
							{
								colspan = n ;
							}
							if(colspan > 0)
							{
								if(colspan == n)
								{
									var cellCnt = "";
									for(var len=0;len<this.columns.length;len++)
									{
										if(this.columns[len].dataIndex == subTotalColumns)
										{
											cellCnt = this.jsonData[i][subTotalColumns];
											if(this.columns[len].renderer)
							   				{
												var __data__ = {};
												cellCnt = this.columns[len].renderer(cellCnt,{},__data__);//显示renderer函数
							   				}
										}
									}
									
							   		tbStr.push("<td><strong>"+cellCnt+"&nbsp;小计 ：</strong></td>");
								}	
							   	else
							   	{
							   		
					                var cellCnt = subTotalSumMap.get(dataIndexArr[n]);
							   		if(typeof(rendererArr[n])=='function')
							   		{
										var __data__ = {};
										cellCnt = this.columns[n].renderer(cellCnt,{},__data__);//显示renderer函数
							   		}
							   		if(isNaN(cellCnt))
							   		{
							   			cellCnt = "";
							   		}
							   	    tbStr.push("<td><strong>"+cellCnt+"</strong></td>");
							   	 }    	
							}else
							{
								tbStr.push("<td></td>");
							}
						}
						tbStr.push("</tr>");
						subTotalSumMap = null;
				    }    
					
				}
				
			}
			//end							
			//added by andy.ten@tom.com
			if(totalColumns)
			{
				switch(rowColor)
				{
					case -1:
					        if((i & 1)==1)
							{
								tbStr.push("<tr class='table_list_row2'>");
								rowColor = 2;
							}else
							{
								tbStr.push("<tr class='table_list_row1'>");
								rowColor = 1;
							}
					  break;
					case  1:
					        tbStr.push("<tr class='table_list_row2'>");
							rowColor = 2;
					  break;
					case  2:
					        tbStr.push("<tr class='table_list_row1'>");
					        rowColor = 1;
					  break;
				}
				var colspan = -1;
				for(var n=0;n<dataIndexArr.length;n++)
				{
					if(totalColumns == dataIndexArr[n])
					{
						colspan = n ;
					}
					if(colspan > 0)
					{
						if(colspan == n)
					   		tbStr.push("<td style=\"text-align:right\"><strong>合计 ：</strong></td>");
					   	else
					   	{
					   		
			                var cellCnt = totalSumMap.get(dataIndexArr[n]);
			                //wjb modify begin;
			                cellCnt = new Number(cellCnt).toFixed(2);//合计保留两位小数(四舍五入)
			                //wjb modify end;
			                if(isNaN(cellCnt))
					   		{
					   			 cellCnt = "";
					   		}
					   		if(typeof(rendererArr[n])=='function')
					   		{
								var __data__ = {};
								cellCnt = this.columns[n].renderer(cellCnt,{},__data__);//显示renderer函数
					   		}
					   	    //tbStr.push("<td><strong>"+cellCnt+"</strong></td>");
					   		//wjb modify at 2011-05-16 列右对齐 begin
					   		tbStr.push("<td style=\"text-align:right\"><strong>"+cellCnt+"&nbsp;&nbsp;</strong></td>");
					   		//wjb modify at 2011-05-16 end
					   	 }    	
					}else
					{
						tbStr.push("<td></td>");
					}
				}
				tbStr.push("</tr>");
			}
			//end
			tbStr.push("</table>");
			this.container.innerHTML = tbStr.join("");
			this.table = this.container.firstChild;

			if(this.title != null){//表格标题	
				var x = $('myTable').createCaption();
				x.innerHTML = "<span class='navi'>&nbsp;</span>"+this.title;
			}

			/** 设置单元格  **/
			//added by andy.ten@tom.com
			
			for(var r=1; r<this.table.rows.length;r++){
	            //added by andy.ten@tom.com
	            //var firstCell = this.table.rows[r].cells[0];
	            //if(firstCell && firstCell.firstChild && firstCell.firstChild.type == "checkbox" || firstCell && firstCell.firstChild && firstCell.firstChild.type == "radio")
	            	//this.table.rows[r].ondblclick = new Function("doRowClick(this)");
	            //end
	           // alert(rendererArr[0]);
	           
	         for(var j=0;j<dataIndexArr.length;j++)
	           {	
	                //modify zhaojinyu 2012-05-23 修改序列不在第一列错误
					if(dataIndexArr[j] == undefined || rendererArr[j] == "function getIndex(){}")
					{//序号判断
					
						if(this.curPage == 1)
						{//计算序号
							index = r;
						}else
						{
							index = parseInt(this.curPage-1)*this.pageSize + r;
						}			
						this.table.rows[r].cells[j].innerHTML = index; 
						this.table.rows[r].cells[j].style.textAlign = 'center';//		
					}
				}
				this.table.rows[r].onmouseover = function(){ this.style.backgroundColor = createGrid.hoverColor; }
				this.table.rows[r].onmouseout = function(){ 
					if(CurGrid.curRow!=this) this.style.backgroundColor = createGrid.backColor; 
					else this.style.backgroundColor = createGrid.clickColor;
				}
	
				for(var c=0;c<this.table.rows[r].cells.length;c++)
				{
				    // added by andy.ten@tom.com
				    var cell = this.table.rows[r].cells[c];
				    var cellHTML = cell.innerHTML;
				    if(cell && cell.innerText && typeof(cellHTML) == "string" && cellHTML.indexOf("href") == -1 && cellHTML.indexOf("select") == -1)
				    {
				        var cellText = cell.innerText;
				        if(cellText.length)
				        {
				        	if(cellText.length > 20)
				        	{	
				        		if(cellHTML.indexOf("<table")!=-1 || cellHTML.indexOf("<TABLE")!=-1){ //主要是renderer换行显示
				        			//this.table.rows[r].cells[c].innerText = cellText;//cellText.substr(0,10) + "...";
				        			//this.table.rows[r].cells[c].title = cellText;
				        			continue;
				        		}else{
				        			this.table.rows[r].cells[c].innerText = cellText.substr(0,10) + "...";
				        			this.table.rows[r].cells[c].title = cellText;
				        		}	
				        	}
				        }	
				    }
				    // end	
					this.table.rows[r].cells[c].onclick = function()
					{
						if(CurGrid.curRow) CurGrid.curRow.style.backgroundColor = createGrid.backColor;
						CurGrid.curRow = this.parentNode;
						CurGrid.curRow.style.backgroundColor = createGrid.clickColor;
					}
	
				}
			}

			for(var g=0; g<this.table.rows[0].cells.length;g++){
				this.table.rows[0].cells[0].style.textAlign = 'center';//
				if(this.columns[g].orderCol != undefined){
					this.table.rows[0].cells[g].onclick = function(){

						var _order = 1;
						if(!$("queryBtn").disabled){//亮
							//if(CurGrid.table.rows[0].cells[this.cellIndex].innerHTML.lastIndexOf('▲')!= -1){
							if(CurGrid.table.rows[0].cells[this.cellIndex].className == "ascMask"){
								_order = '-1';
							}								
						}else{
							if($("orderCol").value != this.cellIndex){return false;}
							if(CurGrid.table.rows[0].cells[this.cellIndex].className == "ascMask"){
								_order = '1';
							}
							if(CurGrid.table.rows[0].cells[this.cellIndex].className == "descMask"){
								_order = '-1';
							}
						}
						CurGrid.sort(this.cellIndex, CurGrid.columns[this.cellIndex].orderCol,_order,CurGrid.columns[this.cellIndex].orderType);	

					}
				}
			}
			//added by andy.ten@tom.com
			customTableFunc(this.table);
			//end
		}
	
		this.sort = function(n, orderCol,order,orderType){  //排序 n-列 type-升降序
		
			if(typeof(this.remoteSort) == 'undefined' || this.remoteSort == false){//当前页排序			
				this.jsonData = this.jsonData.sort(function(x,y){
					if (x[n]>y[n]){return type;}else if(x[n]<y[n]){return -type;}else{return 0;}});
			}else{//远程排序
				if($('myTable') != null){
					removeGird(this.container);
				}
				myRemoteSort(orderCol,order,orderType);
			}
																					
			this.load();
		
		}
		
	}
	
	//远程排序接口
	function myRemoteSort(orderCol,order,orderType){
		//排序类型 0:不排 -1:降序 1:升序
		if(orderType!=undefined&&orderType!=""){
			$("orderCol").value = orderCol+"-"+orderType;
		}else{
			$("orderCol").value = orderCol;
		}
		$("order").value = order;

		if(!$("queryBtn").disabled){//亮
			__extQuery__(1);
		}
		//alert("当前列="+col+" | "+"排序类型="+order +" | "+ "此为排序接口，远程请求在此写！");
	}

	function getIndex(){}

	function hiddenDocObject(flag){
	try{

	    if(HIDDEN_ARRAY_IDS){
	       for(var i=0;i<HIDDEN_ARRAY_IDS.length;i++){
	          if($(HIDDEN_ARRAY_IDS[i]) && flag==1)
	          	$(HIDDEN_ARRAY_IDS[i]).hide();
	          else if($(HIDDEN_ARRAY_IDS[i]) && flag==2)
	             $(HIDDEN_ARRAY_IDS[i]).show();
	       }
	    }
	    }catch(ee){
	    }
	}
	//Ajax返回调用函数 设置字段、列名属性参数
	//modified by andy.ten@tom.com
	function callBack(json,tabId,resultTitle,showResultFlag){
		//alert("debug:"+tabList.id);
		var ps;
		//modified by andy.ten@tom.com 20101206
		
		//设置对应数据
		var s = "ps";
		if($(tabId) && $(tabId).bindPs)
			s = $(tabId).bindPs;
		if(Object.keys(json).length>0){
			keys = Object.keys(json);
			for(var i=0;i<keys.length;i++){
			   if(keys[i] ==s){
				   ps = json[keys[i]];
				   break;
			   }
			}
		//	ps = json[Object.keys(json)[0]]; 
		}
		//alert("ps:"+ps);
		//生成数据集
		if(ps.records != null)
		{
			//分页
			//modified by andy.ten@tom.com 20101206
			if(tabId && $(tabId))
			{
				$($(tabId).bindPage).hide();
				$($(tabId).bindGrid).show();
				new createGrid(title,resultTitle, $($(tabId).bindGrid),ps,tabId).load();
				$(tabId).myPage = new showPages($(tabId).page,ps,$(tabId).queryAction,tabId,resultTitle);
				$(tabId).myPage.printHtml();
			}	
			else
			{
				$("_page").hide();
				$('myGrid').show();		
				new createGrid(title,columns, $("myGrid"),ps).load();
				myPage = new showPages("myPage",ps,url);
				myPage.printHtml();
			}
			hiddenDocObject(2);
		}else
		{
			//modified by andy.ten@tom.com 20101206
			if(tabId && $(tabId))
			{
				if(showResultFlag != "undefined" && showResultFlag == false)
				{
					$($(tabId).bindPage).show();
					$($(tabId).bindPage).innerHTML = "";
					$($(tabId).page).innerHTML = "";
					removeGird($(tabId).bindGrid);
					$($(tabId).bindGrid).hide();
					hiddenDocObject(1);
				}else
				{
					$($(tabId).bindPage).show();
					$($(tabId).bindPage).innerHTML = "<div class='pageTips'>没有满足条件的数据</div>";
					$($(tabId).page).innerHTML = "";
					removeGird($(tabId).bindGrid);
					$($(tabId).bindGrid).hide();
					hiddenDocObject(1);
				}
				
			}	
			else
			{
				$("_page").show();
			 	$("_page").innerHTML = "<div class='pageTips'>没有满足条件的数据</div>";
				$("myPage").innerHTML = "";
				removeGird('myGrid');
				$('myGrid').hide();
				hiddenDocObject(1);
			}
			
		}
		//useableBtn($("queryBtn"));
		//added by andy.ten@tom.com 2010-12-6
		if($("showSelected") && $("showSelected").value)
		{
			var column;
			if($("showSelected").column)
				column = $("showSelected").column;
			else
				column = 0;
			var rows;
			try
			{
				if($("x_"+tabId))
					rows = $("x_"+tabId).rows;
				else
					rows = $("mytable").rows;
				for(var i=1;i<rows.length;i++)
				{
					if(rows[i].cells[column].firstChild && rows[i].cells[column].firstChild.checked == false)
					{
						var index = $("showSelected").value.indexOf(rows[i].cells[column].firstChild.value);
						if(index >= 0)
						{
							rows[i].cells[column].firstChild.checked = true;
							try
							{
								customOtherValue(rows[i],rows[i].cells[column].firstChild.value);
							}catch(e){}	
						}	
					}
				}
			}catch(e){}	
		}
	}
/*============================================分页=================================================*/

	function showPages(name,ps,url,tabId,resultTitle) { //初始化属性
		this.name = name; //对象名称
		this.url = url; //action
		this.page = ps.curPage; //当前页数
		this.pageCount = ps.totalPages; //总页数
		this.totalRecords = ps.totalRecords; //总记录数
		//added by andy.ten@tom.com 20101206
		this.tabId = tabId;
		this.resultTitle = resultTitle;
	}
	
	
	
	showPages.prototype.getPage = function(){ //丛url获得当前页数,如果变量重复只获取最后一个
		var args = location.search;
		var reg = new RegExp('[\?&]?' + this.argName + '=([^&]*)[&$]?', 'gi');
		var chk = args.match(reg);
		this.page = RegExp.$1;
	}
	showPages.prototype.checkPages = function(){ //进行当前页数和总页数的验证
		if (isNaN(parseInt(this.page))) this.page = 1;
		if (isNaN(parseInt(this.pageCount))) this.pageCount = 1;
		if (this.page < 1) this.page = 1;
		if (this.pageCount < 1) this.pageCount = 1;
		if (this.page > this.pageCount) this.page = this.pageCount;
		this.page = parseInt(this.page);
		this.pageCount = parseInt(this.pageCount);
	}
	showPages.prototype.createHtml = function(){ //生成html代码
		var strHtml = '', prevPage = this.page - 1, nextPage = this.page + 1;
		//如果定义了GOLB_HIDE_HREF这个变量，则在查询的结果集只有一页的时候，不显示右下脚的分页显示信息
		if(this.pageCount>1){
			strHtml += '<span class="count">总条数: ' + this.totalRecords + '</span>';
			strHtml += '<span class="number">';
		    
			if (prevPage < 1) {
			  // strHtml += '<span title="First Page">&#171;</span>';
			} else {
			//strHtml += '<span title="First Page"><a href="javascript:' + this.name + '.toPage(1);">&#171;</a></span>';
			strHtml += '<span title="Prev Page"><a href="javascript:' + this.name + '.toPage(' + prevPage + ');">上一页</a></span>';
			}
			//if (this.page != 1)
			if (this.page < 5 && this.page > 1) strHtml += '<span title="Page 1"><a href="javascript:' + this.name + '.toPage(1);">1</a></span>';
			if (this.page >= 5) strHtml += '<span title="Page 1"><a href="javascript:' + this.name + '.toPage(1);">1..</a></span>';//strHtml += '<span style="border:none; background:#FFF;"><a href="javascript:void(0)">1...</a></span>';
			if (this.pageCount > this.page + 2) {
			var endPage = this.page + 2;
			} else {
			var endPage = this.pageCount;
			}
			
			for (var i = this.page - 2; i <= endPage; i++) {
			if (i > 0) {
			  if (i == this.page) {
				 strHtml += '<span title="Page ' + i + '"><a href="javascript:void(0)" style="color:#FF9900;background:#DDD;">' + i + '</a></span>';
			  } else {
				if (i != 1 && i != this.pageCount) {
				 strHtml += '<span title="Page ' + i + '"><a href="javascript:' + this.name + '.toPage(' + i + ');">' + i + '</a></span>';
				}
			  }
			}
			}
			if (this.page + 3 <= this.pageCount) strHtml += '<span title="Page ' + this.pageCount + '"><a href="javascript:' + this.name + '.toPage(' + this.pageCount + ');">..' + this.pageCount + '</a></span>';//strHtml += '<span style="border:none; background:#FFF;"><a href="javascript:void(0)">..</a></span>';
			if (this.page + 3 > this.pageCount && this.page != this.pageCount) strHtml += '<span title="Page ' + this.pageCount + '"><a href="javascript:' + this.name + '.toPage(' + this.pageCount + ');">' + this.pageCount + '</a></span>';
			if (nextPage > this.pageCount) {
			//strHtml += '<span title="Next Page">&#8250;</span>';//strHtml += '<span title="Last Page">&#187;</span>';
			} else {
			strHtml += '<span title="Next Page"><a href="javascript:' + this.name + '.toPage(' + nextPage + ');">下一页</a></span>';
			// strHtml += '<span title="Last Page"><a href="javascript:' + this.name + '.toPage(' + this.pageCount + ');">&#187;</a></span>';
			}	  
			
			if (this.pageCount < 1) {
			strHtml += '<input type="text" name="toPage" value="No Pages" class="mini_txt" disabled="disabled" style="margin-left:-10px;">';
			strHtml += '<input type="button" name="go" value="GO" class="mini_btn" disabled="disabled">';
			} else {
			strHtml += '<input type="text" id="pageInput' + '" value="' + this.page + '" class="mini_txt" title="Input page" onkeydown="return ' + this.name + '.formatInputPage(event);" onfocus="this.select()" style="margin-left:-10px;">&nbsp;';
			strHtml += '<input type="button" name="go" value="Go" class="mini_btn" onclick="' + this.name + '.toPage(document.getElementById(\'pageInput' + '\').value);">';
			}
			strHtml += '</div>';
		}
		//alert(strHtml);
		return strHtml;
	}

	//added by andy.ten@tom.com
	showPages.prototype.createHtmlByTabList = function(){ //生成html代码
		var strHtml = '', prevPage = this.page - 1, nextPage = this.page + 1;
		//如果定义了GOLB_HIDE_HREF这个变量，则在查询的结果集只有一页的时候，不显示右下脚的分页显示信息
		if(this.pageCount>1){
			strHtml += '<span class="count">总条数: ' + this.totalRecords + '</span>';
			strHtml += '<span class="number">';
		    var sMyPage;
			if (prevPage < 1) {
			  // strHtml += '<span title="First Page">&#171;</span>';
			} else {
			//strHtml += '<span title="First Page"><a href="javascript:' + this.name + '.toPage(1);">&#171;</a></span>';
			strHtml += '<span title="Prev Page"><a href="javascript:' + 'toNewPage(' + prevPage + ',\''+this.tabId+'\');">上一页</a></span>';
			}
			//if (this.page != 1)
			if (this.page < 5 && this.page > 1) strHtml += '<span title="Page 1"><a href="javascript:' + 'toNewPage(1,\''+this.tabId+'\')">1</a></span>';
			if (this.page >= 5) strHtml += '<span title="Page 1"><a href="javascript:' + 'toNewPage(1,\''+this.tabId+'\');">1..</a></span>';//strHtml += '<span style="border:none; background:#FFF;"><a href="javascript:void(0)">1...</a></span>';
			if (this.pageCount > this.page + 2) {
			var endPage = this.page + 2;
			} else {
			var endPage = this.pageCount;
			}
			
			for (var i = this.page - 2; i <= endPage; i++) {
			if (i > 0) {
			  if (i == this.page) {
				 strHtml += '<span title="Page ' + i + '"><a href="javascript:void(0)" style="color:#FF9900;background:#DDD;">' + i + '</a></span>';
			  } else {
				if (i != 1 && i != this.pageCount) {
				 strHtml += '<span title="Page ' + i + '"><a href="javascript:' + 'toNewPage(' + i + ',\''+this.tabId+'\');">' + i + '</a></span>';
				}
			  }
			}
			}
			
			if (this.page + 3 <= this.pageCount) strHtml += '<span title="Page ' + this.pageCount + '"><a href="javascript:' + 'toNewPage(' + this.pageCount + ',\''+this.tabId+'\');">..' + this.pageCount + '</a></span>';//strHtml += '<span style="border:none; background:#FFF;"><a href="javascript:void(0)">..</a></span>';
			if (this.page + 3 > this.pageCount && this.page != this.pageCount) strHtml += '<span title="Page ' + this.pageCount + '"><a href="javascript:' + 'toNewPage(' + this.pageCount + ',\''+this.tabId+'\');">' + this.pageCount + '</a></span>';
			if (nextPage > this.pageCount) {
			//strHtml += '<span title="Next Page">&#8250;</span>';//strHtml += '<span title="Last Page">&#187;</span>';
			} else {
			strHtml += '<span title="Next Page"><a href="javascript:' + 'toNewPage(' + nextPage + ',\''+this.tabId+'\');">下一页</a></span>';
			// strHtml += '<span title="Last Page"><a href="javascript:' + this.name + '.toPage(' + this.pageCount + ');">&#187;</a></span>';
			}	  
			
			if (this.pageCount < 1) {
			strHtml += '<input type="text" name="toPage" value="No Pages" class="mini_txt" disabled="disabled" style="margin-left:-10px;">';
			strHtml += '<input type="button" name="go" value="GO" class="mini_btn" disabled="disabled">';
			} else {
			strHtml += '<input type="text" id="pageInput_'+this.tabId + '" value="' + this.page + '" class="mini_txt" title="Input page" onkeydown="return ' + sMyPage + '.formatInputPage(event);" onfocus="this.select()" style="margin-left:-10px;">&nbsp;';
			strHtml += '<input type="button" name="go" value="Go" class="mini_btn" onclick="' + 'toNewPage(document.getElementById(\'pageInput_' + ''+this.tabId+'\').value,\''+this.tabId+'\');">';
			}
			strHtml += '</div>';
			//alert(strHtml);
		}
		//alert(strHtml);
		return strHtml;
	}
	
	showPages.prototype.createUrl = function (page) { //生成页面跳转url
		if (isNaN(parseInt(page))) page = 1;
		if (page < 1) page = 1;
		if (page > this.pageCount) page = this.pageCount;
		var url = location.protocol + '//' + location.host + location.pathname;
		var args = location.search;
		var reg = new RegExp('([\?&]?)' + this.argName + '=[^&]*[&$]?', 'gi');
		args = args.replace(reg,'$1');
		if (args == '' || args == null) {
		args += '?' + this.argName + '=' + page;
		} else if (args.substr(args.length - 1,1) == '?' || args.substr(args.length - 1,1) == '&') {
		  args += this.argName + '=' + page;
		} else {
		  args += '&' + this.argName + '=' + page;
		}
		return url + args;
	}

	showPages.prototype.toPage = function(page){ //页面跳转
	  /*var turnTo = 1;
	  if (typeof(page) == 'object') {
		turnTo = page.options[page.selectedIndex].value;
	  } else {
		turnTo = page;
	  }
	  self.location.href = this.createUrl(turnTo);*/
	  //removeGird('myGrid');
	  if(page>=1 && page<=this.pageCount)
	  {
	  	//modified by andy.ten@tom.com
	  	if(this.tabId)
	  	{
	  		var sUrl = $(this.tabId).queryAction;
	  		//var sParams = $(this.tabId).queryCondition;
	  		var sParam;
	  		var sParams = doCombineCond($($(this.tabId).bindQTab));
	  		if(sParams)   sParam = {"params":sParams};
    		else        sParam = {"params":''};
			$(this.tabId).queryCondition = sParam;
			if($("condition"))
				$("condition").value = sParams;
			var curPage = "curPage";
			if($(this.tabId).bindCurPage)
				curPage = $(this.tabId).bindCurPage;
	  		makeCall(sUrl+(sUrl.lastIndexOf("?") == -1?"?":"&")+curPage+"="+page,callBack,sParam,1,'',this.tabId,this.resultTitle);
	  	}else
	  		__extQuery__(page);	
	  	//end
	  }
	  	
	  //makeFormCall(this.url+"&curPage="+page,callBack,'fm');
	}
	
	showPages.prototype.printHtml = function(){ //显示html代码
  		//this.getPage();	
		//this.checkPages();
		//var pageBox = this.name;
		//modified by andy.ten@tom.com
		if(this.tabId)
		{
			$($(this.tabId).page).innerHTML = this.createHtmlByTabList();
			//alert($($(this.tabId).page).innerHTML);
		}	
		else
		    $(this.name).innerHTML = this.createHtml();
		//callBack();
	}

	showPages.prototype.formatInputPage = function(evt){ //限定输入页数格式
		//modified by andy.ten@tom.com 2010-12-06
		var s = "pageInput";
	    if(this.tabId)
	    {
	    	s = "pageInput_"+this.tabId;
	    }
		var evt=evt?evt:(window.event?window.event:null);
		if(evt.keyCode == 13 && $(s).value>=1 && $(s).value<=this.pageCount){
			__extQuery__($F(s));	
		}
		/*var ie = navigator.appName=="Microsoft Internet Explorer"?true:false;
		if(!ie) var key = e.which;
		else var key = event.keyCode;
		if (key == 8 || key == 46 || (key >= 48 && key <= 57)) return true;
		return false;*/
	 }

	 
	 /*============================================查询效果 部分===========================================*/
		function disableBtn(obj){
			obj.disabled = true;
			//obj.style.border = '1px solid #999';
			//obj.style.background = '#EEE';
			//obj.style.color = '#999';
			showMask();
		}
		function disableBtn2(obj){
			obj.disabled = true;
			//obj.style.border = '1px solid #999';
			//obj.style.background = '#EEE';
			//obj.style.color = '#999';
			//showMask();
		}
		function useableBtn(obj){
			obj.disabled = false;
			//obj.style.border = '1px solid #5E7692';
			//obj.style.background = '#EEF0FC';
			//obj.style.color = '#1E3988';
			removeMask();
		}
		
		function showMask(){
			if($('loader')){
				var screenW = document.viewport.getWidth()/2;	
				$('loader').style.left = (screenW-20) + 'px';
				$('loader').innerHTML = ' 正在载入中... ';
				$('loader').show();
			}
		}
		
		function removeMask(){
			if($('loader'))
				$('loader').hide();
		}
		
		/**function showMask(){
			var divObj = document.createElement("div");
			divObj.innerHTML = '<div>正在载入中...</div>';
			var screenW = document.viewport.getWidth()/2;	
			divObj.style.left = screenW + 'px';
			divObj.style.zIndex = 200;
			divObj.style.position = 'absolute';
			divObj.style.background = '#FFCC00';
			divObj.style.padding = '1px';
			divObj.style.top = '4px';
			divObj.id = 'loader';	
			document.body.appendChild(divObj);	
		}
		
		function removeMask(){
			$('loader').remove();
		}*/
        //add by zhaolunda 2010-06-13 重新生成列
        function reCreateGrid(title, columns, cnt, ps){
        	createGrid.backColor = "#FDFDFD";	
        	createGrid.hoverColor = "#EEEEEE";
        	createGrid.clickColor = "#EEEEEE";

        	this.title = title;
        	this.columns = columns;
        	this.container = cnt;
        	this.table;
        	this.curRow;
        	this.curCell;
        	this.curColums;
        	this.jsonData = ps.records;
        	this.remoteSort = true;
        	this.curPage = ps.curPage;
        	this.pageSize = ps.pageSize;

        	var CurGrid = this;

        	this.load = function(){//grid重画模块

        		if($('myTable') != null){
        			removeGird(this.container);
        		}
        		var tbStr = [], dataIndexArr = [], rendererArr = [], cellCnt=[],index,noWrap,colMask;

        		tbStr.push("<table id='myTable' class='table_list' style='border-bottom:1px solid #DAE0EE'><tr class='table_list_th'>");

        		for(var o=0; o< this.columns.length; o++){//列名	

        			if(this.columns[o].orderCol != undefined){
        				
        				if($("orderCol").value == this.columns[o].orderCol||$("orderCol").value.split("-")[0]== this.columns[o].orderCol){
        					if($("order").value == '-1'){
        						colMask = "descMask";						
        					}else if($("order").value == '1'){
        						colMask = "ascMask";
        					}
        				}else{
        					colMask = "sortMask";
        				}
        			}else{
        				colMask = "noSort";
        			}

        			if(this.columns[o].width == undefined){
        				tbStr.push("<th class='"+ colMask + "'>"+ this.columns[o].header+"</th>");
        			}else{			
        				tbStr.push("<th class='"+ colMask + "'" +"width="+ this.columns[o].width +">"+ this.columns[o].header+"</th>");
        			}				
        			dataIndexArr.push(this.columns[o].dataIndex);//记录dataIndex				
        			rendererArr.push(this.columns[o].renderer);  //记录renderer
        		}

        		tbStr.push("</tr>");

        		for(var i=0; i< this.jsonData.length;i++){//
        			/*if(i%2 != 0){tbStr.push("<tr class='table_list_row1'>");}else{tbStr.push("<tr class='table_list_row2' >");}*/	
        			if((i & 1)==1){
        				tbStr.push("<tr class='table_list_row2'>");
        			}else{
        				tbStr.push("<tr class='table_list_row1'>");
        			}	
        			
        			for(var j=0;j<dataIndexArr.length;j++){	
        				
        				cellCnt = this.jsonData[i][dataIndexArr[j]];//根据dataIndex显示后台数据
        				//alert("测试222222："+this.jsonData[i][dataIndexArr[j]]);
        				if(cellCnt == null || cellCnt == undefined){
        					cellCnt ='';
        				}
        				//alert(this.jsonData[i][dataIndexArr[j]] == undefined);
        				
        				if(typeof(rendererArr[j])=='function'){//列名有renderer属性
        					var __data__ = {};
        					__data__.data = this.jsonData[i];
        					cellCnt = this.columns[j].renderer(cellCnt,{},__data__);//显示renderer函数，传值		
        				}
        				
        				if(this.columns[j].style == undefined){
        					styleV = '';
        				}else{
        					styleV = this.columns[j].style;
        				}
        				
        				if(this.columns[j].isColor == undefined){
        		  			tbStr.push("<td style='"+ styleV +"'>" + cellCnt + "</td>");
        				}else{
        				  
        				  if(this.columns[j].isColor == 'true'){
        				  	tbStr.push("<td  style='padding:2px;background:"+cellCnt+"'>" + '&nbsp;' + "</td>");}
        				  else{
        				  	tbStr.push("<td  bgcolor='"+cellCnt+"'>" + cellCnt + "</td>");
        				  	}
        				}
        			}				
        			tbStr.push("</tr>");

        			
        		}
        				
        		tbStr.push("</table>");
        		this.container.innerHTML = tbStr.join("");
        		this.table = this.container.firstChild;

        		if(this.title != null){//表格标题	
        			var x = $('myTable').createCaption();
        			x.innerHTML = "<span class='navi'>&nbsp;</span>"+this.title;
        		}

        		/** 设置单元格  **/
        		for(var r=1; r<this.table.rows.length;r++){

               for(var j=0;j<dataIndexArr.length;j++)
	           {
	                //modify zhaojinyu 2012-05-23 修改序列不在第一列错误
        			if(dataIndexArr[j] == undefined || rendererArr[j] == "function getIndex(){}"){//序号判断
        			
        				if(this.curPage == 1){//计算序号
        					index = r;
        				}else{
        					index = parseInt(this.curPage-1)*this.pageSize + r;
        				}			
        				this.table.rows[r].cells[j].innerHTML = index; 
        				this.table.rows[r].cells[j].style.textAlign = 'center';//序号单元格居中			
        			}
        		}	
        			this.table.rows[r].onmouseover = function(){ this.style.backgroundColor = createGrid.hoverColor; }
        			this.table.rows[r].onmouseout = function(){ 
        				if(CurGrid.curRow!=this) this.style.backgroundColor = createGrid.backColor; 
        				else this.style.backgroundColor = createGrid.clickColor;
        			}

        			for(var c=0;c<this.table.rows[r].cells.length;c++){
        				this.table.rows[r].cells[c].onclick = function(){
        					if(CurGrid.curRow) CurGrid.curRow.style.backgroundColor = createGrid.backColor;
        					CurGrid.curRow = this.parentNode;
        					this.parentNode.style.backgroundColor = createGrid.clickColor;
        				}

        			}
        		}

        		for(var g=0; g<this.table.rows[0].cells.length;g++){
        			this.table.rows[0].cells[0].style.textAlign = 'center';//序号列居中
        			if(this.columns[g].orderCol != undefined){
        				this.table.rows[0].cells[g].onclick = function(){

        					var _order = 1;
        					if(!$("queryBtn").disabled){//亮
        						//if(CurGrid.table.rows[0].cells[this.cellIndex].innerHTML.lastIndexOf('▲')!= -1){
        						if(CurGrid.table.rows[0].cells[this.cellIndex].className == "ascMask"){
        							_order = '-1';
        						}								
        					}else{
        						if($("orderCol").value != this.cellIndex){return false;}
        						if(CurGrid.table.rows[0].cells[this.cellIndex].className == "ascMask"){
        							_order = '1';
        						}
        						if(CurGrid.table.rows[0].cells[this.cellIndex].className == "descMask"){
        							_order = '-1';
        						}
        					}
        					CurGrid.sort(this.cellIndex, CurGrid.columns[this.cellIndex].orderCol,_order,CurGrid.columns[this.cellIndex].orderType);	

        				}
        			}
        		}
        		
        	}

        	this.sort = function(n, orderCol,order,orderType){  //排序 n-列 type-升降序
        	
        		if(typeof(this.remoteSort) == 'undefined' || this.remoteSort == false){//当前页排序			
        			this.jsonData = this.jsonData.sort(function(x,y){
        				if (x[n]>y[n]){return type;}else if(x[n]<y[n]){return -type;}else{return 0;}});
        		}else{//远程排序
        			if($('myTable') != null){
        				removeGird(this.container);
        			}
        			myRemoteSort(orderCol,order,orderType);
        		}
        																				
        		this.load();
        	}
        }