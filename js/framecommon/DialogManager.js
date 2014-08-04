/**
 * <p>Title: InfoFrame3.0.Cc.V01</p>
 *
 * <p>Description: </p>
 *
 * <p>Copyright: Copyright (c) 2010</p>
 *
 * <p>Company: www.infoservice.com.cn</p>
 * <p>Date: 2010-5-28</p>
 *
 * @author andy 
 * @mail   andy.ten@tom.com
 * @version 1.0
 * @remark 通用弹出窗口管理
 */


/**
 * 通用选择经销商界面
 * inputCode : 回填页面经销商Code域id
 * inputId   : 回填页面经销商Id域id 
 * orgId     : 组织id，如有，则表示根据orgId过滤下级所有经销商，否则不过滤
 */
function showOrgDealer(inputCode ,inputId ,isMulti ,orgId, isAllLevel, isAllArea)
{
	if(!inputCode){ inputCode = null;}
	if(!inputId){ inputId = null;}
	if(!isMulti){ isMulti = null;}
	if(!orgId || orgId == 'false' || orgId == 'true'){ orgId = null;}
	if(!isAllLevel){ isAllLevel = null;}
	if(!isAllArea){ isAllArea = null;}
	OpenHtmlWindow(g_webAppName+'/dialog/showOrgDealer.jsp?INPUTCODE='+inputCode+"&INPUTID="+inputId+"&ISMULTI="+isMulti+"&ORGID="+orgId+"&ISALLLEVEL="+isAllLevel+"&ISALLAREA="+isAllArea,730,470);
}
/**
 * 售后经销商选择框，跟登录角色无关
 * @param inputCode
 * @param inputId
 * @param isMulti
 * @param orgId
 * @param isAllLevel
 * @param isAllArea
 */
function showOrgDealerZ(inputCode ,inputId ,isMulti ,orgId, isAllLevel, isAllArea,orgType)
{
	if(!inputCode){ inputCode = null;}
	if(!inputId){ inputId = null;}
	if(!isMulti){ isMulti = null;}
	if(!orgId || orgId == 'false' || orgId == 'true'){ orgId = null;}
	if(!isAllLevel){ isAllLevel = null;}
	if(!isAllArea){ isAllArea = null;}
	if(!orgType){ orgType = null;}
	OpenHtmlWindow(g_webAppName+'/dialog/showOrgDealerZ.jsp?INPUTCODE='+inputCode+"&INPUTID="+inputId+"&ISMULTI="+isMulti+"&ORGID="+orgId+"&ISALLLEVEL="+isAllLevel+"&ISALLAREA="+isAllArea+"&orgType="+orgType,730,470);
}
function showNewOrgDealer(inputCode ,inputId ,isMulti ,orgId,inputName)
{
	if(!inputCode){ inputCode = null;}
	if(!inputName){ inputName = null;}
	if(!inputId){ inputId = null;}
	if(!isMulti){ isMulti = null;}
	if(!orgId || orgId == 'false' || orgId == 'true'){ orgId = null;}
	OpenHtmlWindow(g_webAppName+'/dialog/showNewOrgDealer.jsp?INPUTCODE='+inputCode+"&INPUTID="+inputId+"&ISMULTI="+isMulti+"&ORGID="+orgId+"&INPUTNAME="+inputName,730,390);
}

/**
 * 通用选择物料组树界面
 * inputId   : 回填页面物料组code域id
 * inputName ：回填页面物料组name域id
 * isMulti   : true值多选，否则单选
 * groupLevel：输出的物料组等级
 * isAllArea：true值查全部，否则过滤业务范围
 */
function showMaterialGroup(inputCode ,inputName ,isMulti ,groupLevel, isAllArea)
{
	if(!inputCode){ inputCode = null;}
	if(!inputName){ inputName = null;}
	if(!groupLevel){ groupLevel = null;}
	OpenHtmlWindow(g_webAppName+"/dialog/showMaterialGroup.jsp?INPUTID="+inputCode+"&INPUTNAME="+inputName+"&ISMULTI="+isMulti+"&GROUPLEVEL="+groupLevel+"&ISALLAREA="+isAllArea,730,460);
}

/**
 * 通用选择物料组树界面
 * inputId   : 回填页面物料组code域id
 * inputName ：回填页面物料组name域id
 * isMulti   : true值多选，否则单选
 * groupLevel：输出的物料组等级
 * isAllArea：true值查全部，否则过滤业务范围
 */
function showMaterialGroupToModel(inputCode ,inputName ,isMulti ,groupLevel, isAllArea)
{
	if(!inputCode){ inputCode = null;}
	if(!inputName){ inputName = null;}
	if(!groupLevel){ groupLevel = null;}
	OpenHtmlWindow(g_webAppName+"/dialog/showMaterialGroupToModel.jsp?INPUTID="+inputCode+"&INPUTNAME="+inputName+"&ISMULTI="+isMulti+"&GROUPLEVEL="+groupLevel+"&ISALLAREA="+isAllArea,770,410);
}

