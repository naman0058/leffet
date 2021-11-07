var FpcModule=function(e){this.name=e,this.oldVersion=!1,this.msgs={},this.aError=[],this.sImgUrl="",this.sWebService="",this.response=null;var m=this;this.show=function(e,a){$("#"+e).html(a).css("style","none"),$("#"+e).show("fast")},this.hide=function(e){$("#"+e).hide("fast",function(){$("#"+e).html("")})},this.form=function(e,a,s,t,n,r,o,l,i,c){c&&$("#"+c).show();var d=$("#"+e).serializeArray(),h=0,u=!1;if(jQuery.each(d,function(e,a){switch(u=!1,a.name){case"id":""==a.value&&(m.aError[h]=m.msgs.id,u=!0);break;case"secret":""==a.value&&(m.aError[h]=m.msgs.secret,u=!0);break;case"callback":""==a.value&&(m.aError[h]=m.msgs.callback,u=!0);break;case"scope":""==a.value&&(m.aError[h]=m.msgs.scope,u=!0);break;case"developerKey":""==a.value&&(m.aError[h]=m.msgs.developerKey,u=!0);break;case"socialEmail":""==a.value&&(m.aError[h]=m.msgs.socialEmail,u=!0);break;case"fbpscDefaultConnectText":""==a.value&&(m.aError[h]=m.msgs.defaultText,u=!0);break;case"fbpscPrefixCode":""==a.value&&"true"==$('input:radio[name="fbpscEnableVoucher"]').val()&&(m.aError[h]=m.msgs.prefixCode,u=!0);break;case"fbpscApiRequestType":""==a.value&&(m.aError[h]=m.msgs.apiType,u=!0);break;case"fbpscHtmlElement":""==a.value&&(m.aError[h]=m.msgs.htmlElement,u=!0);break;case"fbpscPositionName":""==a.value&&(m.aError[h]=m.msgs.positionName,u=!0);break;case"sCssPaddingTop":case"sCssPaddingRight":case"sCssPaddingBottom":case"sCssPaddingLeft":""!=a.value&&0!=$.isNumeric(a.value)||(m.aError[h]=m.msgs.padding,u=!0);break;case"sCssMarginTop":case"sCssMarginRight":case"sCssMarginBottom":case"sCssMarginLeft":""!=a.value&&0!=$.isNumeric(a.value)||(m.aError[h]=m.msgs.margin,u=!0)}null==$('input[name="'+a.name+'"]')&&null==$('textarea[name="'+a.name+'"]')&&null==$('select[name="'+a.name+'"]').length||1!=u||(0!=$('input[name="'+a.name+'"]').length&&($('input[name="'+a.name+'"]').parent().addClass("has-error has-feedback"),$('input[name="'+a.name+'"]').append('<span class="icon-remove-sign"></span>')),0!=$('textarea[name="'+a.name+'"]').length&&($('textarea[name="'+a.name+'"]').parent().addClass("has-error has-feedback"),$('textarea[name="'+a.name+'"]').append('<span class="icon-remove-sign"></span>')),0!=$('select[name="'+a.name+'"]').length&&($('select[name="'+a.name+'"]').parent().addClass("has-error has-feedback"),$('select[name="'+a.name+'"]').append('<span class="icon-remove-sign"></span>')),++h)}),0!=m.aError.length||u)return $("#"+c).hide(),this.displayError(i),!1;if(null!=r&&null!=r&&r)return c&&$("#"+c).hide(),document.forms[e].submit(),!0;c&&null!=n&&m.hide(n,!0);var p=$.param(d);return null!=s&&""!=s&&(p=s+"&"+p),this.ajax(a,p,t,n,o,null,c),!0},this.ajax=function(a,e,s,t,n,r,o){e="sMode=xhr"+(null==e||null==e?"":"&"+e),$.ajax({type:"POST",url:a,data:e,dataType:"html",success:function(e){o&&$("#"+o).hide(),n?($.fancybox(e),s==m.name+"ConnectorList"?m.ajax(""+a,"sAction=display&sType=connectors",""+s,""+t):s==m.name+"HookList"?(s=t=m.name+"ConnectorList",m.ajax(a+"connectors","sAction=display&sType=connectors",""+s,""+t),s=t=m.name+"HookList",m.ajax(a+"hooks","sAction=display&sType=hooks",""+s,""+t)):s==m.name+"HookAdvanced"?m.ajax(""+a,"sAction=display&sType=hookAdvanced",""+s,""+t):s==m.name+"ShortCode"&&m.ajax(""+a,"sAction=display&sType=shortCode",""+s,""+t)):null!=s&&null!=t?(s==t?(m.hide("fast"),$("#"+t).hide("fast"),$("#"+t).empty()):m.hide(t),setTimeout("",1e3),m.show(s,e)):null!=s?m.show(s,e):null!=t?m.hide(t):m.response=e},error:function(e,a,s){$("#"+m.name+"FormError").addClass("alert error"),m.show("#"+m.name+"FormError","<h3>internal error</h3>")}})},this.displayError=function(e){if(0!=m.aError.length){for(var a='<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">×</button><ul class="list-unstyled">',s=0;s<m.aError.length;++s)a+="<li>"+m.aError[s]+"</li>";return a+="</ul></div>",$("#"+m.name+e+"Error").html(a),$("#"+m.name+e+"Error").slideDown(),!(m.aError=[])}},this.changeSelect=function(a,e,s,t,n,r){if(n){"string"==typeof e&&(e=[e]);for(var o=0;o<e.length;++o)r?$("#"+e[o]).fadeIn("fast",function(){$("#"+e[o]).css("display","block")}):$("#"+e[o]).fadeOut("fast")}else $("#"+a).bind("change",function(e){$("#"+a+" input:checked").each(function(){switch($(this).val()){case"true":$("#"+sDestId).fadeIn("fast",function(){$("#"+sDestId).css("display","block")});break;default:$("#"+sDestId).fadeOut("fast"),s&&t&&$("#"+s+" input").each(function(){switch($(this).val()){case"false":$(this).attr("checked","checked"),$("#"+t).fadeOut("fast");break;default:$(this).attr("checked","")}})}})})},this.selectAll=function(e,a){"check"==a?$(e).attr("checked",!0):$(e).attr("checked",!1)},this.updateHook=function(e,a,s,t,n){var r,o="";0!=$("#"+a+" li").length&&(r=[],$("#"+a+" li").each(function(e,a){r[e]=a.id}),o=r.toString()),this.ajax(e,"sConnectorList="+o,s,t,n)},this.draggableConnector=function(){$("#"+m.name+"DraggableConnector li").draggable({revert:"invalid"}),$("#"+m.name+"DroppableConnector ul").droppable({drop:function(e,a){var s,t;$("#"+m.name+"DroppableConnector ul").append(a.draggable),$(a.draggable).css({position:"relative",top:"0px",left:"0px",display:"block"}).draggable("disable").css({opacity:1}).addClass("fbpscsortli","ui-state-default","pull-left","col-xs-8"),0==$(a.draggable).find("span."+m.name+"Garbage").length&&(s=$(a.draggable).html(),console.log(s),t='<span class="pull-left btn btn-default btn-mini '+m.name+'Garbage"> <i class="fa fa-trash"/></span>',$(a.draggable).html(),$(a.draggable).html('<div class="row" id="fbpsc" ><div class="col-xs-10">'+s+'</div><div class="col-xs-2">'+t+" </div></div>"),$(a.draggable).bind("click",function(){m.deleteConnector(this)}))}})},this.sortableConnector=function(){$("#"+m.name+"Sortable").sortable(),$("#"+m.name+"Sortable").disableSelection()},this.deleteConnector=function(e){$(e).find("button."+m.name+"Garbage").remove(),$("#"+m.name+"DraggableConnector ul").append($(e).removeClass("fbpscsortli").draggable("enable").draggable("option","revert","invalid").addClass("fbpscdragli"))},this.getCharts=function(e,a,s,t,n){a={datasets:[{data:a,backgroundColor:t}],labels:s};new Chart(e,{type:"pie",data:a,options:{legend:{position:"bottom"},title:{display:!0,position:"top",text:n,fontSize:14}}})},this.hide=function(e){$("#"+e).hide("fast",function(){$("#"+e).html("")})},this.getBulkCheckBox=function(e){var a=[];return $('input:checked[name="'+e+'"]').each(function(){a.push($(this).val())}),null!=a?a:a=1},this.getContentFromSwitch=function(e,a){1==$("#"+e).is(":checked")?$("#"+a).show():$("#"+a).hide()},this.getConnectors=function(e,a){this.ajax(this.sWebService,"sAction=display&sType=shortCode&sShortCodeName="+a,"sl_connector_"+e,null,null,null,null)}};