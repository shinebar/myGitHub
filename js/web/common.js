window.onunload = function gbg(){

	if(parent.$('inIframe')){
		//parent.$('inIframe').document.write("");
		//parent.$('inIframe').document.clear();
		//parent.$('inIframe').src = '';
		CollectGarbage();
	}
}

/**
 * 复选框的多选
 */
function selectAll(checkObj,checkBoxName){ 
    //modified by pan.gaoming@infoservice.com.cn
    window.event.cancelBubble = true;
    //end
	var allChecks = document.getElementsByName(checkBoxName);
	if(checkObj.checked){
		for(var i = 0;i<allChecks.length;i++){
			allChecks[i].checked = true;
		}
	}else{
		for(var i = 0;i<allChecks.length;i++){
			allChecks[i].checked = false;
		}
	}
}

/**
 * 复选框的多选(table上的列)
   @params checkObj 选择对象
   @params checkBoxName 选择框名称
   @params tableId 
   @params splicVal 拼接值
   @params connVal 连接符号
 */
function selectAllTwo(checkObj,checkBoxName,tableId,splicVal,connVal){ 
    //modified by pan.gaoming@infoservice.com.cn
    window.event.cancelBubble = true;
    var allChecks = document.getElementsByName(checkBoxName);
	if(checkObj.checked){
		var tab=document.getElementById(tableId);
		var allChecks=document.getElementsByName("cb");
		if(!allChecks) return;
		for(var i=0;i<allChecks.length;i++)
		{
	        if(allChecks[i].checked) continue;
			allChecks[i].checked=true;
			var splicArray = splicVal.split(",");
			var cell = '';
			for(var j=0;j<splicArray.length;j++){
				if(j==splicArray.length-1){
					cell+=tab.rows[i+1].cells[splicArray[j]].innerText;
				}else{
					cell+=tab.rows[i+1].cells[splicArray[j]].innerText+connVal;
				}
			}
			doSelected(allChecks[i],cell);
		}
	}else{
		var tab=document.getElementById(tableId);
		var allChecks=document.getElementsByName("cb");
		if(!allChecks) return;
		for(var i=0;i<allChecks.length;i++)
		{
	        if(!allChecks[i].checked)continue;
			allChecks[i].checked=false;
			var splicArray = splicVal.split(",");
			var cell = '';
			for(var j=0;j<splicArray.length;j++){
				if(j==splicArray.length-1){
					cell+=tab.rows[i+1].cells[j+1].innerText;
				}else{
					cell+=tab.rows[i+1].cells[j+1].innerText+connVal;
				}
			}
			doSelected(allChecks[i],cell);
		}
	}
}


/**
 * 将选择框的某一项选中
 */
function selectOption(value,selectBoxName){
	var allSelects = $(selectBoxName);
	for(var i = 0;i<allSelects.length;i++){
		if(allSelects[i].value==value){
			allSelects[i].selected = true;
			break;
		}
	}
}
/**
 * 检查复选框
 */
function checkselectAllBox(checkObj,checkAllId,checkBoxName){
	var checkAllObj = document.getElementById(checkAllId);
	var allChecks = document.getElementsByName(checkBoxName);
	var allFlag = true;
	if(checkObj.checked){
		for(var i = 0;i<allChecks.length;i++){
			if(allChecks[i].checked){
				
			}else{
				checkAllObj.checked = false;
				allFlag = false;
				return;
			}
		}
		if(allFlag==true){
			checkAllObj.checked = true;
		}
	}else{
		checkAllObj.checked = false;
	}
}

/*-------------------------- window.open 弹出效果 ----------------------*/
function openNewWindow(wName, width, height, url){
	window.open(url,wName,'width='+width+',height='+height+',toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,copyhistory=no,resizable=yes,alwaysRaised=yes,depended=yes');
}
/*-------------------------- 为页面上的所有table加上序号一列 ----------------------*/
	function __initTd__() {
		var tableObj = document.getElementsByTagName("table");
		var __td__;
		for(out=0;out<tableObj.length;out++) {
			if(tableObj[out].className == "table_list") {
				for(i=0;i<tableObj[out].rows.length;i++) {
					__td__ = tableObj[out].rows[i].insertCell(0);//document.createElement(i<1?'th':'td');
					if(i<1) {
						__td__.style.background = "#DAE0EE"; 
						__td__.style.color = "#08327E";
						__td__.style.padding = "0px 2px 0px 2px";
					}
					__td__.style.borderLeft = "none";
					__td__.innerHTML = i < 1 ? "序号" : i;
					//tableObj[out].rows[i].appendChild(__td__);
				}
			}
		}
	}
/*--------------------------end-----------------------------------------------------*/
function setAllSelect(){
	document.write("-请选择-");
}

/*----------------------------客户管理的相关模块的公用js--add by zhangxianchao--------*/
//根据选择的客户类型变换主要信息
function changeCustomerType(obj,personal,corp){
	if(obj.value==personal){
		$("personalInput").style.display = "inline";
		$("companyInput").style.display = "none";
		showDetailMore2(personal,corp);
	}else{
		$("personalInput").style.display = "none";
		$("companyInput").style.display = "inline";
		showDetailMore2(personal,corp);
	}
}
//根据选择的客户类型变换主要信息
function changeCustomerType2(obj,personal,corp){
	if(obj.value==personal){
		$("personalInput").style.display = "inline";
		$("companyInput").style.display = "none";
	}else{
		$("personalInput").style.display = "none";
		$("companyInput").style.display = "inline";
	}
}
//根据选择的客户变换客户选择的内容。
function showCustomerMessage(obj){
	$('customerInput').style.display = "none";
	$('customerInfo').style.display = "inline";
}
//改变详细信息的显示样式
function showDetailMore2(personal,corp){
	var customertype = $F("cus_type");
	if(customertype==personal){
		if(document.getElementById("companyDetailMoreDiv").style.display=="inline"){
			document.getElementById("companyDetailMoreDiv").style.display="none";
			document.getElementById("personalDetailMoreDiv").style.display = "inline";
		}
	}else{
		if(document.getElementById("personalDetailMoreDiv").style.display=="inline"){
			document.getElementById("personalDetailMoreDiv").style.display = "none";
			document.getElementById("companyDetailMoreDiv").style.display="inline";
		}
	}
}
//弹出选择用户的公共页面
function openUserSearch(path){
	OpenHtmlWindow(path+"/UserManager/UserSearch.do",800,500);
}

