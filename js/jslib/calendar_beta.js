//这段脚本如果你的页面里有，就可以去掉它们了
var ie =navigator.appName=="Microsoft Internet Explorer"?true:false;

//<!--下面的代码得放在Body标签里，当然，放在页面最后面也可以（不过有可能会出现JS还未加载完毕时用户点击了下面的输入框，这样页面就会出错了。）-->
 
var controlid = null;
var currdate = null;
var startdate = null;
var enddate = null;
var yy = null;
var mm = null;
var hh = null;
var ii = null;
var currday = null;
var addtime = false;
var today = new Date();/////////////////////////////////
var monlen = today.getMonth();
var yearlen = today.getFullYear();
var lastcheckedyear = false;
var lastcheckedmonth = false;

var hiddYEAR = false;
function _cancelBubble(event) {
e = event ? event : window.event ;
if(ie) {
   e.cancelBubble = true;
} else {
   e.stopPropagation();
}
}
function getposition(obj) {

var r = new Array();
r['x'] = obj.offsetLeft;
r['y'] = obj.offsetTop;
while(obj = obj.offsetParent) {
   r['x'] += obj.offsetLeft;
   r['y'] += obj.offsetTop;
}
return r;
}
function loadcalendar_beta() {
s = '';
s += '<div id="calendar" style="display:none; position:absolute; z-index:9;" onclick="_cancelBubble(event)">';
if (ie){//height="160"
   s += '<iframe width="200" height="50" src="about:blank" style="position: absolute;z-index:-1;"></iframe>';
}
s += '<div style="width: 200px;"><table class="tableborder" cellspacing="0" cellpadding="0" width="100%" style="text-align: center">';
s += '<tr align="center"><td class="header"><a href="javascript:void(0)" style="color:#08327e;" onclick="refreshcalendar(yy, mm-1);return false" title="上一月"><<</a></td><td colspan="5" style="text-align: center" class="header"><a style="color:#08327e;" href="javascript:void(0)" onclick="showdiv(\'year\');_cancelBubble(event);return false" title="点击选择年份" id="year"></a> <span id="hspan" style="color:#08327e;">-</span> <a id="month" style="color:#08327e;" title="点击选择月份" href="javascript:void(0)" onclick="showdiv(\'month\');_cancelBubble(event);return false"></a></td><td class="header"><a id="nextMon" style="color:#08327e;" href="#" onclick="refreshcalendar(yy, mm+1);return false" title="下一月">>></a></td></tr>';
s += '<tr><td height="20" colspan="7" style="border-top:1px solid #CCC;background:#f7f7f7;"><a id="clearBtn" href="javascript:void(0)" onclick="$(\'calendar\').style.display = \'none\';setDateBefore();" >确 认</a>&nbsp;&nbsp;&nbsp;&nbsp;<a id="clearBtn" href="javascript:void(0)" onclick="$(\'calendar\').style.display = \'none\';$(tmp).value=\'\';" >清 空</a></td></tr>';
s += '</table></div></div>';
s += '<div id="calendar_year" onclick="_cancelBubble(event)"><div class="col">';
for(var k = 2010; k <= yearlen; k++) {
   s += k != 2010 && k % 10 == 0 ? '</div><div class="col">' : '';
   s += '<a class="showTime" href="#" onclick="refreshcalendar(' + k + ', mm);document.getElementById(\'calendar_year\').style.display=\'none\';getMonLen();return false"><span' + (today.getFullYear() == k ? ' class="today"' : '') + ' id="calendar_year_' + k + '">' + k + '</span></a><br />';
}
s += '</div></div>';
s += '<div id="calendar_month" onclick="_cancelBubble(event)">';
for(var k = 1; k <= monlen; k++) {
   s += '<a class="showTime" href="#" onclick="refreshcalendar(yy, ' + (k - 1) + ');document.getElementById(\'calendar_month\').style.display=\'none\';getYearLen();return false"><span' + (today.getMonth()+1 == k ? ' class="today"' : '') + ' id="calendar_month_' + k + '">' + k + ( k < 10 ? ' ' : '') + ' 月</span></a><br />';
}
s += '</div>';
var nElement = document.createElement("div");
nElement.innerHTML=s;
document.getElementsByTagName("body")[0].appendChild(nElement);
// document.write(s);monlen
document.onclick = function(event) {
   document.getElementById('calendar').style.display = 'none';
   document.getElementById('calendar_year').style.display = 'none';
   document.getElementById('calendar_month').style.display = 'none';
   hiddYEAR = false;
}
document.getElementById('calendar').onclick = function(event) {
   _cancelBubble(event);
   document.getElementById('calendar_year').style.display = 'none';
   document.getElementById('calendar_month').style.display = 'none';
   //modified by andy.ten@tom.com 20100728
   try
   {
	   calendarCallBack(event);
   }catch(e)
   {
	   //alert(e);
   }
   //end
}
}
/**
 * added by andy.ten@tom.com 20100728
 * 增加点击日期，回调方法，业务页面需覆盖该方法实现
 * event:当前点击事件
 */
