var arcuGoTop=!1;function arCuScroll(){300<pageYOffset?document.getElementById("arcu-go-top").classList.add("active"):document.getElementById("arcu-go-top").classList.remove("active")}function arCuGetCookie(e){return 0<document.cookie.length&&(c_start=document.cookie.indexOf(e+"="),-1!=c_start)?(c_start=c_start+e.length+1,c_end=document.cookie.indexOf(";",c_start),-1==c_end&&(c_end=document.cookie.length),unescape(document.cookie.substring(c_start,c_end))):0}function arCuCreateCookie(e,a,o){var r,t=o?((r=new Date).setTime(r.getTime()+24*o*60*60*1e3),"; expires="+r.toGMTString()):"";document.cookie=e+"="+a+t+"; path=/"}function arCuShowMessage(e){if(arCuPromptClosed)return!1;void 0!==arCuMessages[e]?(jQuery("#arcontactus").contactUs("showPromptTyping"),_arCuTimeOut=setTimeout(function(){return!arCuPromptClosed&&(jQuery("#arcontactus").contactUs("showPrompt",{content:arCuMessages[e]}),e++,void(_arCuTimeOut=setTimeout(function(){return!arCuPromptClosed&&void arCuShowMessage(e)},arCuMessageTime)))},arCuTypingTime)):(arCuCloseLastMessage&&jQuery("#arcontactus").contactUs("hidePrompt"),arCuLoop&&arCuShowMessage(0))}function arCuShowMessages(){setTimeout(function(){clearTimeout(_arCuTimeOut),arCuShowMessage(0)},arCuDelayFirst)}function arCuShowQRCode(e,u){arCuBlockUI(!1),jQuery("#arcontactus").contactUs("closeMenu"),jQuery.ajax({type:"GET",url:arcuOptions.ajaxUrl,dataType:"json",data:{action:"getQRCode",ajax:!0,data:e},success:function(e){jQuery("#arcu-qr-modal").remove(),jQuery("#arcu-qr-modal-backdrop").remove();var a=$("<div>",{id:"arcu-qr-modal"}),o=$("<div>",{id:"arcu-qr-modal-backdrop"}),r=$("<img>",{src:e.qrcodeFile}),t=$("<h4>"),c=$("<button>",{class:"arcu-close-btn",type:"button"});t.text(u),a.append(c),a.append(t),a.append(r),jQuery("body").append(o),jQuery("body").append(a),r.on("load",function(){arCuUnBlockUI(!1),setTimeout(function(){jQuery("#page").length?jQuery("#page").addClass("arcu-blur"):jQuery("body>main").length&&jQuery("body>main").addClass("arcu-blur"),jQuery("#arcu-qr-modal").addClass("active"),jQuery("#arcu-qr-modal-backdrop").addClass("active")},200)})}}).fail(function(){arCuUnBlockUI(!1)})}function arCuCloseQRCode(){jQuery("#arcu-qr-modal").removeClass("active"),jQuery("#arcu-qr-modal-backdrop").removeClass("active"),jQuery(".arcu-blur").removeClass("arcu-blur"),setTimeout(function(){jQuery("#arcu-qr-modal").remove(),jQuery("#arcu-qr-modal-backdrop").remove()},400)}function arCuBlockUI(e){e?($(e).addClass("ar-blocked"),$(e).find(".ar-loading").remove(),$(e).append('<div class="ar-loading"><div class="ar-loading-inner">Loading...</div></div>')):($("#ar-static-loader").remove(),$("body").append('<div id="ar-static-loader"><div class="ar-loading-inner"></div></div>'))}function arCuUnBlockUI(e){e?($(e).find(".ar-loading").remove(),$(e).removeClass("ar-blocked")):$("#ar-static-loader").remove()}window.addEventListener("load",function(){arcuGoTop&&(document.getElementById("arcu-go-top").addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})}),window.addEventListener("scroll",function(e){arCuScroll()}),arCuScroll()),$("body").on("click",".arcu-close-btn",function(){arCuCloseQRCode()}),$("body").on("click","#arcu-qr-modal-backdrop",function(){arCuCloseQRCode()})});