//生成爱好
function generateFavor(code,hobby,flag){
	var _codeData_ = codeData;
	var data = new Array();
	var k =0;
	var splits = null;
	if(hobby!=undefined&&hobby!=""){
		splits = hobby.split(",");
	}
	if(flag!=undefined&&flag=="true"){
		flag = true;
	}else if(flag!=undefined&&flag=="false"){
		flag = false;
	}
    data.push('<table border=0><TBODY>');
    var rowFlag = false;
    for(var i=0;i<_codeData_.length;i++){
    	if(_codeData_[i].type == code){
    		if(k%6==0){
    			data.push('<tr>');
    			rowFlag = false;
    		}
    		var temp = '<td width="115"><input type="checkbox"';
    		if(splits!=null){
	    		for(var j=0;j<splits.length;j++){
	    			temp +=(codeData[i].codeId == splits[j] ? "checked" : "");
	    		}
    		}
    		if(!flag){
    			temp+=' disabled="disabled" ';
    		}
    		temp+=' name="personal_favor"   value = '+_codeData_[i].codeId+'/>'+_codeData_[i].codeDesc+'</td>';
    		data.push(temp);
    		if((k+1)%6==0){
    			data.push('</tr>');
    			rowFlag = true;
     		}
    		k++;
    	}
    }
    if(!rowFlag){
    	data.push('</tr>');
    }
   data.push('</TBODY></table>');
  document.write(data.join(''));
}
//生成了解渠道
function generateKnowChannel(code,channel,flag,otherRemark){
	var _codeData_ = codeData;
	var data = new Array();
	var k =0;
	var splits = null;
	if(channel!=undefined&&channel!=""){
		splits = channel.split(",");
	}
	if(flag!=undefined&&flag=="true"){
		flag = true;
	}else if(flag!=undefined&&flag=="false"){
		flag = false;
	}
    data.push('<table border=0><TBODY>');
    var rowFlag = false;
    for(var i=0;i<_codeData_.length;i++){
    	if(_codeData_[i].type == code){
    		if(k%6==0){
    			data.push('<tr>');
    			rowFlag = false;
    		}
    		if(_codeData_[i].codeId=="20781010"){
    			var temp = '<td width="250" colspan="3"><input type="checkbox"';
        		if(splits!=null){
    	    		for(var j=0;j<splits.length;j++){
    	    			temp +=(codeData[i].codeId == splits[j] ? "checked" : "");
    	    		}
        		}
        		if(!flag){
        			temp+=' disabled="disabled" ';
        		}
    			temp+=' name="personal_channel" id = "otherChannel" onclick = "doOtherInput(this,\'otherDesc\');"  value = '+_codeData_[i].codeId+'/>'+_codeData_[i].codeDesc;
    			temp+= ' <input type="text" name="otherDesc" disabled="disabled" id="otherDesc" class="mid_txt"  datatype="1,is_noquotation,60" value="'+(otherRemark==undefined?'':otherRemark)+'"/>';
    			temp+= '</td>';
    		}else{
    			var temp = '<td width="115"><input type="checkbox"';
        		if(splits!=null){
    	    		for(var j=0;j<splits.length;j++){
    	    			temp +=(codeData[i].codeId == splits[j] ? "checked" : "");
    	    		}
        		}
        		if(!flag){
        			temp+=' disabled="disabled" ';
        		}
    			temp+=' name="personal_channel"   value = '+_codeData_[i].codeId+'/>'+_codeData_[i].codeDesc+'</td>';
    		}
    		data.push(temp);
    		if((k+1)%6==0){
    			data.push('</tr>');
    			rowFlag = true;
     		}
    		k++;
    	}
    }
    if(!rowFlag){
    	data.push('</tr>');
    }
   data.push('</TBODY></table>');
  document.write(data.join(''));
}
//生成过户手续
function generateTransferProcedure(code,flag,remarkArray,currentYear){
	var _codeData_ = codeData;
	var data = new Array();
	var k =0;
	if(flag!=undefined&&flag==true){
		flag = true;
	}else if(flag!=undefined&&flag==false){
		flag = false;
	}
    data.push('<table border=0><TBODY>');
    var rowFlag = false;
    for(var i=0;i<_codeData_.length;i++){
    	if(_codeData_[i].type == code){
    		if(k%3==0){
    			data.push('<tr>');
    			rowFlag = false;
    		}
    		
    		if(_codeData_[i].codeId=="20261001"||_codeData_[i].codeId=="20261002"||_codeData_[i].codeId=="20261003"||_codeData_[i].codeId=="20261007"){
    			var temp = '<td width="33%" style="text-indent: 10px;"><input type="checkbox"';
    			var remark = "";
	    		for(var j=0;j<remarkArray.length;j++){
	    			if(codeData[i].codeId == remarkArray[j].type){
	    				temp += " checked ";
	    				remark = remarkArray[j].remark;
	    			}
	    		}
        		if(!flag){
        			temp+=' disabled="disabled" ';
        		}
    			temp+=' name="transferPro" onclick="changeYearSpanVisible(this);"  value = '+_codeData_[i].codeId+'/>'+_codeData_[i].codeDesc;
    			if(_codeData_[i].codeId=="20261001"){
    				temp+=generateToDateYearMonth2(parseInt(currentYear),remark,_codeData_[i].codeId,flag);
    			}else{
    				temp+=generateToDateYearMonth(parseInt(currentYear),remark,_codeData_[i].codeId,flag);
    			}
    		}else{
    			var temp = '<td width="33%" style="text-indent: 10px;"><input type="checkbox"';
    			for(var j=0;j<remarkArray.length;j++){
	    			temp +=(codeData[i].codeId == remarkArray[j].type ? "checked" : "");
	    		}
        		if(!flag){
        			temp+=' disabled="disabled" ';
        		}
    			temp+=' name="transferPro"   value = '+_codeData_[i].codeId+'/>'+_codeData_[i].codeDesc+'</td>';
    		}
    		data.push(temp);
    		if((k+1)%3==0){
    			data.push('</tr>');
    			rowFlag = true;
     		}
    		k++;
    	}
    }
    if(!rowFlag){
    	data.push('</tr>');
    }
   data.push('</TBODY></table>');
   return data.join('');
}
//生成到期日框
function generateToDateYearMonth(currentYear,selectValue,parent,flag){
	var temp = "";
	if(selectValue!=""){
		temp+='<span id="span'+parent+'" >到期日';
	}else{
		temp+='<span id="span'+parent+'" style="visibility: hidden;">到期日';
	}
	temp+= generateYearMonth(currentYear,selectValue,flag);
	temp+= '<input type = "hidden" name = "selectNum" value = "'+parent+'" />'
	temp+='</span>';
	return temp;
}
//生成到期日框
function generateToDateYearMonth2(currentYear,selectValue,parent,flag){
	var temp = "";
	if(selectValue!=""){
		temp+='<span id="span'+parent+'" >';
	}else{
		temp+='<span id="span'+parent+'" style="visibility: hidden;">';
	}
	temp+= generateYearMonth2(currentYear,selectValue,flag);
	temp+= '<input type = "hidden" name = "selectNum" value = "'+parent+'" />'
	temp+='</span>';
	return temp;
}
function changeYearSpanVisible(obj){
	var objValue = obj.value;
	var value = objValue.substr(0,(objValue.length-1));
	if(obj.checked){
		$("span"+value).style.visibility="visible";
	}else{
		$("span"+value).style.visibility="hidden";
	}
}
//生成年月选择框
function generateYearMonth(currentYear,selectValue,flag){
	var selectYear ;
	var selectMonth;
	if(selectValue!=""){
		selectYear = parseInt(selectValue.substring(0,4));
		selectMonth = parseInt(selectValue.substring(4));
	}
	
	var temp ="";
	if(!flag){
		temp+=' &nbsp;<select  name="proYear" disabled="disabled"  >';
	}else{
		temp+=' &nbsp;<select  name="proYear"  >';
	}
	for(var i=2008;i<currentYear+12;i++){
		if(i==selectYear){
			temp+=' <option value="'+i+'" selected = "selected" >'+i+'</option>';
		}else{
			temp+=' <option value="'+i+'"  >'+i+'</option>';
		}
	}
	temp+=' </select>';
    temp+='年&nbsp;';
   
    if(!flag){
    	 temp+='<select  name="proMonth"  disabled="disabled">';
	}else{
		 temp+='<select  name="proMonth" >';
	}
    for(var i=1;i<=12;i++){
    	if(i==selectMonth){
			temp+=' <option value="'+i+'" selected = "selected" >'+i+'</option>';
		}else{
			temp+=' <option value="'+i+'"  >'+i+'</option>';
		}
    }
   temp+='</select> 月&nbsp; '
   return temp;
}
//生成年月选择框
function generateYearMonth2(currentYear,selectValue,flag){
	var selectYear ;
	var selectMonth;
	if(selectValue!=""){
		selectYear = parseInt(selectValue.substring(0,4));
		selectMonth = parseInt(selectValue.substring(4));
	}
	
	var temp ="";
	if(!flag){
		temp+=' &nbsp;<select  name="proYear" disabled="disabled"  >';
	}else{
		temp+=' &nbsp;<select  name="proYear"  >';
	}
	for(var i=(currentYear-9);i<=currentYear;i++){
		if(i==selectYear){
			temp+=' <option value="'+i+'" selected = "selected" >'+i+'</option>';
		}else{
			temp+=' <option value="'+i+'"  >'+i+'</option>';
		}
	}
	temp+=' </select>';
    temp+='年&nbsp;';
   
    if(!flag){
    	 temp+='<select  name="proMonth"  disabled="disabled">';
	}else{
		 temp+='<select  name="proMonth" >';
	}
    for(var i=1;i<=12;i++){
    	if(i==selectMonth){
			temp+=' <option value="'+i+'" selected = "selected" >'+i+'</option>';
		}else{
			temp+=' <option value="'+i+'"  >'+i+'</option>';
		}
    }
   temp+='</select> 月&nbsp; '
   return temp;
}
function doOtherInput(obj,name){
	if(obj){
		if(obj.checked){
			$(name).disabled="";
		}else{
			$(name).disabled="true";
		}
	}
}
//显示详细信息
function showDetailMessage(obj){
	if(obj==undefined||obj==null){
		return "";
	}else{
		return obj;
	}
}
//显示详细信息
function showDetailMessage1(obj){
	if(obj==undefined||obj==null||obj=='null'){
		return "";
	}else{
		return obj;
	}
}
//生成单选框的字符串
function generateRadio(obj){
	return String.format("<input type='radio' value='"+obj+"' name='selectRadio'/>");
}
//生成客户查询的单选择框
function generateCustRadio(value, metaData, record){
	return String.format("<input type='radio' value='"+record.data.custId+"' name='selectRadio' onclick = 'showCustIntent(this);'/><input type='hidden' value='"+record.data.custName+"' name='selectNameRadio'/>");
}
//生成用户查询的单选择框
function generateUserCheckBox(value, metaData, record){
	return String.format("<input type='checkbox' value='"+record.data.userId+"' name='selectCheck'/><input type='hidden' value='"+record.data.name+"' name='selectNameCheck'/>");
}
//关闭窗口
function closePage(){
	window.close();
}
//对来访对象进行覆值。
function givenVistorValue(cus_name,cus_sex,link_way,areaCode,tel){
	var cust = {};
	if(cus_name!=undefined&&cus_name!="null"&&cus_name!=""){
		cust.cus_name = cus_name;
	}
	if(cus_sex!=undefined&&cus_sex!="null"&&cus_sex!=""){
		cust.cus_sex = cus_sex;
	}
	if(link_way!=undefined&&link_way!="null"&&link_way!=""){
		cust.link_way = link_way;
	}
	var linkTel = null;
	if(areaCode!=undefined&&areaCode!="null"&&areaCode!=""){
		linkTel = areaCode;
	}
	if(tel!=undefined&&tel!="null"&&tel!=""){
		if(linkTel!=null){
			linkTel = linkTel+"-"+tel;
		}else{
			linkTel = tel;
		}
	}
	if(linkTel!=null){
		cust.linkTel = linkTel;
	}
	cust.linkType = estimateLinkType(cust);
	generateCutomerInfo(cust);
}
//判断客户的主要联系方式类型
function estimateLinkType(obj){
	if(obj.link_way!=undefined){
		return "20551001";
	}
	if(obj.linkTel!=undefined){
		return "20551002";
	}
}
//根据覆值进行客户信息的覆值
function generateCutomerInfo(obj){
	if(obj.cus_name!=undefined){
		$('cus_name_back').value = obj.cus_name;
		$('cus_name').value = obj.cus_name;
	}
	if(obj.cus_sex!=undefined){
		doSelected('personal_sex',obj.cus_sex);
		$('cus_sex_back').value = obj.cus_sex;
	}
	if(obj.link_way!=undefined){
		$('link_way').value = obj.link_way;
		$('link_way_back').value = obj.link_way;
	}
	if(obj.linkTel!=undefined){
		if($('link_way').value==""){
			$('link_way').value = obj.linkTel;
		}
		$('cus_tel_back').value = obj.linkTel;
	}
	if(obj.linkType!=undefined){
		doSelected('link_Way_Type',obj.linkType);
		$('link_type_back').value = obj.linkType;
	}
	changeVilidateFun($('link_way'));
}
function doSelected(id,value){
	var obj = $(id);
	for(var i =0;i<obj.length;i++){
		if(obj[i].value==value){
			obj[i].selected = true;
			break;
		}
	}
}
function doSelected2(obj,value){
	for(var i =0;i<obj.length;i++){
		if(obj[i].value==value){
			obj[i].selected = true;
			break;
		}
	}
}
function custBaseGivenValue(personal){
//	//客户类型
//	doSelected('cus_type',$('inIframe').contentWindow.$('cus_type').value);
//	//客户名称
//	$('cus_name').value = $('inIframe').contentWindow.$('cus_name').value;
//	$('link_way').value = $('inIframe').contentWindow.$('link_way').value;
//	$('personal_birthDay').value = $('inIframe').contentWindow.$('personal_birthDay').value;
//	$('personal_mark').value = $('inIframe').contentWindow.$('personal_mark').value;
//	$('company_charactor').value = $('inIframe').contentWindow.$('company_charactor').value;
//	$('company_dicide_positon').value = $('inIframe').contentWindow.$('company_dicide_positon').value;
//	$('company_remark').value = $('inIframe').contentWindow.$('company_remark').value;
//	$('operation_type').value = $('inIframe').contentWindow.$('operation_type').value;
//	doSelected('link_Way_Type',$('inIframe').contentWindow.$('link_Way_Type').value);
//	doSelected('personal_industry_way',$('inIframe').contentWindow.$('personal_industry_way').value);
//	doSelected('company_industry_way',$('inIframe').contentWindow.$('company_industry_way').value);
//	doSelected('company_industry_way',$('inIframe').contentWindow.$('company_industry_way').value);
	
	//客户类型
	doSelected('cus_type',window.opener.$('cus_type').value);
	//客户名称
	$('cus_name').value = window.opener.$('cus_name').value;
	$('link_way').value = window.opener.$('link_way').value;
	$('personal_birthDay').value = window.opener.$('personal_birthDay').value;
	$('personal_mark').value = window.opener.$('personal_mark').value;
	$('company_charactor').value = window.opener.$('company_charactor').value;
	$('company_dicide_positon').value = window.opener.$('company_dicide_positon').value;
	$('company_remark').value = window.opener.$('company_remark').value;
	$('operation_type').value = window.opener.$('operation_type').value;
	doSelected('link_Way_Type',window.opener.$('link_Way_Type').value);
	doSelected('personal_industry_way',window.opener.$('personal_industry_way').value);
	doSelected('company_industry_way',window.opener.$('company_industry_way').value);
	doSelected('personal_sex',window.opener.$('personal_sex').value);
	//联系人信息
	if($F("cus_type")==personal){
		document.getElementsByName("linkMan_name")[0].value = $('cus_name').value;
		document.getElementsByName("isPrimaryLinkMan")[0].checked = true;
		doSelected2(document.getElementsByName("linkMan_type")[0],'20571002');
		doSelected2(document.getElementsByName("linkMan_sex")[0],$F("personal_sex"));
		var obj = $("link_Way_Type");
		if(obj.value=='20551001'){
			document.getElementsByName("linkMan_mobile")[0].value = $('link_way').value;
			document.getElementsByName("linkMan_tel")[0].value = window.opener.$('cus_tel_back').value;
		}
		if(obj.value=='20551002'){
			document.getElementsByName("linkMan_tel")[0].value = $('link_way').value;
			document.getElementsByName("linkMan_mobile")[0].value = window.opener.$('link_way_back').value;
		}
		if(obj.value=='20551003'){
			document.getElementsByName("linkMan_fami_tel")[0].value = $('link_way').value;
			document.getElementsByName("linkMan_mobile")[0].value = window.opener.$('link_way_back').value;
		}
		if(obj.value=='20551004'){
			document.getElementsByName("linkMan_email")[0].value = $('link_way').value;
			document.getElementsByName("linkMan_mobile")[0].value = window.opener.$('link_way_back').value;
			document.getElementsByName("linkMan_tel")[0].value = window.opener.$('cus_tel_back').value;
		}
	}else{
		document.getElementsByName("linkMan_name")[0].value = window.opener.$('cus_name_back').value;
		document.getElementsByName("isPrimaryLinkMan")[0].checked = true;
		doSelected2(document.getElementsByName("linkMan_type")[0],'20571002');
		doSelected2(document.getElementsByName("linkMan_sex")[0],window.opener.$('cus_sex_back').value);
		document.getElementsByName("linkMan_mobile")[0].value = window.opener.$('link_way_back').value;
		document.getElementsByName("linkMan_tel")[0].value = window.opener.$('cus_tel_back').value;
	}
}
function setOperatonType(value){
	$("operation_type").value = value;
}
function setIntentionFlag(){
	$("intention_flag").value = true;
}
function getCommonCustId(){
	return $F("get_cust_id");
}
function getCommonCustName(){
	return $F("get_cust_name");
}
function getActionName(){
	return $F("cust_action_name");
}
function setActionName(value){
	$("cust_action_name").value = value;
}
//生成选择框
function genSelByValueBox(id,obj,selectedKey,setAll,_class_,_script_,nullFlag){ //根据type生成下拉框
	var str = "";
	str += "<select id='" + id + "' name='" + id +"' class='"+ _class_ +"' " + _script_ ;
	if(nullFlag!=undefined&&nullFlag==true){
		str += " datatype='0,is_null,200' ";
	}
	str += " > ";
	if(setAll){
		str += genDefaultOpt();
	}
	for(var i=0;i<obj.length;i++){
		str += "<option " + (obj[i].value == selectedKey ? "selected" : "") + " value='" + obj[i].value + "' title = '"+obj[i].name+"' >" + obj[i].name + "</option>";
	}
	str += "</select>";
	return str;
}
/*--------------------------------end----------------------------------------------*/
//根据联系方式类型变换数据的校验规则
function changeVilidateFun(obj){
	if(obj.value=='20551001'){
		$("link_way").datatype = "0,is_digit,11,11";
	}
	if(obj.value=='20551002'||obj.value=='20551003'){
		$("link_way").datatype = "0,is_phone,15,7";
	}
	if(obj.value=='20551004'){
		$("link_way").datatype = "0,is_email,50";
	}
}
function showOrgs(path){ //公用模块代理商选择页面
	OpenHtmlWindow(path+'/systemManager/OrgMng/queryOrgs.do',700,450);
}


