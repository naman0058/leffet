// var keyupinput=false;
// var savedata=false;
// customization = {};


// $(document).on('mouseup', '#attribute-no-custom', function(e) {
//     e.preventDefault();
//     $("#quantity_wanted").prop("disabled",false);
//     $("#custom_measurement").val("");
//     $("#custom_title").text("");

// });
// $(document).on('click', '.measurement-action', function(e) {
//         // e.preventDefault();
//         $("#quantity_wanted").val(1);
//         $("#quantity_wanted").prop("disabled",true);
//         var measurement_id = $(this).data("measurement");
//         var linkAction = $(this).data('href');
//         var product_page_product_id= $("#product_page_product_id").val();
//         customModal(linkAction,measurement_id,product_page_product_id)
        
//     });

// $(document).on('click', '.measurement-account', function(e) {
//         e.preventDefault();
//         $("#quantity_wanted").val(1);
//         $("#quantity_wanted").prop("disabled",true);
//         var measurement_id = $(this).data("measurement");
//         // startMainLoader();
//         var action = $(this).attr('href') + '&measurement_id='+measurement_id+'&from=cartMeasurement';
//         console.log(action)
//         $.ajax({
//             type: 'get',
//             url: action,
//             dataType: 'json',
//             success: function(data) {
//                 $('#measurement-modal').modal({
//                     backdrop: 'static',
//                     keyboard: false
//                 });
//                 $('#modal-measurement-details').html(data.measurement_form);
//                 changeTabStyle(0);
//                 scrollToPosition(0);
//             },
//             done: function() {
//                 // stopMainLoader();
//             },
//             complete: function() {
//                 // stopMainLoader();
//             },
//             error: function(data) {
//                 console.log(data);
//                 // stopMainLoader();
//                 // $('#location-modal').modal();
//             }
//         })
//     });

    
//     //Save the measurement to DB if logged in user. 
//     $(document).on('click', '.save-data', function(e) {
//         e.preventDefault();
//         console.log("me here");
//          $product_id= $("#product_page_product_id").val();
//         $(this).attr('diasbled', true);
//         savedata=true;
//         var link = $(".measurement-action").data("product-url");
//         // startMainLoader();
       
//         var result = {};
//         allmeasuremntSet = allMeasParamSet();
//         $(this).attr('diasbled', false);
//         if (allmeasuremntSet) {
//             $.each($('.measurement-params').serializeArray(), function() {
//                 result[this.name] = this.value;
//             });
//             result['product_id']= $product_id;
//             result['group_2']= $("input[name='group[2]']:checked").val();
//             resultJson = JSON.stringify(result);
//             $.ajax({
//                 type: 'post',
//                 url: prestashop.urls.base_url + 'index.php?controller=measurement&from=cartMeasurement',
//                 dataType: 'json',
//                 data: {
//                     'ajax': 1,
//                     'action': 'saveMeasurement',
//                     'measurment': resultJson
//                 },
//                 success: function(data) {
//                    $(".measurement-action").data("measurement",data.customerMeasurementId);
//                    $("#custom_measurement").val(data.customerMeasurementId);
//                    $("#custom_attribute").val(data.custom_id_product_attribute);
//                    document.getElementById("custom_product_price").textContent='₹'+data.custom_product_price;
//                    $("#custom_title").text(data.customerMeasurementTitle);
//                     set('measurements', {
//                         'customer-measurement': data.customerMeasurementId
//                     });

//                 },
//                 done: function() {
//                     // stopMainLoader();
//                 },
//                 complete: function() {
//                     // stopMainLoader();
//                 },
//                 error: function(data) {
//                     // stopMainLoader();
//                     console.log(data)
//                     // $('#location-modal').modal();
//                 }
//             })
//             //customerMeasurement();
//             $('.alert-danger').addClass('hidden');
//             $('#measurement-modal').modal('hide');
//         } else {
//             $('.alert-danger').removeClass('hidden');
//             // stopMainLoader();
//             // alert('fillAllMeasurementDetails');
//         }
//     });


