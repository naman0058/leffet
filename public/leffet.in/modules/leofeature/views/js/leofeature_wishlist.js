function createLeoWishlistModalPopup() {
    var t = "";
    (t += '<div class="modal leo-modal leo-modal-wishlist fade" tabindex="-1" role="dialog" aria-hidden="true">'),
        (t += '<div class="modal-dialog" role="document">'),
        (t += '<div class="modal-content">'),
        (t += '<div class="modal-header">'),
        (t += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'),
        (t += '<span aria-hidden="true">&times;</span>'),
        (t += "</button>"),
        (t += '<h5 class="modal-title text-xs-center">'),
        (t += "</h5>"),
        (t += "</div>"),
        (t += '<div class="modal-footer">'),
        (t += '<button type="button" class="btn btn-secondary" data-dismiss="modal">' + wishlist_cancel_txt + "</button>"),
        (t += '<button type="button" class="leo-modal-wishlist-bt btn btn-primary">'),
        (t += '<span class="leo-modal-wishlist-loading cssload-speeding-wheel"></span>'),
        (t += '<span class="leo-modal-wishlist-bt-text">'),
        (t += wishlist_ok_txt),
        (t += "</span>"),
        (t += "</button>"),
        (t += "</div>"),
        (t += "</div>"),
        (t += "</div>"),
        (t += "</div>"),
        $("body").append(t);
}
function LeoWishlistButtonAction() {
    $(".leo-wishlist-button").hasClass("show-list")
        ? $(".wishlist-item").click(function () {
            // alert('id')
              if (!$(".wishlist-item.active-add").length) {
                  var e = $(this).data("id-product"),
                      l = $(this).data("id-wishlist"),
                      booking_id = $(this).data("bookingid"),
                      size = $(this).data("sizerequest"),

                     
                      t = $(this).data("id-product-attribute"),
                      a = wishlist_remove + '. <a href="' + wishlist_url + '" target="_blank"><strong>' + wishlist_viewwishlist + ".</strong></a>",
                      o = wishlist_add + '. <a href="' + wishlist_url + '" target="_blank"><strong>' + wishlist_viewwishlist + ".</strong></a>";
                //   alert(e)
                      if (e=='false') return $(".leo-modal-wishlist .modal-title").html(wishlist_loggin_required), $(".leo-modal-wishlist").modal("show"), !1;
                  var d = $(this),
                      n = d.parents(".leo-wishlist-button-dropdown");
                  n.find(".leo-wishlist-button").addClass("active"),
                      n.find(".leo-wishlist-bt-loading").css({ display: "block" }),
                      n.find(".leo-wishlist-bt-content").hide(),
                      $(this).hasClass("added") || $(this).hasClass("delete")
                          ? $.ajax({
                                type: "POST",
                                headers: { "cache-control": "no-cache" },
                                url: '/add-wishlist',
                                async: !0,
                                cache: !1,
                                data: { ajax: 1, action: "remove", id_product: e, id_wishlist: l, id_product_attribute: t, quantity: 1, token: leo_token , booking_id :booking_id , size:size },
                                success: function (t) {
                                    var s,
                                        i = $.parseJSON(t);
                                    i.errors.length
                                        ? ($(".leo-modal-wishlist .modal-title").html(i.errors), $(".leo-modal-wishlist").modal("show"))
                                        : ($(".ap-btn-wishlist .ap-total-wishlist").length &&
                                              ((s = parseInt($(".ap-btn-wishlist .ap-total-wishlist").data("wishlist-total")) - 1),
                                              $(".ap-btn-wishlist .ap-total-wishlist").data("wishlist-total", s),
                                              $(".ap-btn-wishlist .ap-total-wishlist").text(s)),
                                          d.hasClass("delete")
                                              ? $("td.product-" + e).fadeOut(function () {
                                                    $(this).remove();
                                                })
                                              : ($(".leo-modal-wishlist .modal-title").html(a),
                                                $(".leo-modal-wishlist").modal("show"),
                                                $(".wishlist-item[data-id-wishlist=" + l + "][data-id-product=" + e + "]").removeClass("added"),
                                                $(".wishlist-item[data-id-wishlist=" + l + "][data-id-product=" + e + "]").attr("title", buttonwishlist_title_add),
                                                $(".wishlist-item[data-id-product=" + e + "]").hasClass("added") || $(".leo-wishlist-button[data-id-product=" + e + "]").removeClass("added"),
                                                n.find(".leo-wishlist-bt-loading").hide(),
                                                n.find(".leo-wishlist-bt-content").show(),
                                                n.find(".leo-wishlist-button").removeClass("active")));
                                },
                                error: function (t, s, i) {
                                    alert("TECHNICAL ERROR: \n\nDetails:\nError thrown: " + t + "\nText status: " + s);
                                },
                            })
                          : $.ajax({
                                type: "POST",
                                headers: { "cache-control": "no-cache" },
                                url: '/add_wishlist',
                                async: !0,
                                cache: !1,
                                data: { wishlistid: l , size:size , booking_id:booking_id  },
                                success: function (t) {
                                   console.log(t)
                                    var s,
                                        i = t;
                                    i
                                        ? ($(".leo-modal-wishlist .modal-title").html(i.msg), $(".leo-modal-wishlist").modal("show"))
                                        : ($(".leo-modal-wishlist .modal-title").html(o),
                                          $(".leo-modal-wishlist").modal("show"),
                                          $(".ap-btn-wishlist .ap-total-wishlist").length &&
                                              ((s = parseInt($(".ap-btn-wishlist .ap-total-wishlist").data("wishlist-total")) + 1),
                                              $(".ap-btn-wishlist .ap-total-wishlist").data("wishlist-total", s),
                                              $(".ap-btn-wishlist .ap-total-wishlist").text(s)),
                                          $(".wishlist-item[data-id-wishlist=" + l + "][data-id-product=" + e + "]").addClass("added"),
                                          $(".wishlist-item[data-id-wishlist=" + l + "][data-id-product=" + e + "]").attr("title", buttonwishlist_title_remove),
                                          $(".leo-wishlist-button[data-id-product=" + e + "]").hasClass("added") || $(".leo-wishlist-button[data-id-product=" + e + "]").addClass("added"),
                                          n.find(".leo-wishlist-bt-loading").hide(),
                                          n.find(".leo-wishlist-bt-content").show(),
                                          n.find(".leo-wishlist-button").removeClass("active"));
                                },
                                error: function (t, s, i) {
                                    alert("TECHNICAL ERROR: \n\nDetails:\nError thrown: " + t + "\nText status: " + s);
                                },
                            });
              }
              return !1;
          })
        : $(".leo-wishlist-button").click(function () {
              if (!$(".leo-wishlist-button.active").length) {
                  var e = $(this).data("id-product"),
                      l = $(this).data("id-wishlist"),
                      t = $(this).data("id-product-attribute"),
                      s = $("#custom_measurement").val(),
                      a = wishlist_remove + '. <a href="' + wishlist_url + '" target="_blank"><strong>' + wishlist_viewwishlist + ".</strong></a>",
                      o = wishlist_add + '. <a href="' + wishlist_url + '" target="_blank"><strong>' + wishlist_viewwishlist + ".</strong></a>";
                  if ((console.log(s), $(this).addClass("active"), !isLogged)) return $(".leo-modal-wishlist .modal-title").html(wishlist_loggin_required), $(".leo-modal-wishlist").modal("show"), !1;
                  var d = $(this);
                  d.find(".leo-wishlist-bt-loading").css({ display: "block" }),
                      d.find(".leo-wishlist-bt-content").hide(),
                       $(this).hasClass("delete")
                          ? $.ajax({
                                type: "POST",
                                headers: { "cache-control": "no-cache" },
                                url: wishlist_url + "?rand=" + new Date().getTime(),
                                async: !0,
                                cache: !1,
                                data: { ajax: 1, action: "remove", id_product: e, id_wishlist: l, id_product_attribute: t, quantity: 1, token: leo_token },
                                success: function (t) {
                                    var s,
                                        i = $.parseJSON(t);
                                    i.errors.length
                                        ? ($(".leo-modal-wishlist .modal-title").html(i.errors), $(".leo-modal-wishlist").modal("show"))
                                        : ($(".ap-btn-wishlist .ap-total-wishlist").length &&
                                              ((s = parseInt($(".ap-btn-wishlist .ap-total-wishlist").data("wishlist-total")) - 1),
                                              $(".ap-btn-wishlist .ap-total-wishlist").data("wishlist-total", s),
                                              $(".ap-btn-wishlist .ap-total-wishlist").text(s)),
                                          d.hasClass("delete")
                                              ? $("td.product-" + e).fadeOut(function () {
                                                    $(this).remove();
                                                })
                                              : ($(".leo-modal-wishlist .modal-title").html(a),
                                                $(".leo-modal-wishlist").modal("show"),
                                                $(".leo-wishlist-button[data-id-product=" + e + "]").removeClass("added"),
                                                $(".leo-wishlist-button[data-id-product=" + e + "]").attr("title", buttonwishlist_title_add),
                                                d.find(".leo-wishlist-bt-loading").hide(),
                                                d.find(".leo-wishlist-bt-content").show()));
                                },
                                error: function (t, s, i) {
                                    alert("TECHNICAL ERROR: \n\nDetails:\nError thrown: " + t + "\nText status: " + s);
                                },
                            })
                          : $.ajax({
                                type: "POST",
                                headers: { "cache-control": "no-cache" },
                                url: wishlist_url + "?rand=" + new Date().getTime(),
                                async: !0,
                                cache: !1,
                                data: { ajax: 1, action: "add", id_product: e, id_wishlist: l, id_product_attribute: t, quantity: 1, id_customer_measurement: s, token: leo_token },
                                success: function (t) {
                                    var s,
                                        i = $.parseJSON(t);
                                    i.errors.length
                                        ? ($(".leo-modal-wishlist .modal-title").html(i.errors),d.find(".leo-wishlist-bt-loading").hide(),
                                          d.find(".leo-wishlist-bt-content").show(), $(".leo-modal-wishlist").modal("show"))
                                        : ($(".leo-modal-wishlist .modal-title").html(o),
                                          $(".leo-modal-wishlist").modal("show"),
                                          $(".ap-btn-wishlist .ap-total-wishlist").length &&
                                              ((s = parseInt($(".ap-btn-wishlist .ap-total-wishlist").data("wishlist-total")) + 1),
                                              $(".ap-btn-wishlist .ap-total-wishlist").data("wishlist-total", s),
                                              $(".ap-btn-wishlist .ap-total-wishlist").text(s)),
                                          "" == l && $(".leo-wishlist-button").data("id-wishlist", i.result.id_wishlist),
                                          $(".leo-wishlist-button[data-id-product=" + e + "]").addClass("added"),
                                          $(".leo-wishlist-button[data-id-product=" + e + "]").attr("title", buttonwishlist_title_remove),
                                          d.find(".leo-wishlist-bt-loading").hide(),
                                          d.find(".leo-wishlist-bt-content").show());
                                },
                                error: function (t, s, i) {
                                    alert("TECHNICAL ERROR: \n\nDetails:\nError thrown: " + t + "\nText status: " + s);
                                },
                            });
              }
              return !1;
          });
}
function LeoListWishlistAction() {
    $(".delete-wishlist").click(function () {
        return (
            $(this).hasClass("active") ||
                ($(this).addClass("active"),
                $(this).parents("tr").addClass("active"),
                $(".list-wishlist tr.active .default-wishlist").is(":checked")
                    ? ($(".leo-modal-wishlist .modal-title").html(wishlist_del_default_txt), $(".leo-modal-wishlist").removeClass("enable-action").modal("show"))
                    : ($(".leo-modal-wishlist .modal-title").html(wishlist_confirm_del_txt), $(".leo-modal-wishlist").addClass("enable-action").modal("show"))),
            !1
        );
    }),
        $(".leo-modal-wishlist-bt").click(function () {
            var e, t;
            $(this).hasClass("active") ||
                ($(this).addClass("active"),
                (e = $(this)),
                (t = $(".delete-wishlist.active").data("id-wishlist")),
                $(".leo-modal-wishlist-bt-text").hide(),
                $(".leo-modal-wishlist-loading").css({ display: "block" }),
                $.ajax({
                    type: "POST",
                    headers: { "cache-control": "no-cache" },
                    url: '/delete-wishlist',
                    async: !0,
                    cache: !1,
                    data: {  id: t },
                    success: function (t) {
                        window.location.href = '/wishlist'
                    },
                    error: function (t, s, i) {
                        alert("TECHNICAL ERROR: \n\nDetails:\nError thrown: " + t + "\nText status: " + s);
                    },
                }));
        }),
        $(".default-wishlist").click(function () {
            var i, t;
            return (
                $(this).is(":checked") &&
                    ($(".default-wishlist.active").length ||
                        ($(this).addClass("active"),
                        (i = $(this)),
                        (t = $(".default-wishlist.active").data("id-wishlist")),
                        $.ajax({
                            type: "POST",
                            headers: { "cache-control": "no-cache" },
                            url: wishlist_url + "?rand=" + new Date().getTime(),
                            async: !0,
                            cache: !1,
                            data: { ajax: 1, action: "default-wishlist", id_wishlist: t, token: leo_token },
                            success: function (t) {
                                var s = $.parseJSON(t);
                                s.errors.length
                                    ? ($(".leo-modal-wishlist .modal-title").html(s.errors), $(".leo-modal-wishlist").removeClass("enable-action").modal("show"))
                                    : ($(".default-wishlist:checked").removeAttr("checked"), i.prop("checked", !0)),
                                    i.removeClass("active");
                            },
                            error: function (t, s, i) {
                                alert("TECHNICAL ERROR: \n\nDetails:\nError thrown: " + t + "\nText status: " + s);
                            },
                        }))),
                !1
            );
        }),
        $(".view-wishlist-product").click(function () {
            var i, e;
            return (
                $(".view-wishlist-product.active").length ||
                    ($(this).addClass("active"),
                    $(this).next(".leo-view-wishlist-product-loading").show(),
                    $(".list-wishlist tr.show").removeClass("show"),
                    $(this).parents("tr").addClass("show"),
                    (i = $(this)),
                    (e = $(this).data("id-wishlist")),
                    $.ajax({
                        type: "POST",
                        headers: { "cache-control": "no-cache" },
                        url: wishlist_url + "?rand=" + new Date().getTime(),
                        async: !0,
                        cache: !1,
                        data: { ajax: 1, action: "show-wishlist-product", id_wishlist: e, token: leo_token },
                        success: function (t) {
                            var s = $.parseJSON(t);
                            s.errors.length
                                ? ($(".leo-modal-wishlist .modal-title").html(s.errors), $(".leo-modal-wishlist").removeClass("enable-action").modal("show"))
                                : ($(".leo-wishlist-product").hide(),
                                  $(".leo-wishlist-product").html(s.result.html).fadeIn(),
                                  s.result.show_send_wishlist
                                      ? ($(".send-wishlist").fadeIn(),
                                        $(".leo-modal-send-wishlist").length ? $(".leo-modal-reset-send-wishlist-bt").trigger("click") : (createLeoSendWishlistModalPopup(), LeoListWishlistProductModalAction()),
                                        LeoListWishlistProductAction())
                                      : $(".send-wishlist").hide(),
                                  refeshWishlist(e)),
                                i.removeClass("active"),
                                i.next(".leo-view-wishlist-product-loading").hide();
                        },
                        error: function (t, s, i) {
                            alert("TECHNICAL ERROR: \n\nDetails:\nError thrown: " + t + "\nText status: " + s);
                        },
                    })),
                !1
            );
        });
}
function LeoListWishlistProductModalAction() {
    $(".leo-send-wishlist-button").click(function () {
        var t = $(".list-wishlist tr.show .view-wishlist-product").data("name-wishlist");
        return $(".leo-modal-send-wishlist .modal-title").html(wishlist_send_wishlist_txt + ' "' + t + '"'), $(".leo-modal-send-wishlist").modal("show"), !1;
    }),
        $(".leo-modal-send-wishlist").submit(function () {
            if ($(".leo-fake-send-wishlist-button").hasClass("validate-ok")) return !1;
        }),
        $(".leo-modal-send-wishlist-bt").click(function () {
            var i, e, t, a;
            $(this).hasClass("active") ||
                ((i = !0),
                (e = []),
                $(this).addClass("active"),
                (t = $(this)),
                $(".leo-modal-reset-send-wishlist-bt").fadeOut(),
                $(".wishlist_email").each(function (t, s) {
                    "" === $(this).val() ||
                        $(this).parents(".form-group").hasClass("has-success") ||
                        $(this).parents(".form-group").hasClass("has-warning") ||
                        (validateEmail($(this).val()) ? ($(this).parents(".form-group").removeClass("leo-has-error"), e.push(t)) : ($(this).parents(".form-group").addClass("leo-has-error"), (i = !1)));
                }),
                i
                    ? (0 == e.length
                          ? ($(".wishlist_email").each(function (t, s) {
                                if ("" == $(this).val()) return $(this).parents(".form-group").addClass("leo-has-error"), $(this).attr("required", ""), !1;
                            }),
                            t.removeClass("active"),
                            $(".leo-modal-reset-send-wishlist-bt").fadeIn())
                          : ($(".leo-fake-send-wishlist-button").addClass("validate-ok"),
                            (a = $(".list-wishlist tr.show .view-wishlist-product").data("id-wishlist")),
                            $(".leo-modal-send-wishlist-bt-text").hide(),
                            $(".leo-modal-send-wishlist-loading").css({ display: "block" }),
                            $.each(e, function (t, s) {
                                var i = s + 1,
                                    e = $("#wishlist_email_" + i).val(),
                                    l = $("#wishlist_email_" + i).parents(".form-group");
                                l.find(".wishlist_email_status_loading").show(),
                                    $.ajax({
                                        type: "POST",
                                        headers: { "cache-control": "no-cache" },
                                        url: wishlist_url + "?rand=" + new Date().getTime(),
                                        async: !0,
                                        cache: !1,
                                        data: { ajax: 1, action: "send-wishlist", id_wishlist: a, email: e, token: leo_token },
                                        success: function (t) {
                                            l.find(".wishlist_email_status_loading").hide(),
                                                $.parseJSON(t).errors.length ? l.addClass("has-warning").find(".send_wishlist_error").fadeIn() : l.addClass("has-success").find(".send_wishlist_success").fadeIn();
                                        },
                                        error: function (t, s, i) {
                                            alert("TECHNICAL ERROR: \n\nDetails:\nError thrown: " + t + "\nText status: " + s);
                                        },
                                    });
                            }),
                            $(document).ajaxStop(function () {
                                $(".leo-modal-send-wishlist-loading").hide(),
                                    $(".leo-modal-send-wishlist-bt-text").show(),
                                    $(".leo-fake-send-wishlist-button").removeClass("validate-ok"),
                                    t.removeClass("active"),
                                    $(".leo-modal-reset-send-wishlist-bt").fadeIn();
                            })),
                      $(".form-send-wishlist .form-group.leo-has-error").length && $(".leo-fake-send-wishlist-button").trigger("click"))
                    : (t.removeClass("active"), $(".leo-modal-reset-send-wishlist-bt").fadeIn(), $(".leo-fake-send-wishlist-button").trigger("click")));
        }),
        $(".leo-modal-reset-send-wishlist-bt").click(function () {
            $(".wishlist_email").val("").removeAttr("required"),
                $(".send_wishlist_form_content .form-group").removeClass("leo-has-error has-success has-warning"),
                $(".wishlist_email_status_loading").fadeOut(),
                $(".send_wishlist_msg").fadeOut();
        });
}
function LeoListWishlistProductAction() {
    $(".leo-wishlist-button-delete").click(function () {
        var i, e, t, l;
        return (
            $(this).hasClass("active") ||
                ($(this).addClass("active"),
                (i = $(this)),
                (e = i.parents(".leo-wishlist-product")),
                (t = $(this).data("id-wishlist-product")),
                (l = $(this).data("id-wishlist")),
                $.ajax({
                    type: "POST",
                    headers: { "cache-control": "no-cache" },
                    url: wishlist_url + "?rand=" + new Date().getTime(),
                    async: !0,
                    cache: !1,
                    data: { ajax: 1, action: "delete-wishlist-product", id_wishlist: l, id_wishlist_product: t, token: leo_token },
                    success: function (t) {
                        var s = $.parseJSON(t);
                        s.errors.length
                            ? ($(".leo-modal-wishlist .modal-title").html(s.errors), $(".leo-modal-wishlist").removeClass("enable-action").modal("show"))
                            : (i.parents(".leo-wishlistproduct-item").fadeOut(function () {
                                  $(this).remove(), e.find(".leo-wishlistproduct-item").length || ($(".send-wishlist").hide(), $(".list-wishlist tr.show .view-wishlist-product").trigger("click"));
                              }),
                              refeshWishlist(l)),
                            i.removeClass("active");
                    },
                    error: function (t, s, i) {
                        alert("TECHNICAL ERROR: \n\nDetails:\nError thrown: " + t + "\nText status: " + s);
                    },
                })),
            !1
        );
    }),
        $(".leo-wishlist-product-save-button").click(function () {
            var i, e, l, t, s;
            return (
                $(this).hasClass("active") ||
                    ($(this).addClass("active"),
                    (i = $(this)),
                    (e = $(this).data("id-wishlist-product")),
                    (l = $(this).data("id-wishlist")),
                    (t = $(".wishlist-product-quantity-" + e).val()),
                    (s = $(".wishlist-product-priority-" + e).val()),
                    Math.floor(t) == t && $.isNumeric(t) && 0 < t
                        ? ($(".wishlist-product-quantity-" + e)
                              .parents(".form-group")
                              .removeClass("has-error"),
                          $.ajax({
                              type: "POST",
                              headers: { "cache-control": "no-cache" },
                              url: wishlist_url + "?rand=" + new Date().getTime(),
                              async: !0,
                              cache: !1,
                              data: { ajax: 1, action: "update-wishlist-product", id_wishlist: l, id_wishlist_product: e, quantity: t, priority: s, token: leo_token },
                              success: function (t) {
                                  var s = $.parseJSON(t);
                                  s.errors.length
                                      ? ($(".leo-modal-wishlist .modal-title").html(s.errors), $(".leo-modal-wishlist").removeClass("enable-action").modal("show"))
                                      : ($(".leo-wishlistproduct-item-" + e).hide(), $(".leo-wishlistproduct-item-" + e).fadeIn(), refeshWishlist(l)),
                                      i.removeClass("active");
                              },
                              error: function (t, s, i) {
                                  alert("TECHNICAL ERROR: \n\nDetails:\nError thrown: " + t + "\nText status: " + s);
                              },
                          }))
                        : ($(".wishlist-product-quantity-" + e)
                              .parents(".form-group")
                              .addClass("has-error"),
                          $(".leo-modal-wishlist .modal-title").html(wishlist_quantity_required),
                          $(".leo-modal-wishlist").removeClass("enable-action").modal("show"),
                          i.removeClass("active"))),
                !1
            );
        }),
        $(".move-wishlist-item").click(function () {
            var i, e, t, s, l, a, o, d, n;
            return (
                $(this).hasClass("active") ||
                    ($(this).addClass("active"),
                    (i = $(this)),
                    (e = i.parents(".leo-wishlist-product")),
                    (t = $(this).data("id-wishlist-product")),
                    (s = $(this).data("id-product")),
                    (l = $(this).data("id-product-attribute")),
                    (a = $(".list-wishlist tr.show .view-wishlist-product").data("id-wishlist")),
                    (o = $(this).data("id-wishlist")),
                    (d = $(".wishlist-product-priority-" + t).val()),
                    (n = $(".wishlist-product-quantity-" + t).val()),
                    $.ajax({
                        type: "POST",
                        headers: { "cache-control": "no-cache" },
                        url: wishlist_url + "?rand=" + new Date().getTime(),
                        async: !0,
                        cache: !1,
                        data: { ajax: 1, action: "move-wishlist-product", id_new_wishlist: o, id_wishlist_product: t, id_old_wishlist: a, id_product: s, id_product_attribute: l, quantity: n, priority: d, token: leo_token },
                        success: function (t) {
                            var s = $.parseJSON(t);
                            s.errors.length
                                ? ($(".leo-modal-wishlist .modal-title").html(s.errors), $(".leo-modal-wishlist").removeClass("enable-action").modal("show"))
                                : (i.parents(".leo-wishlistproduct-item").fadeOut(function () {
                                      $(this).remove(), e.find(".leo-wishlistproduct-item").length || ($(".send-wishlist").hide(), $(".list-wishlist tr.show .view-wishlist-product").trigger("click"));
                                  }),
                                  refeshWishlist(o),
                                  refeshWishlist(a)),
                                i.removeClass("active");
                        },
                        error: function (t, s, i) {
                            alert("TECHNICAL ERROR: \n\nDetails:\nError thrown: " + t + "\nText status: " + s);
                        },
                    })),
                !1
            );
        });
}
function activeEventModalWishlist() {
    $(".leo-modal-wishlist").on("hide.bs.modal", function (t) {
        resetButtonAction();
    }),
        $(".leo-modal-wishlist").on("hidden.bs.modal", function (t) {
            $("body").css("padding-right", "");
        }),
        $(".leo-modal-wishlist").on("show.bs.modal", function (t) {
            $(".quickview.modal").length && $(".quickview.modal").modal("hide");
        });
}
function resetButtonAction() {
    $(".leo-wishlist-button.active").length && $(".leo-wishlist-button.active").removeClass("active"),
        $(".wishlist-item.active-add").length && $(".wishlist-item.active-add").removeClass("active-add"),
        $(".default-wishlist.active").removeClass("active"),
        $(".delete-wishlist.active").removeClass("active"),
        $(".list-wishlist tr.active").removeClass("active");
}
function createLeoSendWishlistModalPopup() {
    var t = "";
    (t += '<div class="modal leo-modal leo-modal-send-wishlist fade" tabindex="-1" role="dialog" aria-hidden="true">'),
        (t += '<div class="modal-dialog" role="document">'),
        (t += '<div class="modal-content">'),
        (t += '<div class="modal-header">'),
        (t += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'),
        (t += '<span aria-hidden="true">&times;</span>'),
        (t += "</button>"),
        (t += '<h5 class="modal-title text-xs-center">'),
        (t += "</h5>"),
        (t += "</div>"),
        (t += '<div class="modal-body">'),
        (t += '<div class="send_wishlist_form_content">'),
        (t += '<form class="form-send-wishlist" action="#" method="post">');
    for (var s = 1; s <= 10; s++)
        (t += '<div class="form-group row">'),
            (t += '<label class="col-form-label col-sm-2 text-sm-left" for="wishlist_email_' + s + '">' + wishlist_email_txt + " " + s + "</label>"),
            (t += '<div class="wishlist_email_status col-sm-1">'),
            (t += '<div class="wishlist_email_status_loading cssload-speeding-wheel">'),
            (t += "</div>"),
            (t += '<i class="send_wishlist_msg send_wishlist_success material-icons">&#xE876;</i>'),
            (t += '<i class="send_wishlist_msg send_wishlist_error material-icons">&#xE033;</i>'),
            (t += "</div>"),
            (t += '<div class="col-sm-9">'),
            (t += '<input class="form-control wishlist_email" id="wishlist_email_' + s + '" name="wishlist_email_' + s + '" type="email">'),
            (t += "</div>"),
            (t += "</div>");
    (t += '<button class="btn btn-primary form-control-submit leo-fake-send-wishlist-button pull-xs-right" type="submit"></button>'),
        (t += "</form>"),
        (t += "</div>"),
        (t += "</div>"),
        (t += '<div class="modal-footer">'),
        (t += '<button type="button" class="btn btn-primary leo-modal-reset-send-wishlist-bt">' + wishlist_reset_txt + "</button>"),
        (t += '<button type="button" class="btn btn-secondary" data-dismiss="modal">' + wishlist_cancel_txt + "</button>"),
        (t += '<button type="button" class="leo-modal-send-wishlist-bt btn btn-primary">'),
        (t += '<span class="leo-modal-send-wishlist-loading cssload-speeding-wheel"></span>'),
        (t += '<span class="leo-modal-send-wishlist-bt-text">'),
        (t += wishlist_send_txt),
        (t += "</span>"),
        (t += "</button>"),
        (t += "</div>"),
        (t += "</div>"),
        (t += "</div>"),
        (t += "</div>"),
        $("body").append(t);
}
function validateEmail(t) {
    return /^[a-z\p{L}0-9!#$%&'*+\/=?^`{}|~_-]+[.a-z\p{L}0-9!#$%&'*+\/=?^`{}|~_-]*@[a-z\p{L}0-9]+[._a-z\p{L}0-9-]*\.[a-z\p{L}0-9]+$/i.test(t);
}
function refeshWishlist(i) {
    $(".leo-view-wishlist-product-loading-" + i).show(),
        $.ajax({
            type: "POST",
            headers: { "cache-control": "no-cache" },
            url: wishlist_url + "?rand=" + new Date().getTime(),
            async: !0,
            cache: !1,
            data: { ajax: 1, action: "get-wishlist-info", id_wishlist: i, token: leo_token },
            success: function (t) {
                var s = $.parseJSON(t);
                s.errors.length ? ($(".leo-modal-wishlist .modal-title").html(s.errors), $(".leo-modal-wishlist").removeClass("enable-action").modal("show")) : $(".wishlist-numberproduct-" + i).html(s.result.number_product),
                    $(".leo-view-wishlist-product-loading-" + i).hide();
            },
            error: function (t, s, i) {
                alert("TECHNICAL ERROR: \n\nDetails:\nError thrown: " + t + "\nText status: " + s);
            },
        });
}
$(document).ready(function () {
 $('.wishlist-quantity-spin').TouchSpin({
                                verticalbuttons: !0,
                                verticalupclass: "material-icons touchspin-up",
                                verticaldownclass: "material-icons touchspin-down",
                                buttondown_class: "btn btn-touchspin js-touchspin",
                                buttonup_class: "btn btn-touchspin js-touchspin",
                                min: 1,
                                max: 1e6,
                            });
    createLeoWishlistModalPopup(),
        LeoWishlistButtonAction(),
        prestashop.on("updateProductList", function () {
            LeoWishlistButtonAction();
        }),
        prestashop.on("updatedProduct", function () {
            LeoWishlistButtonAction();
        }),
        prestashop.on("clickQuickView", function () {
            check_active_wishlist = setInterval(function () {
                $(".quickview.modal").length &&
                    ($(".quickview.modal").on("shown.bs.modal", function (t) {
                        LeoWishlistButtonAction();
                    }),
                    clearInterval(check_active_wishlist));
            }, 300);
        }),
        activeEventModalWishlist(),
        LeoListWishlistAction(),
        $(".leo-save-wishlist-bt").click(function () {
            var t, i;
            return (
                $(this).hasClass("active") ||
                    ($(this).addClass("active"),
                    $(".new-wishlist .has-danger .form-control-feedback").html(""),
                    $(".new-wishlist .has-success .form-control-feedback").html(""),
                    (t = $.trim($("#wishlist_name").val()))
                        ? ((i = $(this)),
                          $("#wishlist_name").parent().removeClass("has-error"),
                          $(".leo-save-wishlist-bt-text").hide(),
                          $(".leo-save-wishlist-loading").css({ display: "block" }),
                          $.ajax({
                              type: "POST",
                              headers: { "cache-control": "no-cache" },
                              url: '/s',
                              async: !0,
                              cache: !1,
                              data: {  name: t },
                              success: function (t) {
                                  window.location.href = '/wishlist'
                              },
                              error: function (t, s, i) {
                                  alert("TECHNICAL ERROR: \n\nDetails:\nError thrown: " + t + "\nText status: " + s);
                              },
                          }))
                        : ($("#wishlist_name").parent().addClass("has-error"), $(this).removeClass("active"))),
                !1
            );
        });
});
