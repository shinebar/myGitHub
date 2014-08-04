/*依赖 prototype.js, InfoAjax.js, dictDataList.js, 页面需要优先导入*/

var imgList = {img:[{CODE_ID:'Y',TYPE:'1004',TYPE_NAME:'YN',CODE_DESC:'<img class="nav" src="../../../img/nick.gif" />'}]};
var REGION_PROVINCE_TYPE = "10091002"; //省份type
var _imgData_ = imgList.img;
var YN_STATE = "10041001";
	codeData = codeData.data;
	//alert(codeData);
if(typeof(regionData) != "undefined") regionData = regionData.data;

function getCodeList(type){ //根据type返回一个List
	var arr = new Array();
	for(var i=0;i<codeData.length;i++){
		if(codeData[i].type == type){
			arr.push({codeId:codeData[i].codeId,codeDesc:codeData[i].codeDesc});
		}
	}
	return arr;
}

function getRegionName(regionCode){ //拿到地区名字
	var itemValue = null;
	for(var i=0;i<regionData.length;i++){
		if(regionData[i].regionCode == regionCode){
			itemValue= regionData[i].regionName;
		}
	}
	return itemValue==null?"":itemValue;
}

function writeRegionName(regionCode){ //拿到地区名字,打印到页面上
	document.write(getRegionName(regionCode));
}

function getItemValue(codeId){ // 根据codeId拿到某个属性的codeDesc，用在ext
	var itemValue = null;
	for(var i=0;i<codeData.length;i++){
		if(codeData[i].codeId == codeId){
			itemValue = codeData[i].codeDesc;
		}
	}
	return itemValue==null?"":itemValue;
}

function writeItemValue(codeId){ // 根据codeId拿到某个属性的codeDesc，打印到页面上
	document.write(getItemValue(codeId));
}


//根据codeId回显某个属性的codeDesc,打印到页面上行 create by lishuai@yahoo.cn
function writeItemValues(codeId){
	var itemValue = null;
	if(codeId)
	{
		arr = codeId.split(",");
		for(var i=0;i<arr.length;i++)
		{
			if(itemValue)
			{
				itemValue += "," + getItemValue(arr[i]);
			}
			else
			{
				itemValue = getItemValue(arr[i]);
			}	
		}
	}
	document.write(itemValue==null?"":itemValue);
}



function printItemValue(codeId){ // 打印在页面
	for(var i=0;i<codeData.length;i++){
		if(codeData[i].codeId == codeId){
			document.write(codeData[i].codeDesc);
			return true;
		}
	}
}

function getItemPic(codeId){
	if(codeId == YN_STATE)
	{
		codeId = "Y";
		for(var i=0;i<_imgData_.length;i++){
			if(_imgData_[i].CODE_ID == codeId){
				return _imgData_[i].CODE_DESC;
			}
		}			
	}
	else
	{
		return '';
	}
}

function writeItemPic(codeId){
	if(codeId == YN_STATE)
	{
		codeId = "Y";
		for(var i=0;i<_imgData_.length;i++){
			if(_imgData_[i].CODE_ID == codeId){
				document.write(_imgData_[i].CODE_DESC);
			}
		}			
	}
}