/**
 * 通用选择物料组树界面(车型代码+车款名称+颜色+内饰)
 * inputId   : 回填页面物料组code域id
 * inputName ：回填页面物料组name域id
 * isMulti   : true值多选，否则单选
 * groupLevel：输出的物料组等级
 * isAllArea：true值查全部，否则过滤业务范围
 */
function showMaterialGroupToModelTwo(inputCode ,inputName ,isMulti ,groupLevel, isAllArea)
{
	if(!inputCode){ inputCode = null;}
	if(!inputName){ inputName = null;}
	if(!groupLevel){ groupLevel = null;}
	OpenHtmlWindow(g_webAppName+"/dialog/showMaterialGroupToModelTwo.jsp?INPUTID="+inputCode+"&INPUTNAME="+inputName+"&ISMULTI="+isMulti+"&GROUPLEVEL="+groupLevel+"&ISALLAREA="+isAllArea,850,410);
}
/**
 * 服务活动车型：选择物料组树界面
 * inputId   : 回填页面物料组code域id
 * inputName ：回填页面物料组name域id
 * isMulti   : true值多选，否则单选
 * groupLevel：输出的物料组等级
 */
function serviceShowMaterialGroup(inputCode ,inputName ,isMulti ,groupLevel)
{
	if(!inputCode){ inputCode = null;}
	if(!inputName){ inputName = null;}
	if(!groupLevel){ groupLevel = null;}
	OpenHtmlWindow(g_webAppName+"/dialog/serviceShowMaterialGroup.jsp?INPUTID="+inputCode+"&INPUTNAME="+inputName+"&ISMULTI="+isMulti+"&GROUPLEVEL="+groupLevel,770,410);
}

/**
 * 通用选择物料组树界面:过滤已有物料组
 * inputId   : 回填页面物料组code域id
 * inputName ：回填页面物料组name域id
 * isMulti   : true值多选，否则单选
 * groupLevel：输出的物料组等级
 */
function showMaterialGroup_Sel(inputCode ,inputName ,isMulti ,groupLevel)
{
	if(!inputCode){ inputCode = null;}
	if(!inputName){ inputName = null;}
	if(!groupLevel){ groupLevel = null;}
	OpenHtmlWindow(g_webAppName+"/dialog/showMaterialGroup_Sel.jsp?INPUTID="+inputCode+"&INPUTNAME="+inputName+"&ISMULTI="+isMulti+"&GROUPLEVEL="+groupLevel,770,410);
}
/**
 * 市场活动：物料组选择
 * */
function showMaterialGroup_market(inputCode ,inputName ,isMulti ,groupLevel)
{
	if(!inputCode){ inputCode = null;}
	if(!inputName){ inputName = null;}
	if(!groupLevel){ groupLevel = null;}
	OpenHtmlWindow(g_webAppName+"/dialog/showMaterialGroup_market.jsp?INPUTID="+inputCode+"&INPUTNAME="+inputName+"&ISMULTI="+isMulti+"&GROUPLEVEL="+groupLevel,770,410);
}

/**
 * 市场活动：选择车型
 * */
function showMaterialCarType_market(inputCode ,inputName ,isMulti ,groupLevel)
{
	if(!inputCode){ inputCode = null;}
	if(!inputName){ inputName = null;}
	if(!groupLevel){ groupLevel = null;}
	OpenHtmlWindow(g_webAppName+"/dialog/showCheXing.jsp?INPUTID="+inputCode+"&INPUTNAME="+inputName+"&ISMULTI="+isMulti+"&GROUPLEVEL="+groupLevel,770,410);
}
/**
 * 通用选择物料树界面
 * inputId   : 回填页面物料组code域id
 * inputName ：回填页面物料组name域id
 * isMulti   : true值多选，否则单选
 * isAllArea   : true值查全部，否则过滤业务范围
 */
function showMaterial(inputCode ,inputName ,isMulti ,isAllArea,showControl)
{
	if(!inputCode){ inputCode = null;}
	if(!inputName){ inputName = null;}
	OpenHtmlWindow(g_webAppName+"/dialog/showMaterial.jsp?INPUTID="+inputCode+"&INPUTNAME="+inputName+"&ISMULTI="+isMulti+"&ISALLAREA="+isAllArea+"&showControl="+showControl,900,500);
}
/**
 * 通用选择物料树界面
 * inputId   : 回填页面物料组code域id
 * inputName ：回填页面物料组name域id
 * isMulti   : true值多选，否则单选
 * areaId   : 业务范围id
 * ids   : 已选、需要过滤掉的物料id
 */