function showDealer(path){ //公用模块代理商选择页面
	OpenHtmlWindow(path+'/systemManager/OrgMng/queryDealer.do',800,450);
}
/*
**代理商多选页面，可以选择多个代理商
**add by wangwenhu 2010-03-17
*/
function showDealers(path){ //公用模块代理商选择页面,多选
	OpenHtmlWindow(path+'/systemManager/OrgMng/queryDealers.do',800,450);
}
function showUpload(path,key)
{
	OpenHtmlWindow(path+'/commonUpload.jsp?flag=1&key='+key+"",500,350);
}
function doViewFile(path,key)
{
	OpenHtmlWindow(path+'/commonViewFile.jsp?flag=0&key='+key+"",500,350);
}
/*
 * added by andy.ten@tom.com 2010-12
 */
function showUploadByWin(path,key)
{
	var url = path+'/commonUpload.jsp?flag=1&key='+key+"";
	window.showModalDialog(url,window,"dialogWidth=500px;dialogHeight=350px;status=0;help=0");
	//OpenHtmlWindow(path+'/commonUpload.jsp?flag=1&key='+key+"",500,350);
}
function doViewFileByWin(path,key)
{
	var url = path+'/commonViewFile.jsp?flag=0&key='+key+"";
	window.showModalDialog(url,window,"dialogWidth=800px;dialogHeight=500px;status=no;");
}