function getItemBlank(codeId){ // 根据codeId拿到某个属性的codeDesc，并写在输入框中
	var output = '<input type="text" id="" value="'+codeId+'" size ="12" maxlength="12">';
	return output;
}
function genSelBox(id,type,selectedKey,setAll,_class_,_script_,nullFlag,datasource){ //根据type生成下拉框
	var str = "";
	str += "<select id='" + id + "' name='" + id +"' class='"+ _class_ +"' " + _script_ ;
	if(nullFlag!=undefined&&nullFlag==true){
		str += " datatype='0,is_null,200' ";
	}
	//added by andy.ten@tom.com 2010-12-6
	if(datasource)
		str += "datasource="+datasource;
	else
		str += "datasource="+id;
	str += " > ";
	if(setAll){
		str += genDefaultOpt();
	}
	for(var i=0;i<codeData.length;i++){
		if(codeData[i].type == type){
			str += "<option " + (codeData[i].codeId == selectedKey ? "selected" : "") + " value='" + codeData[i].codeId + "' title = '"+codeData[i].codeDesc+"' >" + codeData[i].codeDesc + "</option>";
		}
	}
	str += "</select>";
	document.write(str);
}
//根据FIXCODE形成下拉框，除了expStr字符串中包含的状态，expStr可为多个中间用逗号隔开
function genSelBoxExp(id,type,selectedKey,setAll,_class_,_script_,nullFlag,expStr,datasource){
	var str = "";
	var arr;
	if(expStr.indexOf(",")>0)
		arr = expStr.split(",");
	else {
		expStr = expStr+",";
		arr = expStr.split(",");
	}
	str += "<select id='" + id + "' name='" + id +"' class='"+ _class_ +"' " + _script_ ;
	// modified by lishuai@infoservice.com.cn 2010-05-18 解决select下拉框中增加属性datatype判断bug begin
	if(nullFlag && nullFlag == "true"){
		str += " datatype='0,0,0' ";
	}
	//added by andy.ten@tom.com 2010-12-6
	if(datasource)
		str += " datasource="+datasource;
	else
		str += " datasource="+id;
	// end
	str += " onChange=doCusChange(this.value,this);> ";
	if(setAll){
		str += genDefaultOpt();
	}
	for(var i=0;i<codeData.length;i++){
		var flag = true;
		for(var j=0;j<arr.length;j++){
			if(codeData[i].codeId == arr[j]){
				flag = false;
			}
		}
		if(codeData[i].type == type && flag){
			str += "<option " + (codeData[i].codeId == selectedKey ? "selected" : "") + " value='" + codeData[i].codeId + "' title = '"+codeData[i].codeDesc+"' >" + codeData[i].codeDesc + "</option>";
		}
	}
	str += "</select>";
	document.write(str);
}
//add a "全部" option by luoyonggang 2013/06/04
function genSelBoxExpAll(id,type,selectedKey,setAll,_class_,_script_,nullFlag,expStr,datasource){
	var str = "";
	var arr;
	if(expStr.indexOf(",")>0)
		arr = expStr.split(",");
	else {
		expStr = expStr+",";
		arr = expStr.split(",");
	}
	str += "<select id='" + id + "' name='" + id +"' class='"+ _class_ +"' " + _script_ ;
	// modified by lishuai@infoservice.com.cn 2010-05-18 解决select下拉框中增加属性datatype判断bug begin
	if(nullFlag && nullFlag == "true"){
		str += " datatype='0,0,0' ";
	}
	//added by andy.ten@tom.com 2010-12-6
	if(datasource)
		str += " datasource="+datasource;
	else
		str += " datasource="+id;
	// end
	str += " onChange=doCusChange(this.value,this);> ";
	if(setAll){
		str += genDefaultOptAll();
	}
	for(var i=0;i<codeData.length;i++){
		var flag = true;
		for(var j=0;j<arr.length;j++){
			if(codeData[i].codeId == arr[j]){
				flag = false;
			}
		}
		if(codeData[i].type == type && flag){
			str += "<option " + (codeData[i].codeId == selectedKey ? "selected" : "") + " value='" + codeData[i].codeId + "' title = '"+codeData[i].codeDesc+"' >" + codeData[i].codeDesc + "</option>";
		}
	}
	str += "</select>";
	document.write(str);
}
//根据FIXCODE形成下拉框，除了expStr字符串中包含的状态，expStr可为多个中间用逗号隔开
function genBoxNoBingColumn(id,type,selectedKey,setAll,_class_,_script_,nullFlag,expStr,datasource){
	var str = "";
	var arr;
	if(expStr.indexOf(",")>0)
		arr = expStr.split(",");
	else {
		expStr = expStr+",";
		arr = expStr.split(",");
	}
	str += "<select id='" + id + "' name='" + id +"' class='"+ _class_ +"' " + _script_ ;
	// modified by lishuai@infoservice.com.cn 2010-05-18 解决select下拉框中增加属性datatype判断bug begin
	if(nullFlag && nullFlag == "true"){
		str += " datatype='0,0,0' ";
	}
	//added by andy.ten@tom.com 2010-12-6
	//if(datasource)
	//	str += "datasource="+datasource;
	//else
	//	str += "datasource="+id;
	// end
	str += " onChange=doCusChange(this.value,this);> ";
	if(setAll){
		str += genDefaultOpt();
	}
	for(var i=0;i<codeData.length;i++){
		var flag = true;
		for(var j=0;j<arr.length;j++){
			if(codeData[i].codeId == arr[j]){
				flag = false;
			}
		}
		if(codeData[i].type == type && flag){
			str += "<option " + (codeData[i].codeId == selectedKey ? "selected" : "") + " value='" + codeData[i].codeId + "' title = '"+codeData[i].codeDesc+"' >" + codeData[i].codeDesc + "</option>";
		}
	}
	str += "</select>";
	document.write(str);
}