function showMaterialForOrderReport(inputCode ,inputName ,isMulti ,isAllArea)
{
	if(!inputCode){ inputCode = null;}
	if(!inputName){ inputName = null;}
	OpenHtmlWindow(g_webAppName+"/dialog/showMaterialForOrderReport.jsp?INPUTID="+inputCode+"&INPUTNAME="+inputName+"&ISMULTI="+isMulti+"&ISALLAREA="+isAllArea,770,410);
}

/**
 * 通用选择物料树界面
 * inputId   : 回填页面物料组code域id
 * inputName ：回填页面物料组name域id
 * isMulti   : true值多选，否则单选
 * areaId   : 业务范围id
 * ids   : 已选、需要过滤掉的物料id
 * orderType   : 订单类型
 */
function showMaterialByAreaId(inputCode ,inputName ,isMulti , areaId, ids){
	if(!inputCode){ inputCode = null;}
	if(!inputName){ inputName = null;}
	OpenHtmlWindow(g_webAppName+"/dialog/showMaterialByAreaId.jsp?INPUTID="+inputCode+"&INPUTNAME="+inputName+"&ISMULTI="+isMulti+"&areaId="+areaId+"&ids="+ids,800,500);
}
/**
 * 通用选择物料树界面--微车
 * inputId   : 回填页面物料组code域id
 * inputName ：回填页面物料组name域id
 * isMulti   : true值多选，否则单选
 * areaId   : 业务范围id
 * ids   : 已选、需要过滤掉的物料id
 */
function showMaterialByAreaIdAndOrderType(inputCode ,inputName ,isMulti , areaId, ids, orderType){
	if(!inputCode){ inputCode = null;}
	if(!inputName){ inputName = null;}
	OpenHtmlWindow(g_webAppName+"/dialog/showMaterialByAreaIdAndOrderType.jsp?INPUTID="+inputCode+"&INPUTNAME="+inputName+"&ISMULTI="+isMulti+"&areaId="+areaId+"&ids="+ids+"&orderType="+orderType,730,390);
}

/**
 * 通用选择供应商
 * inputId   : 回填页供应商code域id
 * inputName ：回填页供应商id域id
 * isMulti   : true值多选，否则单选
 */
function showMaterialByAreaId_Mini(inputCode ,inputName ,isMulti , areaId, ids){
	if(!inputCode){ inputCode = null;}
	if(!inputName){ inputName = null;}
	OpenHtmlWindow(g_webAppName+"/dialog/showMaterialByAreaId_Mini2.jsp?INPUTID="+inputCode+"&INPUTNAME="+inputName+"&ISMULTI="+isMulti+"&areaId="+areaId+"&ids="+ids,730,390);
}
/**
 * 通用选择配件大类
 * inputId   : 回填页供应商code域id
 * inputName ：回填页供应商id域id
 * isMulti   : true值多选，否则单选
 */
function showSuppliar(inputCode ,inputId ,isMulti ){
	if(!inputCode){ inputCode = null;}
	if(!inputId){ inputId = null;}
	OpenHtmlWindow(g_webAppName+"/dialog/showSupplier.jsp?INPUTCODE="+inputCode+"&INPUTID="+inputId+"&ISMULTI="+isMulti,730,390);
}

/**
 * 通用选择组织界面
 * inputCode : 回填页面经销商Code域id
 * inputId   : 回填页面经销商Id域id 
 * orgId     : 组织id，如有，则表示根据orgId过滤下级所有组织，否则不过滤
 */
function showPartSuppliar(inputCode ,inputId ,isMulti ){
	if(!inputCode){ inputCode = null;}
	if(!inputId){ inputId = null;}
	var url = g_webAppName+"/jsp/dms/part/basicData/supplierSelect.jsp";
	OpenHtmlWindow(url+"?INPUTCODE="+inputCode+"&INPUTID="+inputId+"&ISMULTI="+isMulti,730,450);
}

/**
 * 通用选择组织界面  杨震查询所有的  编码和 名称
 * inputCode : 回填页面经销商Code域id
 * inputId   : 回填页面经销商Id域id 
 * orgId     : 组织id，如有，则表示根据orgId过滤下级所有组织，否则不过滤
 */
function showPartType(inputCode ,inputId ,isMulti ){
	if(!inputCode){ inputCode = null;}
	if(!inputId){ inputId = null;}
	OpenHtmlWindow(g_webAppName+"/dialog/showPartType.jsp?INPUTCODE="+inputCode+"&INPUTID="+inputId+"&ISMULTI="+isMulti,730,390);
}

/**
 * 通用选择组织界面
 * inputCode : 回填页面经销商Code域id
 * inputId   : 回填页面经销商Id域id 
 * orgId     : 组织id，如有，则表示根据orgId过滤下级所有组织，否则不过滤
 */