function calendarCallBack(event)
{
	
}
function parsedate(s) {
	
/(\d+)\-(\d+)\-(\d+)\s*(\d*):?(\d*)/.exec(s);
var m1 = (RegExp.$1 && RegExp.$1 > 1899 && RegExp.$1 < 2101) ? parseFloat(RegExp.$1) : today.getFullYear();
var m2 = (RegExp.$2 && (RegExp.$2 > 0 && RegExp.$2 < 13)) ? parseFloat(RegExp.$2) : today.getMonth();//////////today.getMonth() + 1
var m3 = (RegExp.$3 && (RegExp.$3 > 0 && RegExp.$3 < 32)) ? parseFloat(RegExp.$3) : today.getDate();
var m4 = (RegExp.$4 && (RegExp.$4 > -1 && RegExp.$4 < 24)) ? parseFloat(RegExp.$4) : 0;
var m5 = (RegExp.$5 && (RegExp.$5 > -1 && RegExp.$5 < 60)) ? parseFloat(RegExp.$5) : 0;
/(\d+)\-(\d+)\-(\d+)\s*(\d*):?(\d*)/.exec("0000-00-00 00\:00");
return new Date(m1, m2 - 1, m3, m4, m5);
}
function settime(d) {
	document.getElementById('calendar').style.display = 'none';
	if(hiddYEAR){
      document.getElementById(controlid).value =  (zerofill(mm + 1) > 9 ? zerofill(mm + 1) : '0' + zerofill(mm + 1)) + "-" + (zerofill(d) > 9 ? zerofill(d) : '0' + zerofill(d)) + (addtime ? ' ' + zerofill($('hour').value) + ':' + zerofill(document.getElementById('minute').value) : '');	
	}else{
	  document.getElementById(controlid).value = yy + "-" + (zerofill(mm + 1) > 9 ? zerofill(mm + 1) : '0' + zerofill(mm + 1)) + "-" + (zerofill(d) > 9 ? zerofill(d) : '0' + zerofill(d)) + (addtime ? ' ' + zerofill($('hour').value) + ':' + zerofill(document.getElementById('minute').value) : '');
	}
}
var tmp = '';
function showcalendar(event, controlid1, addtime1, startdate1, enddate1,hiddY) {

	tmp = controlid = controlid1;
	addtime = addtime1;
	startdate = startdate1 ? parsedate(startdate1) : false;
	enddate = enddate1 ? parsedate(enddate1) : false;
	currday = $F(controlid) ? parsedate($F(controlid)) : today;
		
	hh = currday.getHours();
	ii = currday.getMinutes();
	var p = getposition($(controlid));
	document.getElementById('calendar').style.display = 'block';
	document.getElementById('calendar').style.left = p['x']+'px';
	document.getElementById('calendar').style.top = (p['y'] + 19)+'px';
	_cancelBubble(event);
	if(currday == today){
		refreshcalendar(currday.getFullYear(), currday.getMonth()-1);///////////////////currday.getMonth()
	}else{
		refreshcalendar(currday.getFullYear(), currday.getMonth());///////////////////currday.getMonth()
	}
	
	if(lastcheckedyear != false) {
	   document.getElementById('calendar_year_' + lastcheckedyear).className = 'default';
	   document.getElementById('calendar_year_' + today.getFullYear()).className = 'today';
	}
	if(lastcheckedmonth != false) {
	   document.getElementById('calendar_month_' + lastcheckedmonth).className = 'default';
	   document.getElementById('calendar_month_' + (today.getMonth() + 1)).className = 'today';
	}
	document.getElementById('calendar_year_' + currday.getFullYear()).className = 'checked';
	document.getElementById('calendar_month_' + (currday.getMonth() + 1)).className = 'checked';
	lastcheckedyear = currday.getFullYear();
	lastcheckedmonth = currday.getMonth();//////////////////currday.getMonth() + 1
}
function refreshcalendar(y, m) {
	
var x = new Date(y, m, 1);
var mv = x.getDay();
var d = x.getDate();
var dd = null;
yy = x.getFullYear();
mm = x.getMonth();
document.getElementById("year").innerHTML = yy;
document.getElementById("month").innerHTML = mm + 1 > 9 ? (mm + 1) : '0' + (mm + 1);
 //判断是否是当前年，'>>' 单机方法
 if(x.getFullYear() == today.getFullYear() && x.getMonth() == today.getMonth()-1){
 	document.getElementById("nextMon").disabled = true;
 	document.getElementById("nextMon").onclick = function(){return false;};
 }else {
 	document.getElementById("nextMon").disabled = false;
 	document.getElementById("nextMon").onclick = function(){refreshcalendar(yy, mm+1);return false;};
 }   
}
function showdiv(id) {
var p = getposition(document.getElementById(id));
document.getElementById('calendar_' + id).style.left = p['x']+'px';
document.getElementById('calendar_' + id).style.top = (p['y'] + 16)+'px';
document.getElementById('calendar_' + id).style.display = 'block';
}
function zerofill(s) {
	return s;
}
function getTimes(s){
if(s < 10){ s = '0'+s;}
return s;
}
/*-------------------------------------------------------------------*/