//根据FIXCODE形成下拉框，除了expStr字符串中包含的状态，expStr可为多个中间用逗号隔开
function genSelBoxExpReturn(id,type,selectedKey,setAll,_class_,_script_,nullFlag,expStr,datasource){
	var str = "";
	var arr;
	if(expStr.indexOf(",")>0)
		arr = expStr.split(",");
	else {
		expStr = expStr+",";
		arr = expStr.split(",");
	}
	str += "<select id='" + id + "' name='" + id +"' class='"+ _class_ +"' " + _script_ ;
	// modified by lishuai@infoservice.com.cn 2010-05-18 解决select下拉框中增加属性datatype判断bug begin
	if(nullFlag && nullFlag == "true"){
		str += " datatype='0,0,0' ";
	}
	//added by andy.ten@tom.com 2010-12-6
	if(datasource)
		str += "datasource="+datasource;
	else
		str += "datasource="+id;
	// end
	str += " onChange=doCusChange(this.value,this);> ";
	if(setAll){
		str += genDefaultOpt();
	}
	for(var i=0;i<codeData.length;i++){
		var flag = true;
		for(var j=0;j<arr.length;j++){
			if(codeData[i].codeId == arr[j]){
				flag = false;
			}
		}
		if(codeData[i].type == type && flag){
			str += "<option " + (codeData[i].codeId == selectedKey ? "selected" : "") + " value='" + codeData[i].codeId + "' title = '"+codeData[i].codeDesc+"' >" + codeData[i].codeDesc + "</option>";
		}
	}
	str += "</select>";
	//document.write(str);
	return str;
	
}

/**
 * 根据TC_CODE中TYPE生成指定类型的下拉框，下拉框只包含指定CODE_ID的元素
 * 注意：默认加入 onChange=doCusChange();需要使用该方法时覆盖doCusChange方法
 * @see dict.js-genSelBoxExp 根据其修改
 * @param id 生成下拉框的ID
 * @param type TC_CODE中的类型
 * @param selectedKey 默认选中元素
 * @param setAll 是否显示 "请选择"
 * @param _class_ 要加入的样式
 * @param _script_ 要加入的响应脚本
 * @param nullFlag 是否必须 true :必须 其他：非必须
 * @param containStr 下拉列表中包含元素ID集合 形式如：id1+","+id2+...
 * @return
 */

function genSelBoxContainStr(id,type,selectedKey,setAll,_class_,_script_,nullFlag,containStr){
	var str = "";
	var arr;
	if(containStr.indexOf(",")>0)
		arr = containStr.split(",");
	else {
		containStr = containStr+",";
		arr = containStr.split(",");
	}
	str += "<select id='" + id + "' name='" + id +"' class='"+ _class_ +"' " + _script_ ;
	if(nullFlag && nullFlag == "true"){
		str += " datatype='0,0,0' ";
	}
	// end
	str += " onChange=doCusChange(this.value);> ";
	if(setAll){
		str += genDefaultOpt();
	}
	for(var i=0;i<codeData.length;i++){
		var flag = false;
		for(var j=0;j<arr.length;j++){
			if(codeData[i].codeId == arr[j]){
				flag = true;
			}
		}
		if(codeData[i].type == type && flag){
			str += "<option " + (codeData[i].codeId == selectedKey ? "selected" : "") + " value='" + codeData[i].codeId + "' title = '"+codeData[i].codeDesc+"' >" + codeData[i].codeDesc + "</option>";
		}
	}
	str += "</select>";
	document.write(str);
}