function showOrg(inputCode ,inputId ,isMulti ,orgId)
{
	if(!inputCode){ inputCode = null;}
	if(!inputId){ inputId = null;}
	if(!isMulti){ isMulti = null;}
	if(!orgId || orgId == 'false' || orgId == 'true'){ orgId = null;}
	OpenHtmlWindow(g_webAppName+'/dialog/showOrg.jsp?INPUTCODE='+inputCode+"&INPUTID="+inputId+"&ISMULTI="+isMulti+"&ORGID="+orgId,730,390);
}
/**
 * 通用选择组织界面
 * inputCode : 回填页面经销商Code域id
 * inputId   : 回填页面经销商Id域id 
 * orgId     : 组织id，如有，则表示根据orgId过滤下级所有组织，否则不过滤
 */
function showOrgWin(inputCode ,inputId ,isMulti ,orgId,bussType)
{
	if(!inputCode){ inputCode = null;}
	if(!inputId){ inputId = null;}
	if(!isMulti){ isMulti = null;}
	if(!orgId || orgId == 'false' || orgId == 'true'){ orgId = null;}
	OpenHtmlWindow(g_webAppName+'/dialog/showOrgWin.jsp?INPUTCODE='+inputCode+"&INPUTID="+inputId+"&ISMULTI="+isMulti+"&ORGID="+orgId+"&bussType="+bussType,730,390);
}
/**
 * 通用选择经销商集团界面
 * inputCode : 回填页面经销商集团Code域id
 * inputId   : 回填页面经销商集团Id域id 
 */
function showDealerGroup(inputCode ,inputId ,isMulti)
{
	if(!inputCode){ inputCode = null;}
	if(!inputId){ inputId = null;}
	if(!isMulti){ isMulti = null;}
	OpenHtmlWindow(g_webAppName+'/dialog/showDealerGroup.jsp?INPUTCODE='+inputCode+"&INPUTID="+inputId+"&ISMULTI="+isMulti,730,390);
}
/**
 * 通用选择组织界面
 * inputCode : 回填页面经销商Code域id
 * inputId   : 回填页面经销商Id域id 
 * orgId     : 组织id，如有，则表示根据orgId过滤下级所有组织，否则不过滤
 */
function showAllOrgs(inputCode ,inputId ,isMulti ,orgId,areaId)
{
	if(!inputCode){ inputCode = null;}
	if(!inputId){ inputId = null;}
	if(!isMulti){ isMulti = null;}
	if(!orgId || orgId == 'false' || orgId == 'true'){ orgId = null;}
	OpenHtmlWindow(g_webAppName+'/dialog/showAllOrgs.jsp?INPUTCODE='+inputCode+"&INPUTID="+inputId+"&ISMULTI="+isMulti+"&ORGID="+orgId+"&INPUTAREAID="+areaId,730,390);
}

function showNewOrg(inputCode ,inputId ,isMulti ,orgId)
{
	if(!inputCode){ inputCode = null;}
	if(!inputId){ inputId = null;}
	if(!isMulti){ isMulti = null;}
	if(!orgId || orgId == 'false' || orgId == 'true'){ orgId = null;}
	OpenHtmlWindow(g_webAppName+'/dialog/showNewOrg.jsp?INPUTCODE='+inputCode+"&INPUTID="+inputId+"&ISMULTI="+isMulti+"&ORGID="+orgId,730,390);
}


/**
 * 显示经销商详细界面
 */
function orderDetailInfo(orderId){ 
	OpenHtmlWindow(g_webAppName+'/sales/common/OrderDetailInfoAction/orderDetailInfo.do?orderId='+orderId,700,500);
}
/**
 *显示车辆详细信息
 */
function vhclDetailInfo(vehicleId){
	OpenHtmlWindow(g_webAppName+'/sales/common/VhclDetailInfoAction/vhclDetailInfo.do?vehicleId='+vehicleId,700,500);
}
/**
 * N+3预测车款选择
 * @param inputCode
 * @param inputId
 * @param isMulti
 * @param orgId
 * @param isAllLevel
 * @param isAllArea
 */
function showForecastGroup(inputCode ,inputId ,type, isAllLevel, isAllArea)
{
	if(!inputCode){ inputCode = null;}
	if(!inputId){ inputId = null;}
	if(!isAllLevel){ isAllLevel = null;}
	if(!isAllArea){ isAllArea = null;}
	OpenHtmlWindow(g_webAppName+'/dialog/showForecastGroup.jsp?INPUTCODE='+inputCode+"&INPUTID="+inputId+"&TYPE="+type+"&ISALLLEVEL="+isAllLevel+"&ISALLAREA="+isAllArea,420,470);
}