function showCompany(path){ //公用模块代理商选择页面
	OpenHtmlWindow(path+'/systemManager/OrgMng/queryCompany.do',800,450);
}

function showModel(path,funcname){ //公用模块车型选择页面
	OpenHtmlWindow(path+'/systemManager/ModelMng/queryPro.do?funcname='+funcname,800,450);
}

function showDealerTree(path){ //公用模块代理商选择页面
	OpenHtmlWindow(path+'/systemManager/OrgMng/queryDealerTree.do',700,450);
}



function showCarRefitItem(path){ //整备信息详细明细查询方法
	OpenHtmlWindow(path,500,300);
}

function showBrandSeries(path){ //公用模块厂家车系选择页面
	OpenHtmlWindow(path+'/dialog/DiaSeries.jsp',700,450);
}
function showBrandSeriesByDlr(path){ //公用模块厂家车系选择页面(根据DealerId和品牌的关系进行过滤)
	OpenHtmlWindow(path+'/dialog/DiaSeriesByDlr.jsp',700,450);
}
//车牌选择公共模块
function queryCarLicense(path,carlicense){
	OpenHtmlWindow(path+"/util/CommonUtil/allLisenceQuery.do?COMMAND=1&fun="+carlicense,800,600);
}
//车辆发布列表缩略图查看模块
function queryCarPic(path,vhclId){
	OpenHtmlWindow(path+"/carsell/carIssuance/CarIssuanceAction/showPic.do?COMMAND=1&vhclId="+vhclId,800,600);
}
//销售车辆公共选择接口
function selectVhcl(path,vhclId){
	if(vhclId!=undefined){
		OpenHtmlWindow(path+"/carsell/sellOrder/NewSaleOrder/querySellVhcl.do?COMMAND=1&vhclId="+vhclId,800,600);
	}else{
		OpenHtmlWindow(path+"/carsell/sellOrder/NewSaleOrder/querySellVhcl.do?COMMAND=1",800,600);
	}
}
// 车辆发布显示图片公共方法
function showpic(value){
	   queryCarPic('<%=path %>',value);
	}
