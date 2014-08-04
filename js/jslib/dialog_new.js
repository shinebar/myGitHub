function getTopWinRef(){
	 if(parent.parent){
	  	return parent.parent.document;
	 }else if( parent ){
	  	return parent.document;
	 }else{
	  	return document;
	 }
}
var GLOBAL_FUNC_AFTER='';
function _dialogInit(){//初始化
	var owner = getTopWinRef();
	if( owner.getElementById('dialog_div')==null ){
		var div = owner.createElement('div');
		div.setAttribute('id','dialog_div');
		owner.getElementsByTagName('body').item(0).appendChild(div);
		
		_crtBackGlassDiv();
		_crtBackIFrame(); //add by zhaoli
		_crtModalDiv();
		_crtBackGroudDiv();
		_crtContentDiv();
		_crtContentFrame();
	} 
	if(owner.getElementById('dialog_modal_div')!=null){
		owner.getElementById('dialog_modal_div').onclick = function(){_hide();}
	}
	owner =null;
}

function _dialogDestroy(){//清扫遗留对象
	var owner = getTopWinRef();
	
	//移除事件，并设置成空。
	if( owner.getElementById('dialog_alert_button') ) 
		owner.getElementById('dialog_alert_button').onclick=null; 
	if( owner.getElementById('dialog_yes_button') ) 
		owner.getElementById('dialog_yes_button').onclick=null;
	if( owner.getElementById('dialog_no_button') ) 
		owner.getElementById('dialog_no_button').onclick=null;
		owner.getElementById('dialog_content_div').innerHTML=''; 
		owner.getElementById('dialog_content_frame').document.clear();
	
	owner=null;
	
	
	if(GLOBAL_FUNC_AFTER!='' && GLOBAL_FUNC_AFTER!='undefined'){
		GLOBAL_FUNC_AFTER();
	}
}
function _crtBackGlassDiv(){//创建全屏半透明 div
	var owner = getTopWinRef();
	var div = owner.createElement('div');
	div.setAttribute('id','dialog_back_glass_div');
	div.style.display='none';
	div.style.background='#000';
	div.style.position='absolute';
	div.style.zIndex=100;
	div.style.top='0px';
	div.style.left='0px';
	div.style.width=(screen.width - 23) + 'px';
	div.style.height='100%';
	
	//背景
	if (document.all) {
		div.style.filter = "alpha(opacity=40)";
	} else {
		div.style.MozOpacity = "0.4";
	}
	owner.getElementById('dialog_div').appendChild(div);
	owner=null;
}

//add by zhaoli, 用来解决ie6下,select控件显示的bug
function _crtBackIFrame(){
	var owner = getTopWinRef();
	var div = owner.createElement('iframe');
	div.setAttribute('id','dialog_back_iframe');
	div.style.display='none';
	div.style.background='#000';
	div.style.position='absolute';
	div.style.zIndex=101;
	div.style.top='0px';
	div.style.left='0px';
	div.style.width=(screen.width - 23) + 'px';
	div.style.height='100%';
	//背景
	if(document.all)
	div.style.filter = "alpha(opacity=0)";
	else
	div.style.opacity = 0;
	owner.getElementById('dialog_div').appendChild(div);
	owner=null;
}

function _crtModalDiv(){
	var owner = getTopWinRef();
	var div = owner.createElement('div');
	div.setAttribute('id','dialog_modal_div');
	div.style.display='none';
	div.style.background='#000';
	div.style.position='absolute';
	div.style.zIndex=102;
	div.style.top='-20px';
	div.style.left='0px';	
	div.style.width=(screen.width - 23) + 'px';
	div.style.height='100%';
	if(document.all)
	div.style.filter = "alpha(opacity=0)";
	else
	div.style.opacity = 0;
	//背景
	owner.getElementById('dialog_div').appendChild(div);
	owner=null;
}