// var changeTabStyle = function(key) {
//         var activeElements = $('.media').find('.active');
//         activeElements.removeClass('active');
//         $('#media-' + key).addClass('active').removeClass('selected');
//         var divelems = document.getElementsByClassName('media');
//         for (var i = 0; i <= key; i++) {
//             $("#media-" + i).removeClass('disable');
//             if (key != i) {
//             $("#media-" + i).addClass('selected');
//             $("#media-" + i).removeClass('active');
//             $("#media-" + i).removeClass('error-active');
//         }
//         if (key == i && $("#media-" + i).hasClass('error')) {
//             $("#media-" + i).addClass('error-active');
//         } else {
//             $("#media-" + i).removeClass('error-active');
//         }
//         if (i != key && $('#media-' + i).find('p').text() == "" && $("#media-" + i).hasClass('selected') && !$("#media-" + i).hasClass('disable')) {
//             $("#media-" + j).addClass('error');

//         }


//         }
        
//         for (var j = key ; j <= divelems.length; j++) {
//             if (key != j) {
//                 $("#media-" + i).addClass('selected');
//                 $("#media-" + i).removeClass('active');
//                 $("#media-" + i).removeClass('error-active');
//             }
//             if (j != key && $('#measurement-group-' + key).val() != "") {
//                 $("#media-" + j).addClass('disable');

//             }
//             if (j != key && $('#media-' + j).find('p').text() == "" && $("#media-" + j).hasClass('selected') && !$("#media-" + j).hasClass('disable')) {
//                 $("#media-" + j).addClass('error');

//             }else if(j != key && $('#media-' + j).find('p').text() != "" && $("#media-" + j).hasClass('selected') && $("#media-" + j).hasClass('error')){
//                 $("#media-" + j).removeClass('error');
//             }

//         }


//     }
// // Scrolling action 
// var scrollToPosition = function(key){
//     // Scrolling Correction
    

//     var $container = $('.measuremnt-media');
//     $scrollTo = $("#media-" + (key-1));
//     $('#measurement-modal').scrollTop(0);
//     $('.measuremnt-media').scrollTop(0);
//     $scrollbottom = $('.mes-video-div');
//     if(key ==0){
//         $scrollTo = $("#media-" + (key));
//         // $container.scrollTop(
//         //     $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - $scrollbottom
//         // );
    
//         // $container.animate({
//         //     scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - $scrollbottom
//         // });

//         $container.scrollTop(0);
//     }else{
//         // $container.scrollTop(
//         //     $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - $scrollbottom
//         // );
    
//         // $container.animate({
//         //     scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - $scrollbottom.offset().top
//         // });

//         $container.scrollTop(
//             $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
//         );
//     }
// }


// $(document).on('keyup', '#id_title', function() {
//     var vals = $('#id_title').val();
//     $('#title').html(vals + '<i class="fa fa-edit"></i>');



// })

// function editMeasurement() {
//     /*var divelems = document.getElementsByClassName('media');

//     for(var i=1;i<= divelems.length;i++) {
//         $("#media-"+i).addClass('disable');

//     }*/
//     $('.edit').show();
//     $('#id_title').hide();
//     $("#modal-measurement-details").on("click", ".edit", function() {
//         $('#id_title').show();
//         $('.edit').hide();

//     });
//     $('#measurement-modal').modal({
//         backdrop: 'static',
//         keyboard: false
//     });


// }
// function updateMeasurement(id_measurement, id_category) {
//     startMainLoader();
//     if (id_measurement != 0) {
//         action = prestashop.urls.base_url + 'index.php?ajax=1&controller=measurement&measurement_id=' +
//             id_measurement + '&categoryId=' + id_category + '&from=cartMeasurement';
//         $.ajax({
//             type: 'get',
//             url: action,
//             dataType: 'json',
//             success: function(data) {
//                 $('#measurement-modal').modal({
//                     backdrop: 'static',
//                     keyboard: false
//                 });
//                 $('#modal-measurement-details').html(data.measurement_form);
//             },
//             done: function() {
//                 stopMainLoader();
//             },
//             complete: function() {
//                 stopMainLoader();
//             },
//             error: function(data) {
//                 stopMainLoader();
//                 console.log("Error");
//             }
//         });
//     }else{
//         stopMainLoader();
//     }
// }


// /*--------- Scrolling Effect End----------*/



// /* Customer measurement scroll */
// $('#measurement-modal').on('show.bs.modal', function() {
//     $("#modal-measurement-details").on("click", ".media", function() {
//         var key = $(this).data("key");

//         var index = key!=0 ? Number(key) - 1 : key;
//         if (MeasParmamValid(index,true)) {
//             MeasParmamValid(key);
//             $("#measurement-group-" + key + " input").focus();
//             var elmnt = document.getElementById("measurement-group-" + key);
//             var divs = document.getElementsByClassName("measurement-group");
//             for (var i = 0; i < divs.length; i++) {
//                 divs[i].style.display = "none";