//同一页面有两个下拉框。区别onChange事件。
function genSelBoxExp2(id,type,selectedKey,setAll,_class_,_script_,nullFlag,expStr){
	var str = "";
	var arr;
	if(expStr.indexOf(",")>0)
		arr = expStr.split(",");
	else {
		expStr = expStr+",";
		arr = expStr.split(",");
	}
	str += "<select id='" + id + "' name='" + id +"' class='"+ _class_ +"' " + _script_ ;
	// modified by lishuai@infoservice.com.cn 2010-05-18 解决select下拉框中增加属性datatype判断bug begin
	if(nullFlag && nullFlag == "true"){
		str += " datatype='0,0,0' ";
	}
	// end
	str += " onChange=doMySel(this.value);> ";
	if(setAll){
		str += genDefaultOpt();
	}
	for(var i=0;i<codeData.length;i++){
		var flag = true;
		for(var j=0;j<arr.length;j++){
			if(codeData[i].codeId == arr[j]){
				flag = false;
			}
		}
		if(codeData[i].type == type && flag){
			str += "<option " + (codeData[i].codeId == selectedKey ? "selected" : "") + " value='" + codeData[i].codeId + "' title = '"+codeData[i].codeDesc+"' >" + codeData[i].codeDesc + "</option>";
		}
	}
	str += "</select>";
	document.write(str);
}
function genSelBoxStrExp(id,type,selectedKey,setAll,_class_,_script_,nullFlag,expStr){
	var str = "";
	var arr;
	if(expStr.indexOf(",")>0)
		arr = expStr.split(",");
	else {
		expStr = expStr+",";
		arr = expStr.split(",");
	}
	str += "<select id='" + id + "' name='" + id +"' class='"+ _class_ +"' " + _script_ ;
	if(nullFlag!=undefined&&nullFlag==true){
		str += " datatype='0,is_null,200' ";
	}
	str += " > ";
	if(setAll){
		str += genDefaultOpt();
	}
	for(var i=0;i<codeData.length;i++){
		var flag = true;
		for(var j=0;j<arr.length;j++){
			if(codeData[i].codeId == arr[j]){
				flag = false;
			}
		}
		if(codeData[i].type == type && flag){
			str += "<option " + (codeData[i].codeId == selectedKey ? "selected" : "") + " value='" + codeData[i].codeId + "' title = '"+codeData[i].codeDesc+"' >" + codeData[i].codeDesc + "</option>";
		}
	}
	str += "</select>";
	return str;
}
function genHiddenSelBox(id,type,selectedKey,setAll,_class_,_script_,nullFlag,_style){ //根据type生成下拉框
	var str = "";
	str += "<select id='" + id + "' name='" + id +"' class='"+ _class_ +"' " + _script_ +" "+ _style;
	if(nullFlag!=undefined&&nullFlag==true){
		str += " datatype='0,is_null,200' ";
	}
	str += " > ";
	if(setAll){
		str += genDefaultOpt();
	}
	for(var i=0;i<codeData.length;i++){
		if(codeData[i].type == type){
			str += "<option " + (codeData[i].codeId == selectedKey ? "selected" : "") + " value='" + codeData[i].codeId + "' title = '"+codeData[i].codeDesc+"' >" + codeData[i].codeDesc + "</option>";
		}
	}
	str += "</select>";
	document.write(str);
}

function genAvaiLevel(id,type,selectedKey,setAll,_class_,_script_,unAvai1,unAvai2,nullFlag){ //根据type生成下拉框
	var str = "";
	str += "<select id='" + id + "' name='" + id +"' class='"+ _class_ +"' " + _script_ ;
	if(nullFlag!=undefined&&nullFlag==true){
		str += " datatype='0,is_null,200' ";
	}
	str += " > ";
	if(setAll){
		str += genDefaultOpt();
	}
	for(var i=0;i<codeData.length;i++){
		if(codeData[i].type == type){
			if(codeData[i].codeId != unAvai1 && codeData[i].codeId != unAvai2){
				str += "<option " + (codeData[i].codeId == selectedKey ? "selected" : "") + " value='" + codeData[i].codeId + "' title = '"+codeData[i].codeDesc+"' >" + codeData[i].codeDesc + "</option>";	
			}
		}
	}
	str += "</select>";
	document.write(str);
}

function genSelBoxDiffIdName(id,name,type,selectedKey,setAll,_class_,_script_,nullFlag){ //根据type生成下拉框
	var str = "";
	str += "<select id='" + id + "' name='" + name +"' class='"+ _class_ +"' " + _script_ ;
	if(nullFlag!=undefined&&nullFlag==true){
		str += " datatype='0,is_null,200' ";
	}
	str += " > ";
	if(setAll){
		str += genDefaultOpt();
	}
	for(var i=0;i<codeData.length;i++){
		if(codeData[i].type == type){
			str += "<option " + (codeData[i].codeId == selectedKey ? "selected" : "") + " value='" + codeData[i].codeId + "' title = '"+codeData[i].codeDesc+"' >" + codeData[i].codeDesc + "</option>";
		}
	}
	str += "</select>";
	document.write(str);
}