function showTime(event,controlid1,is) {

	var t = '';
	tmp = controlid = controlid1;
	t += '<div id="timeDiv" style="display:none; position:absolute; z-index:9;" onclick="_cancelBubble(event)">';
	if (ie){
	   t += '<iframe width="200" height="60" src="about:blank" style="position: absolute;z-index:-1;"></iframe>';
	}	
	t += '<div style="width: 200px;"><table border="0" class="tableborder" cellspacing="0" cellpadding="0" width="100%" style="text-align: center">';
	t += '<tr ><td style="background:#E4D7C2" align="center" height="25">时间： <select id="hourSel" style="width:40px;">';
	
	for(var i = 0; i<= 24; i++){
		if(i < 10){ i = '0'+i;}
		t += '<option value="'+i+'">'+i+'</option>';
	}
	t +='</select> 点&nbsp;';
	
	t += '<select id="minuteSel" style="width:40px;">';

		for(var j = 0; j<= 59; j++){
			if(j < 10){ j = '0'+j;}
			t += '<option value="'+j+'">'+j+'</option>';
		}

	t += '</select> 分</td><td style="background:#E4D7C2">&nbsp;'
	t += '<a id="sureBtn" href="javascript:void(0)" onclick="$(\'timeDiv\').style.display = \'none\';setTimes()" style="display:block; background:#0066cc; color:#fff; padding:3px; border:1px solid #FFF;" >确 定</a>';
	t+='&nbsp;&nbsp;</td></tr></table></div></div>';

	var dElement = document.createElement("div");
	dElement.innerHTML=t;
	document.getElementsByTagName("body")[0].appendChild(dElement);
	document.onclick = function(event) {
	   document.getElementById('timeDiv').style.display = 'none';
	}
	document.getElementById('timeDiv').onclick = function(event) {
	   _cancelBubble(event);
	}

	currday = $F(controlid1) ? parsedate($F(controlid1)) : today;
	hh = currday.getHours();
	ii = currday.getMinutes();
	$('hourSel').value = getTimes(hh);
	$('minuteSel').value = getTimes(ii);
	var p = getposition($(controlid1));
	document.getElementById('timeDiv').style.display = 'block';
	document.getElementById('timeDiv').style.left = p['x']+'px';
	document.getElementById('timeDiv').style.top = (p['y'] + 19)+'px';
	_cancelBubble(event);

}

function setTimes(){
	$(tmp).value=$('hourSel').value + ':' + $('minuteSel').value;
}

function setDateBefore(){
    document.getElementById(controlid).value = yy + "-" + (zerofill(mm + 1) > 9 ? zerofill(mm + 1) : '0' + zerofill(mm + 1));
}
//获得“月份”长度
function getMonLen(){
   	monlen = yy == today.getFullYear() ? today.getMonth() : 12;
	var s = '';
	for(var k = 1; k <= monlen; k++) {
   		s += '<a class="showTime" href="#" onclick="refreshcalendar(yy, ' + (k - 1) + ');document.getElementById(\'calendar_month\').style.display=\'none\';getYearLen();return false"><span' + (today.getMonth()+1 == k ? ' class="today"' : '') + ' id="calendar_month_' + k + '">' + k + ( k < 10 ? ' ' : '') + ' 月</span></a><br />';
	}
	document.getElementById("calendar_month").innerHTML = s;
}
//获得“年份”长度
function getYearLen(){
   	yearlen = mm >= today.getMonth() ?  today.getFullYear() -1 : today.getFullYear();
	var s = '';
	for(var k = 2010; k <= yearlen; k++) {
	   s += k != 2010 && k % 10 == 0 ? '</div><div class="col">' : '';
	   s += '<a class="showTime" href="#" onclick="refreshcalendar(' + k + ', mm);document.getElementById(\'calendar_year\').style.display=\'none\';getMonLen();return false"><span' + (today.getFullYear() == k ? ' class="today"' : '') + ' id="calendar_year_' + k + '">' + k + '</span></a><br />';
	}
	document.getElementById("calendar_year").innerHTML = s;
}