//年、月、日下拉框联动    lax --add-- 2009-09-04
function initDate(year,month,day)   
{   
 //每个月的初始天数   
    MonDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];   
    //当前的年份   
    var y = new Date().getFullYear();   
    //当前的月份   
    var m = new Date().getMonth()+1; //javascript月份为0-11   
    //当前的天   
    var d = new Date().getDate();   
 //以今年为准，向后2年，填充年份下拉框   
    for (var i = y; i < (y+1); i++){   
    		year.options.add(new Option(i+"年",i));   
	}   
 //选中今年   
 // year.value=y;   
    //填充月份下拉框   
    for (var i = 1; i <= 12; i++){  
    	if(i < 10){
    		month.options.add(new Option("0"+i+"月","0"+i));
    	}else{
    		month.options.add(new Option(i+"月",i));
    	}
	}   
 //选中当月   
 //month.value = m;   
 //获得当月的初始化天数   
 var n = MonDays[m-1];   
 //如果为2月，天数加1   
 if (m == 2 && isLeapYear(year.options[year.selectedIndex].value))   
    n++;   
 //填充日期下拉框   
 // createDay(n,day);    
 //选中当日   
 // day.value = new Date().getDate();   
}
function change(year,month,day) //年月变化，改变日   
{   
     var y = year.options[year.selectedIndex].value;   
     var m = month.options[month.selectedIndex].value;    
     var n = MonDays[m - 1];   
     if ( m ==2){
       		n++;
       }
     //createDay(n,day)
}   
function change1(year,month,day) //年月变化，改变日   
{
     var y = year.options[year.selectedIndex].value;   
     var m = month.options[month.selectedIndex].value;
     var n = MonDays[m - 1];   
     if ( m ==2 && isLeapYear(y)){   
         n++;   
     }   
     createDay(n,day);   
}
/**
 * added by andy.ten@tom.com
 */