//             }
//             elmnt.style.display = 'block';
//             changeTabStyle(key);

//             elmnt.scrollIntoView();
//             scrollToPosition(key);
//         }else{
//             changeTabStyle(index);
//         }
    
//     });

//     // Click action for next clicks,to continue diffrent measurement parameters
//     $("#modal-measurement-details").on("click", ".next", function() {
//         var elementId = $(this).parents(".measurement-group").attr("id");
//         var last = elementId.substring(elementId.lastIndexOf("-") + 1, elementId.length);
//         var index = Number(last) + 1;
//         if (MeasParmamValid(index)) {
//             $(this).parents(".measurement-group").css('display', 'none');
//             $("#" + elementId).parent().next().find(".measurement-group").css('display', 'block');
//             $("#" + elementId).parent().next().find("input").focus();
//             var index = Number(last) + 1;
//             MeasParmamValid(index);
//             changeTabStyle(index);
//             scrollToPosition(index);

//         } else {
//             $("#" + elementId).find("input").focus();
//             changeTabStyle(Number(last));
//         }


//     });
//     $("#modal-measurement-details").on("click", ".edit", function() {
//         var showElm = document.getElementById("id_title");
//         $(this).hide();
//         showElm.style.display = 'block';
//     });
//     // Click action to reverse prameter travel
//     $("#modal-measurement-details").on("click", ".prev", function(e) {
//         e.preventDefault();
//         var elementId = $(this).parents(".measurement-group").attr("id");
//         $(this).parents(".measurement-group").css('display', 'none');
//         $("#" + elementId).parent().prev().find(".measurement-group").css('display', 'block');
//         $("#" + elementId).parent().prev().find("input").focus();
//         var last = elementId.substring(elementId.lastIndexOf("-") + 1, elementId.length);
//         var elmnts = document.getElementById("media-" + last);
//         MeasParmamValid(last - 1,false);
//         changeTabStyle(last - 1);
//         scrollToPosition(last-1);


//     });

    
//     handleConfirm();

// });

// // Scrolling action  for measurement modal
// var scrollToPosition = function(key){
//     // Scrolling Correction
    

//     var $container = $('.measuremnt-media');
//     $scrollTo = $("#media-" + (key-1));
//     $('#measurement-modal').scrollTop(0);
//     $('.measuremnt-media').scrollTop(0);
//     $scrollbottom = $('.mes-video-div');
//     if(key ==0){
//         $scrollTo = $("#media-" + (key));
//         $container.scrollTop(
//             $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - $scrollbottom
//         );
    
//         $container.animate({
//             scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - $scrollbottom
//         });
//     }else{
//         $container.scrollTop(
//             $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - $scrollbottom
//         );
    
//         $container.animate({
//             scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - $scrollbottom.offset().top
//         });
//     }
// }



// $(document).on('change', '.req_meas:not(#id_title),#id_title', function() {
//     keyupinput=true;
//     handleConfirm();
// });



// function handleConfirm() {

//  // var flag = confirm("Are you sure you want to leave with out saving the data?");

//     $("#measurement-modal").off('hide.bs.modal').on("hide.bs.modal", function (e) { 
//         if (savedata == false && keyupinput){
//                 e.preventDefault();            
//                 window.cartMergePopup = $('#cart-merge-popup-confirm').bPopup({
//                     speed : 450,
//                     transition : 'slideDown',
//                     modalClose : false
//                 });
//                 $("body").unbind('click').on("click", "#btn-cancel", function() {
//                    window.cartMergePopup.close();
//                 });
                
//                 $("body").on("click", "#btn-yes", function() {
//                     $("#measurement-modal").unbind(e);
//                     window.cartMergePopup.close();   
//                     keyupinput = false;
//                     $('#measurement-modal').modal('hide');
                            
//                 });          
//         }

//     });
    
//     savedata  =false;

// }

// // Update click action
// $(document).on('click', '.measurement-update', function(e) {
//     var action = $(this).attr('href');
//     e.preventDefault();
//     startMainLoader();
//     $.ajax({
//         type: 'get',
//         url: action,
//         dataType: 'json',
//         success: function(data) {
//             $('#measurement-modal').modal({
//                 backdrop: 'static',
//                 keyboard: false
//             });
//             $('#modal-measurement-details').html(data.measurement_form);
//             changeTabStyle(0);
//             scrollToPosition(0);
//         },
//         done: function() {
//             stopMainLoader();
//         },
//         complete: function() {
//             stopMainLoader();
//         },
//         error: function(data) {
//             console.log("Error");
//         }
//     });
// });