function genSelBox2(id,type,selectedKey,setAll,_class_,_script_,nullFlag){ //根据type生成下拉框
	var str = "";
	str += "<select id='" + id + "' name='" + id +"' class='"+ _class_ +"' " + _script_ ;
	if(nullFlag!=undefined&&nullFlag==true){
		str += " datatype='0,is_null,200' ";
	}
	str += " > ";
	if(setAll){
		str += genDefaultOpt();
	}
	for(var i=0;i<codeData.length;i++){
		if(codeData[i].type == type){
			str += "<option " + (codeData[i].codeId == selectedKey ? "selected" : "") + " value='" + codeData[i].codeId + "' title = '"+codeData[i].codeDesc+"' >" + codeData[i].codeDesc + "</option>";
		}
	}
	str += "</select>";
	return str;
}
function genSelBoxExcept(id,type,exceptType,selectedKey,setAll,_class_,_script_,nullFlag){ //根据type生成下拉框
	var except = String(exceptType);
	var str = "";
	str += "<select id='" + id + "' name='" + id +"' class='"+ _class_ +"' " + _script_ ;
	if(nullFlag!=undefined&&nullFlag==true){
		str += " datatype='0,is_null,200' ";
	}
	str += " > ";
	if(setAll){
		str += genDefaultOpt();
	}
	for(var i=0;i<codeData.length;i++){
		if(codeData[i].type == type){
			if(except.indexOf(codeData[i].codeId) < 0)
			{
				str += "<option " + (codeData[i].codeId == selectedKey ? "selected" : "") + " value='" + codeData[i].codeId + "' title = '"+codeData[i].codeDesc+"' >" + codeData[i].codeDesc + "</option>";
			}
		}
	}
	str += "</select>";
	document.write(str);
}
/*
*	<body genLocSel('txt1','txt2','txt3','130000','1301','1301')">
		省<select class="min_sel" id="txt1" onchange="_genCity(this,'txt2')"></select>
		市<select class="min_sel" id="txt2" onchange="_genCity(this,'txt3')"></select>
		县<select class="min_sel" id="txt3"></select>
 */

function genLocSel(proId,cityId,areaId){ //生成省份，城市，县
	//生成省份
	_genPro(proId, arguments[3]);
	//生成城市
	_genCity($(proId), cityId, arguments[4]);
	//生成县
	if(areaId != '')_genCity($(cityId), areaId, arguments[5]);
}

function _genPro(proId){ //生成省份
	addDefaultOpt(proId);
	var opt;
	for(var i=0;i<regionData.length;i++){
		if(regionData[i].regionType == REGION_PROVINCE_TYPE){
			opt = addOption($(proId), regionData[i].regionName, regionData[i].regionCode);
			if(arguments[1] && arguments[1] == regionData[i].regionCode) opt.selected = "selected";
		}
	}
}

function _genCity(obj,cityId){ //生成城市(县)
	addDefaultOpt(cityId);
	var opt;
	for(var i=0;i<regionData.length;i++){
		if(regionData[i].parId == obj.value){
			opt = addOption($(cityId), regionData[i].regionName, regionData[i].regionCode);
			if(arguments[2] && arguments[2] == opt.value) opt.selected = "selected";
		}
	}
}
function getRegionItem(regionCode){ //得到某个省市县
	for(var i=0;i<regionData.length;i++){
		if(regionData[i].regionCode == regionCode){
			return regionData[i].regionName;
		}
	}
}
function addDefaultOpt(locId){ //添加默认的"-请选择-"选项
	$(locId).options.length = 0;
	addOption($(locId), "-请选择-", "");
}

function genDefaultOpt(){
	return "<option selected value=''>-请选择-</option>";
}
function genDefaultOptAll(){
	return "<option selected value=''>全部</option>";
}
function genYearSelBox(id, totalYear,selectYear){ //动态获取当前年及前totalYear年
	var today = new Date();
	var curYear = today.getYear();
	var str = "";
	str += "<select id='" + id + "' name='" + id +"'>";
	for(var i=0;i<totalYear;i++){
		var year = today.getYear()-totalYear+i+1;
		if(selectYear!=undefined&&selectYear!=""&&selectYear!="null"){
			str += "<option " + (selectYear==year ? "selected" : "") + " value='" + year + "' title = '"+year+"' >" + year + "</option>";
		}else{
			str += "<option " + (year == curYear ? "selected" : "") + " value='" + year + "' title = '"+year+"' >" + year + "</option>";
		}
	}
	str += "</select>";
	document.write(str);
}
//select 的onChange方法,调用时可以覆盖该方法
function doCusChange(value)
{
	
}