function _crtBackGroudDiv(){//创建边框背景div
	var owner = getTopWinRef();
	var div = owner.createElement('div');
	div.setAttribute('id','dialog_back_groud_div');
	div.style.display='none';
	div.style.background='#666';
	div.style.position='absolute';
	div.style.zIndex=103;

	owner.getElementById('dialog_div').appendChild(div);
	owner =null;
}

function _crtContentDiv(){//创建内容div
	var owner = getTopWinRef();
	var div = owner.createElement('div'); 
	div.setAttribute('id','dialog_content_div');
	div.style.display='none';
	div.style.background='#fff';
	div.style.position='absolute';
	div.style.zIndex=104;
	owner.getElementById('dialog_div').appendChild(div);
	owner=null;
}

function _crtContentFrame(){//创建iframe
	var owner = getTopWinRef();
	var div = owner.createElement('iframe');
	div.setAttribute('id','dialog_content_frame');
	div.style.display='none';
	div.style.position='absolute';
	div.style.zIndex=105;
	div.style.background='#fff';
	owner.getElementById('dialog_div').appendChild(div);
}
function _setSize(width,height, isFrm){
	var owner = getTopWinRef();
	var bwidth = 8;
	var ctop = (screen.height-height)/3;
	var cleft= (screen.width-width)/2;
	
	var div = owner.getElementById('dialog_back_groud_div');
	div.style.width=width+bwidth*2+'px';
	div.style.height=height+bwidth*2+'px';
	div.style.left=(cleft-bwidth)+'px';
	div.style.top=(ctop-bwidth)+'px';
	
	if( isFrm ){
		div = owner.getElementById('dialog_content_frame');
		div.style.width=width+'px';
		div.style.height=height+'px';
		div.style.left=cleft+'px';
		div.style.top=ctop+'px';
	}else{
		div = owner.getElementById('dialog_content_div');
		div.style.width=width+'px';
		div.style.height=height+'px';
		div.style.left=cleft+'px';
		div.style.top=ctop+'px';
	}
	owner=null;
}

function _hide(){
	var owner = getTopWinRef();
	var div = owner.getElementById('dialog_back_glass_div');
	div.style.display='none';
	
	div = owner.getElementById('dialog_back_iframe');
	div.style.display='none';
	
	div = owner.getElementById('dialog_modal_div');
	div.style.display='none';
	
	div = owner.getElementById('dialog_back_groud_div');
	div.style.display='none';
	
	div = owner.getElementById('dialog_content_div');
	div.style.display='none';
	
	div = owner.getElementById('dialog_content_frame');
	div.style.display='none';
	
	if(typeof(st) == "undefined") {
		div.src = ""
	}
	
	owner =null;
	
	_dialogDestroy();
}
function _hide2(){
	var owner = getTopWinRef();
	var div = owner.getElementById('dialog_back_glass_div');
	div.style.display='none';
	
	div = owner.getElementById('dialog_back_iframe');
	div.style.display='none';
	
	div = owner.getElementById('dialog_modal_div');
	div.style.display='none';
	
	div = owner.getElementById('dialog_back_groud_div');
	div.style.display='none';
	
	div = owner.getElementById('dialog_content_div');
	div.style.display='none'; 
	
	div = owner.getElementById('dialog_content_frame');
	div.style.display='none'; 
	owner =null;
	
	_dialogDestroy();
}

function _show(isFrm){
	var owner = getTopWinRef();
	var div = owner.getElementById('dialog_back_glass_div');
	div.style.display='';
	
	div = owner.getElementById('dialog_back_iframe');
	div.style.display='';
	
	div = owner.getElementById('dialog_modal_div');
	div.style.display='';
	
	div = owner.getElementById('dialog_back_groud_div');
	div.style.display='';
	
	if( isFrm ){
		div = owner.getElementById('dialog_content_frame');
		div.style.display=''; 
	}else{
		div = owner.getElementById('dialog_content_div');
		div.style.display='';  
	} 
	owner=null; 
}

//=========================================================================