function titleShow(tabObjId)
{
	if(!tabObjId) return false;
	if(document.getElementById(tabObjId).style.display == "none")
		document.getElementById(tabObjId).style.display = "";
	else
		document.getElementById(tabObjId).style.display = "none";
	
}
function createDay(n,day) //填充日期下拉框 
{
    //清空下拉框
     clearOptions(day);
     //几天，就写入几项   
 day.options.add(new Option("-请选择-",""));
     for(var i=1; i<=n; i++){
    	 if(i < 10){
    		 day.options.add(new Option("0"+i,"0"+i)); 
    	 }else{
    		 day.options.add(new Option(i,i));  
    	 }  
     }   
}
function clearOptions(ctl)//删除下拉框中的所有选项 
{   
   for(var i=ctl.options.length-1; i>=0; i--){   
        	ctl.remove(i);
         }
}
function isLeapYear(year)//判断是否闰年
{
    return( year%4==0 || (year%100 ==0 && year%400 == 0));
}
//获得颜色代码
function getColorCode(color){
	var groupcolor = "";
	if(color=='20011001'){
		groupcolor='red';
	}
	else if(color=='20011002'){
		groupcolor='#FF9900';
	}
	else if(color=='20011003'){
		groupcolor='#FFFF00';
	}
	else if(color=='20011004'){
		groupcolor='#00FF00';
	}
	else if(color=='20011005'){
		groupcolor='#66CCCC';
	}
	else if(color=='20011006'){
		groupcolor='#0000FF';
	}
	else if(color=='20011007'){
		groupcolor='#990099';
	}
	else if(color=='20011008'){
		groupcolor='#FFFFFF';
	}
	return groupcolor;
}
//获得背景颜色代码
function getColorStyleCode(color){
	var groupcolor;
	var colorCode = getColorCode(color);
	groupcolor = 'background:'+colorCode+';';
	return groupcolor;
}
//获得字体颜色代码
function getFontColorStyleCode(color,con){
	var groupcolor;
	var colorCode = getColorCode(color);
	groupcolor = '<font style="color:'+colorCode+'; "><strong>'+con+'</strong></font>';
	return groupcolor;
}
//--------联系人姓名不能重复---------//
function chklinkManNames(){
	var linkManNames = document.getElementsByName("linkMan_name");
	var NUM = linkManNames.length;
	/*冒泡法排序*/
	for(i=0; i<NUM-1; i++){ /*外循环：控制比较趟数*/
	 for(j=NUM-1; j>i; j--) /*内循环：进行每趟比较*/
		 if(linkManNames[j].value==linkManNames[j-1].value) /*如果data[j]大于data[j-1],交换两者的位置*/
		 {
				alert("联系人姓名不能重复!");
				return false;
		 }
	}
	return true;
}

//钱转换带千位符
function formatCurrency(num,metadata,record) {
	num = num.toString().replace(/\$|\,/g,'');
	if(isNaN(num))
		num = "0";
	sign = (num == (num = Math.abs(num)));
	num = Math.floor(num*100+0.50000000001);
	cents = num%100;
	num = Math.floor(num/100).toString();
	if(cents<10)
		cents = "0" + cents;
	for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
		num = num.substring(0,num.length-(4*i+3))+','+
	num.substring(num.length-(4*i+3));
	return (((sign)?'':'-') + '' + num + '.' + cents);
}

