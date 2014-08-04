/*
 * CreateDate : 2009-09-11
 * CreateBy   : ChenLiang
 * Comment    : SGM维护经销商用户
 */

window.addEvent('domready', function(){
	__extQuery__(1);
});

var myPage;
function __extQuery__(page){
	entThisPage = page;
	$("queryBtn").disabled = "disabled";
	showMask();
	submitForm('fm') ? sendAjax(url+(url.lastIndexOf("?") == -1?"?":"&")+"curPage="+page,callBack,'fm') : ($("queryBtn").disabled = "",removeMask());
}
	
	var title = null;
	
	var columns = [
					{header: "序号", align:'center', renderer:getIndex,width:'7%'},
					{header: "用户账号", dataIndex: 'acnt', align:'center'},
					{header: "经销商", dataIndex: 'phone', align:'center'},
					{header: "职位",  dataIndex: 'addr', align:'center'},
					{header: "姓名",  dataIndex: 'name', align:'center'},
					{header: "状态",  dataIndex: 'userStatus', align:'center', orderCol:"USER_STATUS",renderer:getItemValue},
					{id:'action',header: "操作", width:70,sortable: false,dataIndex: 'userId',renderer:myLink}
			      ];

	function myLink(value,metadata){
	   return String.format(
	          "<a href=\""+pat+"/systemManager/action/sysmng/usemng/SgmDealerSysUser/modfiSgmDealerSysUserInit.do?userId="
					+ value + "\">[查看]</a>");
	}

function requery() {
	$('DEALER_NAME').value="";
	$('DEALER_ID').value="";
	$('EMP_NUM').value="";
	$('NAME').value="";
}

function requery2() {
	$('DRLCODE').value="";
	$('DELSNAME').value="";
	$('DEPT_ID').value="";
}
