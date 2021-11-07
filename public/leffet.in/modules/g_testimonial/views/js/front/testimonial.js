/**

* This is main js file. Don't edit the file if you want to update module in future.

* 

* @author    Globo Software Solution JSC <contact@globosoftware.net>

* @copyright 2017 Globo ., Jsc

* @license   please read license in file license.txt

* @link      http://www.globosoftware.net

*/



$(window).load(function() {

    if ($('.g-recaptcha').length > 0) {

        var script = document.createElement("script");

        script.src = "https://www.google.com/recaptcha/api.js?onload=CaptchaCallback&render=explicit";

        script.type = "text/javascript";

        document.getElementsByTagName("head")[0].appendChild(script);

    }

});

function validateT_isUrl(s) {

    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/

    return regexp.test(s);

}

var CaptchaCallback = function() {

    $('.g-recaptcha').each(function(index, el) {

        grecaptcha.render(this, { 'sitekey': $(this).data('sitekey') });

    });

};

function validate_testimonial_field(that)

{

    result = true;

    if ($(that).hasClass('is_required') && $(that).val().length < 1) {

        result = false;

    }

    if (result && $(that).hasClass('validatefield'))

    {

        if (!$(that).hasClass('is_required') && $(that).val().length == 0) {

            return true;

        }

        validateField = ['isUnsignedInt', 'isUrl', 'isName', 'isGenericName', 'isAddress', 'isPostCode', 'isCityName', 'isMessage', 'isPhoneNumber', 'isDniLite', 'isEmail', 'isPasswd'];

        datavalidate = $(that).attr('data-validate');

        if (datavalidate == 'isString')

        {

            datavalidate = 'isMessage';

        }

        if ($.inArray(datavalidate, validateField) < 0) {

            return result;

        }

        if (datavalidate == 'isPostCode')

        {

            var selector = '#id_country';

            if ($(that).attr('name') == 'postcode_invoice')

                selector += '_invoice';

            var id_country = $(selector + ' option:selected').val();

            if (typeof(countriesNeedZipCode[id_country]) != 'undefined' && typeof(countries[id_country]) != 'undefined')

                result = window['validate_' + datavalidate]($(that).val(), countriesNeedZipCode[id_country], countries[id_country]['iso_code']);

        } else if (datavalidate) {

            if (datavalidate == 'isUrl') {

                result = validateT_isUrl($(that).val());

            } else if (datavalidate == 'isUnsignedInt') {

                if (isNaN($(that).val() / 1)) {

                    result = false;

                } else result = true;

            } else

            if (typeof window['validate_' + datavalidate] !== "undefined") {

                result = window['validate_' + datavalidate]($(that).val());

            }

        }

    }

    if (result)

        $(that).parent().removeClass('form-error').addClass('form-ok');

    else

        $(that).parent().addClass('form-error').removeClass('form-ok');

    return result;

}

$(document).ready(function() {

    form_overlay = '<div id="form_overlay"><div class="container"><div class="content"><div class="circle"></div></div></div></div></div>';

    if ($('#addnewTestimonial').length > 0)

        $('#addnewTestimonial').fancybox();

    $(document).on('click', '#submitTestimonial', function() {

        _result = true;

        $('#formSubmitTestimonial input.is_required,#formSubmitTestimonial textarea.is_required,#formSubmitTestimonial input.validatefield,#formSubmitTestimonial  textarea.validatefield').each(function() {

            if (_result) {

                _result = validate_testimonial_field($(this));

            } else {

                validate_testimonial_field($(this));

            }

        });

        console.debug(_result);

        if (_result) {

            var formsubmit = $('#formSubmitTestimonial');

            var formURL = formsubmit.attr("action");

            $(form_overlay).appendTo(formsubmit);

            if (window.FormData !== undefined) {

                var formData = new FormData($('#formSubmitTestimonial')[0]);

                $.ajax({

                    url: formURL,

                    type: 'POST',

                    data: formData,

                    mimeType: "multipart/form-data",

                    contentType: false,

                    cache: false,

                    processData: false,

                    success: function(data, textStatus, jqXHR) {

                        formsubmit.find('#form_overlay').remove();

                        var result = $.parseJSON(data);

                        if (result.error != '1') {

                            $.fancybox.close();

                            if ($('#testimonial_for_order').length > 0) $('#testimonial_for_order').remove();

                            $('#submit_testimonial_result').html(result.message);

                        } else {

                            $('#submit_testimonial_result_error').html(result.message);

                            setTimeout(function() {

                                $('#submit_testimonial_result_error > div').stop(true, true).slideUp(500);

                            }, 4000);

                        }

                        if (typeof grecaptcha != "undefined") {

                            grecaptcha.reset();

                        }

                    },

                    error: function(jqXHR, textStatus, errorThrown) {

                        if (typeof grecaptcha != "undefined") {

                            grecaptcha.reset();

                        }

                        var err = eval("(" + jqXHR.responseText + ")");

                        alert(err.Message);



                    }

                });

            } else return true;

        } else

            return false;

        return false;

    });

    if ($('#testimonial_for_order').length > 0) $('#addnewTestimonial').click();

    if ($('.testimonial_item_wpslider').length > 0) {

        $('.testimonial_item_wpslider').each(function() {

            id = $(this).attr('rel');

            iteminline = $(this).data('iteminline');

            $('#testimonial_item_wpslider_' + id).owlCarousel({

                margin: 10,


                loop: false,

                autoplay: true,
                items: 1,
                singleItem: true,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                    },
                    576: {
                        items: 1,
                    },
                    768: {
                        items: 1,
                    },
                    1050: {
                        items: 1,

                    },
                    1400: {
                        items: 1,
                    }
                }

            })

        });

    }

    //$('.testimonial_rating_input .testimonial_star').live('click',function(){

    $(document).on('click', '.testimonial_rating_input .testimonial_star', function() {

        rel = $(this).attr('rel');

        $('.testimonial_rating_input #rating').val(rel);

        $('.testimonial_rating_input').attr('id', 'testimonial_rating_input_' + rel);

    });

    $('.testimonial_block_left_side .anchor_bt').click(function() {

        if ($(this).parent('.testimonial_box_wp').hasClass('active')) {

            width = $(this).parent('.testimonial_box_wp').css('width');

            $(this).parent('.testimonial_box_wp').removeClass('active').css('left', 30 - parseInt(width));

        } else {

            $(this).parent('.testimonial_box_wp').addClass('active').css('left', 0);

        }

    });

    $('.testimonial_block_right_side .anchor_bt').click(function() {

        if ($(this).parent('.testimonial_box_wp').hasClass('active')) {

            width = $(this).parent('.testimonial_box_wp').css('width');

            $(this).parent('.testimonial_box_wp').removeClass('active').css('right', 30 - parseInt(width));

        } else {

            $(this).parent('.testimonial_box_wp').addClass('active').css('right', 0);

        }

    });

})