//除法
function accDiv(arg1,arg2){
	var t1=0,t2=0,r1,r2;
	try{t1=arg1.toString().split(".")[1].length}catch(e){}
	try{t2=arg2.toString().split(".")[1].length}catch(e){}
	with(Math){
	r1=Number(arg1.toString().replace(".",""));
	r2=Number(arg2.toString().replace(".",""));
	return (r1/r2)*pow(10,t2-t1);
	}
}
//乘法
function accMul(arg1,arg2)
{
	var m=0,s1=arg1.toString(),s2=arg2.toString(); 
	try{m+=s1.split(".")[1].length}catch(e){}
	try{m+=s2.split(".")[1].length}catch(e){}
	return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
}
//加法
function accAdd(arg1,arg2){ 
	var r1,r2,m; 
	try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0} 
	try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0} 
	m=Math.pow(10,Math.max(r1,r2));
	//return (arg1*m+arg2*m)/m;
	return (accMul(arg1,m)+accMul(arg2,m))/m;
} 
//减法 
function accSub(arg1,arg2){
	return accAdd(arg1,-arg2); 
}

/*  
将String类型解析为Date类型.  
parseDate('2006-1-1') return new Date(2006,0,1)  
parseDate(' 2006-1-1 ') return new Date(2006,0,1)  
parseDate('2006-1-1 15:14:16') return new Date(2006,0,1,15,14,16)  
parseDate(' 2006-1-1 15:14:16 ') return new Date(2006,0,1,15,14,16);  
parseDate('2006-1-1 15:14:16.254') return new Date(2006,0,1,15,14,16,254)  
parseDate(' 2006-1-1 15:14:16.254 ') return new Date(2006,0,1,15,14,16,254)  
parseDate('不正确的格式') retrun null  
*/  
function parseDateCJ(str1){   
if(typeof str1 == 'string'){   
   var str2=str1.substring(0,4);     
   var str3=str1.substring(4,str1.length).replace(new RegExp("-0","gm"),"-");     
   str=str2+str3;
 
  var results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) *$/);   
  if(results && results.length>3)   
    return new Date(parseInt(results[1]),parseInt(results[2]) -1,parseInt(results[3]));    
  results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2}) *$/);   
  if(results && results.length>6)   
    return new Date(parseInt(results[1]),parseInt(results[2]) -1,parseInt(results[3]),parseInt(results[4]),parseInt(results[5]),parseInt(results[6]));    
  results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2})\.(\d{1,9}) *$/);   
  if(results && results.length>7)   
    return new Date(parseInt(results[1]),parseInt(results[2]) -1,parseInt(results[3]),parseInt(results[4]),parseInt(results[5]),parseInt(results[6]),parseInt(results[7]));    
}   
return null;   
} 