// $(document).on('keyup blur','#id_title',function(){
//     titleValidation();
// })
// // Updating measurement text and restricting
// $(document).on('keyup blur', '.req_meas:not(#id_title)', function() {
//     var meas = $(this).val();
//     var keyIndex = $(this).attr('data-key');
//     var unit = $('#unit_name').val();
//     var integerLimit = $('#integer_limit').val();
//     var decimalLimit = $('#decimal_limit').val();
//     // var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
//     var isArabic = /[\u0660-\u0669]/;
//     if (isArabic.test(meas)){
//         if (!isNaN(parseArabic(meas)) && parseArabic(meas) != "" && parseArabic(meas) >= 0) {
//             var limitCheck =  /^[\u0660-\u0669]{1,4}.{0,1}[\u0660-\u0669]{0,2}$/;
//             if(String(meas).match(limitCheck)){
//                 $('#media-' + keyIndex).find('p').text(meas + unit);
//             }
//             else{
//                 $('#media-' + keyIndex).find('p').text("");
//                 $(this).val("");
//             }
            
//         }else{
//             $('#media-' + keyIndex).find('p').text("");
//             $(this).val("");
//         }
//     }
//     else{
//         // Restriction of numeric length and alphabets
//         if (!isNaN(meas) && meas != "" && meas >= 0) {
//             var firstSection = meas.split('.');
//             if(!firstSection[0].match('^[0-9]{1,'+integerLimit+'}$')){
//                 match = meas.match('[0-9]{1,'+integerLimit+'}');
//                 meas = match[0];
//                 $(this).val(meas);
//             }
//             if(!meas.match('^([0-9]{1,'+integerLimit+'}.{0,1}[0-9]{0,'+decimalLimit+'})$')){
//                 match = meas.match('([0-9]{1,'+integerLimit+'})(.{0,1}[0-9]{0,'+decimalLimit+'})');
//                 meas = match[0];
//                 $(this).val(meas);
//             }    

//             $('#media-' + keyIndex).find('p').text(meas + unit);
        
//         } else {
//             $('#media-' + keyIndex).find('p').text("");
//             $(this).val("");
//         }
//     }
    
//     MeasParmamValid(keyIndex,true);
//     changeTabStyle(keyIndex);

// });


// // Measurement Parameter validation
// function allMeasParamSet() {
//     allmeasuremntSet = 1;
//     // var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
//     var isArabic = /[\u0660-\u0669]/;
//     $.each($('.req_meas'), function() {
//         var parentInputDiv = $(this).parents('.form-group');
//         $flag = false;
//         if ($(this).attr('id') != 'id_title') {
//             if (!isArabic.test($(this).val())){
//                 if (isNaN($(this).val())) {
//                     // $(this).val("");
//                     $flag = true;
//                 }
//             }else{
//                 if (isNaN(parseArabic($(this).val()))) {
//                     $flag = true;
//                 }
//             }
            
//         }
//         if ($(this).val() == "" || $flag) {
//             var keyIndex = $(this).attr('data-key');
//             $('#media-' + keyIndex).addClass('error');
//             $(parentInputDiv).addClass('has-error');

//             allmeasuremntSet = 0;
//         }else{
//             var keyIndex = $(this).attr('data-key');
//             $('#media-' + keyIndex).removeClass('error');
//             $(parentInputDiv).removeClass('has-error');
//         }

//     });
//     if (!titleValidation()) {
//         allmeasuremntSet = 0;
//     }
//     if (allmeasuremntSet) {
//         $('.alert-danger').addClass('hidden');

//     } else {
//         $('.alert-danger').removeClass('hidden');
//     }

//     return allmeasuremntSet;
// }
// // Measurement Parameter validation
// var MeasParmamValid = function(limit,current=false) {
//     allmeasuremntSet = 1;
    
    
//     $.each($('.req_meas'), function() {
//         var parentInputDiv = $(this).parents('.form-group');
//         var keyIndex = $(this).attr('data-key');
//         if ($(this).attr('id') == 'id_title' && $(this).val() == "") {
//             $(parentInputDiv).addClass('has-error');
//             allmeasuremntSet = 0;