function MyAlert(info,GLOBAL_FUNC){
 var owner = getTopWinRef();
 
 try{
  _dialogInit();  
  owner.getElementById('dialog_content_div').innerHTML='\
    <div style="font-size:12px;">\
     <div style="background-color:#08327e; padding:8px 5px 5px 10px; color:#ffffff;">\
      <b>信息</b>\
     </div>\
     <div id="dialog_alert_info" style="padding:10px; line-height:2em"></div>\
     <div style="padding:2px;text-align:center;background:#D0BFA1;">\
      <input id="dialog_alert_button" type="button" value="确定" style="padding:2px 0px 0px 0px; background-color:#08327e;color:#FFF;font-size:12px;border-top:1px solid #DDD;border-left:1px solid #DDD;border-right:1px solid #333;border-bottom:1px solid #333;"/>\
     </div>\
    </div>';
  owner.getElementById('dialog_alert_info').innerHTML=info;
  owner.getElementById('dialog_alert_button').onclick=_hide;
  GLOBAL_FUNC_AFTER = GLOBAL_FUNC;
  _setSize(300, 200); 
  _show();
  owner.getElementById('dialog_alert_button').focus();
 }catch(e){
  alert('MyAlert : '+ e.name+'='+e.message);
 }finally{
  owner=null;
 }
}
function MyConfirm(info,funYes,arrYes,funNo,arrNo){
	var owner = getTopWinRef();
	try{
	_dialogInit();  
	owner.getElementById('dialog_content_div').innerHTML='\
	<div style="font-size:12px;">\
	 <div style="background-color:#08327e; padding:8px 5px 5px 10px; color:#ffffff;">\
	  <b>信息</b>\
	 </div>\
	 <div id="dialog_alert_info" style="padding:10px; line-height:2em"></div>\
	 <div style="padding:2px;text-align:center;background:#D0BFA1;">\
	  <input id="dialog_yes_button" type="button" value=" 确定 " style="padding:2px 0px 0px 0px; background-color:#08327e;color:#FFF;font-size:12px;border-top:1px solid #DDD;border-left:1px solid #DDD;border-right:1px solid #333;border-bottom:1px solid #333;"/>\
	  <input id="dialog_no_button" type="button" value=" 取消 " style="padding:2px 0px 0px 0px; background-color:#08327e;color:#FFF;font-size:12px;border-top:1px solid #DDD;border-left:1px solid #DDD;border-right:1px solid #333;border-bottom:1px solid #333;"/>\
	 </div>\
	</div>';
	owner.getElementById('dialog_alert_info').innerHTML=info;
	owner.getElementById('dialog_yes_button').onclick=function(){
	try{
	 if(funYes&&arrYes){
	  funYes.apply(this,arrYes);
	 }else if(funYes){
	  funYes();
	 }
	}finally{
	 _hide();
	}
	};
	owner.getElementById('dialog_no_button').onclick=function(){
	try{
	 if(funNo&&arrNo){
	  funNo.apply(this,arrNo);
	 }else if(funNo){
	  funNo();
	 }
	}finally{
	 _hide();
	}
	};
	
	_setSize(300, 100); 
	_show();
	owner.getElementById('dialog_yes_button').focus();
	}catch(e){
	alert('MyAlert : '+ e.name+'='+e.message);
	}finally{
	owner=null;
	}
}

function OpenHtmlWindow(url,width,height){
	 var owner = getTopWinRef();
	 try{
	  _dialogInit();
	  _setSize(width, height, true);
	  _show(true);
	  owner.getElementById('dialog_content_frame').src = url;
	 }catch(e){
	  alert('MyAlert : '+ e.name+'='+e.message);
	 }finally{
	  owner=null;
	 }
}
function OpenHtmlWindow2(url,width,height,st){
	 var owner = getTopWinRef();
	 try{
	  _dialogInit();
	  _setSize(width, height, true);
	  _show(true);
	  if(!st) {
	  	owner.getElementById('dialog_content_frame').src = url;
	  }
	 }catch(e){
	  alert('MyAlert : '+ e.name+'='+e.message);
	 }finally{
	  owner=null;
	 }
}