//修改链接new Date(value)
//d.formatCJ('yyyy-MM-dd hh:mm:ss S');
Date.prototype.formatCJ = function(format) //author: meizz 
{ 
  var o = { 
    "M+" : this.getMonth()+1, //month 
    "d+" : this.getDate(),    //day 
    "h+" : this.getHours(),   //hour 
    "m+" : this.getMinutes(), //minute 
    "s+" : this.getSeconds(), //second 
    "q+" : Math.floor((this.getMonth()+3)/3),  //quarter 
    "S" : this.getMilliseconds() //millisecond 
  } 
  if(/(y+)/.test(format)) format=format.replace(RegExp.$1, 
    (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  for(var k in o)if(new RegExp("("+ k +")").test(format)) 
    format = format.replace(RegExp.$1, 
      RegExp.$1.length==1 ? o[k] : 
        ("00"+ o[k]).substr((""+ o[k]).length)); 
  return format; 
} 



function dateFormatCJ(value,meta,record){
	var d=parseDateCJ(value);
	if(d){
 		return d.formatCJ('yyyy-MM-dd');
	}else{
		return 	value;
	}
}

function check_fileType_CJ(upFileName,typeArr)
{
  		if (upFileName != "") {
			var type_count = 0;
			var pos = upFileName.lastIndexOf(".");			
			var lastname = upFileName.substring(pos, upFileName.length);
			//alert("lastname:" + lastname);
			for ( var i = 0; i < typeArr.length; i++) {
				if (lastname.toLowerCase() == typeArr[i]) {
					type_count++;
				}
			}
			return type_count==0;
		} else {
			return false;
		}
}

/**
 * 通用车型筛选框 车型按六级下拉菜单联动筛选。品牌->车系->车款->年款->颜色->内饰
 */
function showLargeRegionResult(json){
	var obj=document.getElementById("RESOURCE_LARGE_SCOPE");
	obj.options.length=0;
	var optionAll = document.createElement("option");
	optionAll.innerHTML="--请选择--";
	optionAll.value="";
	obj.appendChild(optionAll);
	var list = json.largeAreaList;
	for(var i=0; i < list.size(); i++){
		var option = document.createElement("option");
		option.innerHTML = list[i].ORG_NAME;
		option.value = list[i].ORG_ID;
		obj.appendChild(option);
	}
}
function initVehicleBrand(){
	var url = g_webAppName + "/materialGroup/MaterialGroupSelect/queryVehicleBrand.json";
	makeCall(url,showBrandResult,{});
}

function showBrandResult(json){
	var obj = document.getElementById("brandId");
	obj.options.length=0;
	var optionAll = document.createElement("option");
	optionAll.innerHTML="--请选择--";
	optionAll.value="";
	obj.appendChild(optionAll);
	var list = json.brandList;
	for(var i=0; i < list.size(); i++){
		var option = document.createElement("option");
		option.innerHTML = list[i].GROUP_NAME;
		option.value = list[i].GROUP_CODE;
		obj.appendChild(option);
	}
}

function selectVehicleSeries(){
	var brandId = $("brandId").value;
	var url = g_webAppName + "/materialGroup/MaterialGroupSelect/queryVehicleSeries.json";
	if(brandId != ''){
		makeCall(url,showSeriesResult,{brandId:brandId});
	}else{
		resetCondition('seriesId');
		resetCondition('styleName');
		resetCondition('modelYear');
		resetCondition('colorName');
		resetCondition('trimName');
		resetCondition('factoryOption');
	}
}

function showSeriesResult(json){
	var obj = document.getElementById("seriesId");
	obj.options.length=0;
	var optionAll = document.createElement("option");
	optionAll.innerHTML="--请选择--";
	optionAll.value="";
	obj.appendChild(optionAll);
	var list = json.seriesList;
	for(var i=0; i < list.size(); i++){
		var option = document.createElement("option");
		option.innerHTML = list[i].GROUP_NAME;
		option.value = list[i].GROUP_CODE;
		obj.appendChild(option);
	}
	
	//if(obj.options.length == 1){
	//	selectVehicleStyle();
	//}
}

function selectVehicleStyle(){
	var seriesId = $("seriesId").value;
	var url = g_webAppName + "/materialGroup/MaterialGroupSelect/queryVehicleStyle.json";
	if(seriesId != ''){
		makeCall(url,showVehicleStyleResult,{seriesId:seriesId});
	}else{
		resetCondition('styleName');
		resetCondition('modelYear');
		resetCondition('colorName');
		resetCondition('trimName');
		resetCondition('factoryOption');
	}
}

function showVehicleStyleResult(json){
	var obj = document.getElementById("styleName");
	obj.options.length=0;
	var optionAll = document.createElement("option");
	optionAll.innerHTML="--请选择--";
	optionAll.value="";
	obj.appendChild(optionAll);
	var list = json.styleList;
	for(var i=0; i < list.size(); i++){
		var option = document.createElement("option");
		option.innerHTML = list[i].GROUP_NAME;
		option.value = list[i].GROUP_NAME;
		obj.appendChild(option);
	}
	
	//if(obj.options.length == 1){
	//	selectVehicleModelYear();
	//}
}

function selectVehicleModelYear(){
	var styleName = $("styleName").value;
	var seriesId = $("seriesId").value;
	var url = g_webAppName + "/materialGroup/MaterialGroupSelect/queryModelYear.json";
	if(styleName != ''){
		makeCall(url,showVehicleModelYearResult,{styleName:styleName,seriesId:seriesId});
	}else{
		resetCondition('modelYear');
		resetCondition('colorName');
		resetCondition('trimName');
		resetCondition('factoryOption');
	}
}

function showVehicleModelYearResult(json){
	var obj = document.getElementById("modelYear");
	obj.options.length=0;
	var optionAll = document.createElement("option");
	optionAll.innerHTML="--请选择--";
	optionAll.value="";
	obj.appendChild(optionAll);
	var list = json.modelYearList;
	for(var i=0; i < list.size(); i++){
		var option = document.createElement("option");
		option.innerHTML = list[i].MODEL_YEAR;
		option.value = list[i].MODEL_YEAR;
		obj.appendChild(option);
	}
	
	//if(obj.options.length == 1){
	//	selectVehicleColorName();
	//}
}

function selectVehicleColorName(){
	var seriesId = $("seriesId").value;
	var styleName = $("styleName").value;
	var modelYear = $("modelYear").value;
	var url = g_webAppName + "/materialGroup/MaterialGroupSelect/queryVehicleColorName.json";
	if(modelYear != ''){
		makeCall(url,showVehicleColorNameResult,{styleName:styleName,seriesId:seriesId,modelYear:modelYear});
	}else{
		resetCondition('colorName');
		resetCondition('trimName');
		resetCondition('factoryOption');
	}
}

function showVehicleColorNameResult(json){
	var obj = document.getElementById("colorName");
	obj.options.length=0;
	var optionAll = document.createElement("option");
	optionAll.innerHTML="--请选择--";
	optionAll.value="";
	obj.appendChild(optionAll);
	var list = json.colorNameList;
	for(var i=0; i < list.size(); i++){
		var option = document.createElement("option");
		option.innerHTML = list[i].COLOR_NAME;
		option.value = list[i].COLOR_NAME;
		obj.appendChild(option);
	}
	//if(obj.options.length == 1){
	//	selectVehicleTrimName();
	//}
}

function selectVehicleTrimName(){
	var seriesId = $("seriesId").value;
	var styleName = $("styleName").value;
	var modelYear = $("modelYear").value;
	var colorName = $("colorName").value;
	var url = g_webAppName + "/materialGroup/MaterialGroupSelect/queryVehicleTrimName.json";
	if(colorName != ''){
		makeCall(url,showVehicleTrimNameResult,{styleName:styleName,seriesId:seriesId,modelYear:modelYear,colorName:colorName});
	}else{
		resetCondition('trimName');
		resetCondition('factoryOption');
	}
}

function showVehicleTrimNameResult(json){
	var obj = document.getElementById("trimName");
	obj.options.length=0;
	var optionAll = document.createElement("option");
	optionAll.innerHTML="--请选择--";
	optionAll.value="";
	obj.appendChild(optionAll);
	var list = json.trimNameList;
	for(var i=0; i < list.size(); i++){
		var option = document.createElement("option");
		option.innerHTML = list[i].TRIM_NAME;
		option.value = list[i].TRIM_NAME;
		obj.appendChild(option);
	}
}

function resetCondition(selectId){
	var obj = document.getElementById(selectId);
	obj.options.length=0;
	var optionAll = document.createElement("option");
	optionAll.innerHTML="--请选择--";
	optionAll.value="";
	obj.appendChild(optionAll);
}
/**
 * 工厂选装信息
 */
function selectFactoryOption(){}
//通用车型筛选框调