//         } else {
//             $(parentInputDiv).removeClass('has-error');
//         }
//         $flag = false;
//             if ($(this).attr('id') != 'id_title') {
//                 // var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
//                 var isArabic = /[\u0660-\u0669]/;
//                 if (!isArabic.test($(this).val())){
//                     if (isNaN($(this).val())) {
//                         $flag = true;
//                         // $(this).val("");
//                     }
//                 }else{
//                     if (isNaN(parseArabic($(this).val()))) {
//                         $flag = true;
//                     }
//                 }
                
//             }
//         if(current && parseInt(limit)==parseInt($(this).attr('data-key'))){
         
//             if($(this).val()=="" || $flag){
//                 $('#media-' + keyIndex).addClass('error');
//                 $(parentInputDiv).addClass('has-error');
//                 allmeasuremntSet = 0;
//             }else{
//                 $('#media-' + keyIndex).removeClass('error');
//                 $(parentInputDiv).removeClass('has-error');
//             }
//         }
//         if (parseInt($(this).attr('data-key')) < parseInt(limit)) {
            
//             if ($(this).val() == "" || $flag) {
//                 // if($(this).val() == "" || isNaN($(this).val())) {

//                 $('#media-' + keyIndex).addClass('error');
//                 $(parentInputDiv).addClass('has-error')

//                 allmeasuremntSet = 0;
//             } else {
//                 $('#media-' + keyIndex).removeClass('error');
//                 $(parentInputDiv).removeClass('has-error');
//             }
//         }


//     });
//     if (!titleValidation()) {
//         allmeasuremntSet = 0;
//     }
//     if (allmeasuremntSet) {
//         $('.alert-danger').addClass('hidden');

//     } else {
//         $('.alert-danger').removeClass('hidden');
//     }
//     return allmeasuremntSet;
// }

// // Title validation
// var titleValidation = function() {
//     var flag = 1;
//     if ($('#id_title').val() == "") {
//         $('#id_title').parents('.form-group').addClass('has-error');
//         flag = 0;
//     } else {
//         $('#id_title').parents('.form-group').removeClass('has-error');
//     }
//     return flag;

// }

// // measurement on change method
// $(document).on('change', '#measurement-select', function() {
//     //$("#category-select").on("change", function(){
//     var measurementId = $("#measurement-select").val();
//     var title = $('#id_title').val();
    
//     // startMainLoader();
//     var action = prestashop.urls.base_url + 'en/index.php?controller=measurement&measurement_id='+measurementId+'&from=cartMeasurement';

//     $.ajax({
//         url: action,
//         method: "GET",
//         dataType: "json",
//         success: function(response) {
            
//             $('#modal-measurement-details').html(response.measurement_form);
            
//             // $("#measurement-details").html( response.measurement_form )
//         },
//         done: function() {
//             // stopMainLoader();
//         },
//         complete: function() {
//             // stopMainLoader();
//         },
//         error: function() {
//             // stopMainLoader();
//         }
//     });
// });

// $(document).on('click', '#add-button', function(e) {
//     $(this).prop("disabled",true);
//     $("#measurement-modal input[type=text]").val("");
//     $("#measurement_id").val(0);
//     // $("#details").val("");
//     $("input[id=details]").val("");
//     $("p[id=media-unit]").text("");
//     $('#id_title').show();
//     $('.edit').hide();
// });




// //Save the measurement to DB if no edit done. 
// $(document).on('click', '.save', function(e) {
//     e.preventDefault();
//     var measurementId = $("#measurement-select").val();
//     var measurementTitle = $("#measurement-select option:selected").text();
//     $("#custom_title").text("");
//     $('#custom_attribute').val(136);
//     $("#custom_measurement").val(measurementId);
//     $("#custom_title").text("Measurement : "+measurementTitle);
//     $('#measurement-modal').modal('hide');


// });

// function customModal(url,measurement_id,product_page_product_id) {

//         // startMainLoader();

//         var action = url + '&measurement_id='+measurement_id+'&from=cartMeasurement'+'&product_page_product_id='+product_page_product_id;

//         $.ajax({
//             type: 'get',
//             url: action,
//             dataType: 'json',
//             success: function(data) {
//                 $('#measurement-modal').modal({
//                     backdrop: 'static',
//                     keyboard: false
//                 });
//                 $('#modal-measurement-details').html(data.measurement_form);
//                 changeTabStyle(0);
//                 scrollToPosition(0);
//             },
//             done: function() {
//                 // stopMainLoader();
//             },
//             complete: function() {
//                 // stopMainLoader();
//             },
//             error: function(data) {
//                 console.log(data);
//                 // stopMainLoader();
//             }
//         })    
// }