function activeStar() {
    $("input.star").rating({
        cancel: cancel_rating_txt
    }), $(".auto-submit-star").rating({
        cancel: cancel_rating_txt
    })
}

function activeEventModalReview() {
    $(".form-new-review").submit(function() {
        if ($(".new_review_form_content .form-group.leo-has-error").length || $(".leo-fake-button").hasClass("validate-ok")) return !1
    }), $(".leo-modal-review").on("show.bs.modal", function(e) {
        $(".leo-modal-review-bt").click(function() {
            $(this).hasClass("active") || ($(this).addClass("active"), $(".leo-modal-review-bt-text").hide(), $(".leo-modal-review-loading").css({
                display: "block"
            }), $(".new_review_form_content input, .new_review_form_content textarea").each(function() {
                "" == $(this).val() ? ($(this).parent(".form-group").addClass("leo-has-error"), $(this).attr("required", "")) : ($(this).parent(".form-group").removeClass("leo-has-error"), $(this).removeAttr("required"))
            }), $(".new_review_form_content .form-group.leo-has-error").length ? ($(this).removeClass("active"), $(".leo-modal-review-bt-text").show(), $(".leo-modal-review-loading").hide()) : ($(".leo-fake-button").addClass("validate-ok"), $.ajax({
                type: "POST",
                headers: {
                    "cache-control": "no-cache"
                },
                url: prestashop.urls.base_url + "modules/leofeature/psajax_review.php?action=add-new-review&token=" + leo_token + "&rand=" + (new Date).getTime(),
                async: !0,
                cache: !1,
                data: $(".new_review_form_content input, .new_review_form_content textarea").serialize(),
                success: function(e) {
                    var o;
                    "" != e ? (o = $.parseJSON(e), $(".leo-modal-review-bt").fadeOut("slow", function() {
                        $(this).remove()
                    }), $(".leo-modal-review .modal-body>.row").fadeOut("slow", function() {
                        $(this).remove(), o.result ? $(".leo-modal-review .modal-body").append('<div class="form-group has-success"><label class="form-control-label">' + o.sucess_mess + "</label></div>") : $.each(o.errors, function(e, o) {
                            $(".leo-modal-review .modal-body").append('<div class="form-group has-danger text-center"><label class="form-control-label">' + o + "</label></div>")
                        })
                    })) : alert(review_error)
                },
                error: function(e, o, r) {
                    alert("TECHNICAL ERROR: \n\nDetails:\nError thrown: " + e + "\nText status: " + o), window.location.replace($(".open-review-form").data("product-link"))
                }
            })), $(".leo-fake-button").trigger("click"))
        })
    }), $(".leo-modal-review").on("hide.bs.modal", function(e) {
        $(".leo-modal-review-bt").length || $(".leo-modal-review .modal-body .disable-form-review").length || location.reload()
    })
}
$(document).ready(function() {
    var e, o;
    $(".open-review-form").length && (e = $(".open-review-form").data("id-product"), o = $(".open-review-form").data("is-logged"), $.ajax({
        type: "POST",
        headers: {
            "cache-control": "no-cache"
        },
        url: prestashop.urls.base_url + "modules/leofeature/psajax_review.php?rand=" + (new Date).getTime(),
        async: !0,
        cache: !1,
        data: {
            action: "render-modal-review",
            id_product: e,
            is_logged: o,
            token: leo_token
        },
        success: function(e) {
            "" != e ? ($("body").append(e), activeEventModalReview(), activeStar(), $(".open-review-form").fadeIn("fast")) : alert(review_error)
        },
        error: function(e, o, r) {}
    }), $(".open-review-form").click(function() {
        alert('hi')
        return $("#criterions_list").length || $(".leo-modal-review .modal-body .disable-form-review").length || ($(".leo-modal-review-bt").remove(), $(".leo-modal-review .modal-header").remove(), $(".leo-modal-review .modal-body").empty(), $(".leo-modal-review .modal-body").append('<div class="form-group disable-form-review has-danger text-center"><label class="form-control-label">' + disable_review_form_txt + "</label></div>")), $(".leo-modal-review").modal("show"), !1
    })), $(".read-review").click(function() {
        var e;
        return $(".leo-product-show-review-title").length && ($(".leo-product-show-review-title").hasClass("leofeature-accordion") ? ($(".leo-product-show-review-title").hasClass("collapsed") && $(".leo-product-show-review-title").trigger("click"), e = setInterval(function() {
            ($("#collapseleofeatureproductreview").hasClass("collapse in") || $("#collapsereviews").hasClass("collapse in")) && ($("html, body").animate({
                scrollTop: $(".leo-product-show-review-title").offset().top
            }, 500), clearInterval(e))
        }, 200)) : ($(".leo-product-show-review-title").trigger("click"), $("html, body").animate({
            scrollTop: $(".leo-product-show-review-title").offset().top
        }, 500))), !1
    }), $(".usefulness_btn").click(function() {
        var e, o, r;
        $(this).hasClass("disabled") || ($(this).addClass("active"), $(this).parents(".review_button").find(".usefulness_btn").addClass("disabled"), e = $(this).data("id-product-review"), o = $(this).data("is-usefull"), r = $(this).parent(), $.ajax({
            type: "POST",
            headers: {
                "cache-control": "no-cache"
            },
            url: prestashop.urls.base_url + "modules/leofeature/psajax_review.php?rand=" + (new Date).getTime(),
            async: !0,
            cache: !1,
            data: {
                action: "add-review-usefull",
                id_product_review: e,
                is_usefull: o,
                token: leo_token
            },
            success: function(e) {
                "" != e ? r.fadeOut(function() {
                    r.remove()
                }) : alert(review_error)
            },
            error: function(e, o, r) {
                alert("TECHNICAL ERROR: \n\nDetails:\nError thrown: " + e + "\nText status: " + o)
            }
        }))
    }), $(".report_btn").click(function() {
        var o, e;
        return $(this).hasClass("disabled") || ($(this).addClass("disabled"), o = $(this), e = $(this).data("id-product-review"), $.ajax({
            type: "POST",
            headers: {
                "cache-control": "no-cache"
            },
            url: prestashop.urls.base_url + "modules/leofeature/psajax_review.php?rand=" + (new Date).getTime(),
            async: !0,
            cache: !1,
            data: {
                action: "add-review-report",
                id_product_review: e,
                token: leo_token
            },
            success: function(e) {
                "" != e ? o.fadeOut(function() {
                    o.remove()
                }) : alert(review_error)
            },
            error: function(e, o, r) {
                alert("TECHNICAL ERROR: \n\nDetails:\nError thrown: " + e + "\nText status: " + o)
            }
        })), !1
    }), activeStar()
});