var options_modal_product_page = {
		speed: 300,
		dots: !1,
		infinite: !1,
		slidesToShow: 4,
		slidesToScroll: 1,
		vertical: !0,
		verticalSwiping: !0,
		responsive: [{
			breakpoint: 1200,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			}
		}, {
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			}
		}, {
			breakpoint: 768,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			}
		}, {
			breakpoint: 576,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}, {
			breakpoint: 480,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			}
		}, {
			breakpoint: 400,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}]
	},
	options_quickview = {
		speed: 300,
		dots: !1,
		infinite: !1,
		slidesToShow: 4,
		slidesToScroll: 1,
		vertical: !0,
		verticalSwiping: !0,
		responsive: [{
			breakpoint: 1200,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 1
			}
		}, {
			breakpoint: 992,
			settings: {
				slidesToShow: 5,
				slidesToScroll: 1
			}
		}, {
			breakpoint: 768,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 1
			}
		}, {
			breakpoint: 576,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			}
		}, {
			breakpoint: 480,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			}
		}]
	};

function innitSlickandZoom() {
	$("#main").hasClass("product-image-thumbs") && ($(".product-detail .product-thumb-images").imagesLoaded(function () {
		"undefined" != typeof check_loaded_main_product && clearInterval(check_loaded_main_product), check_loaded_main_product = setInterval(function () {
			0 < $(".product-detail .product-thumb-images").height() && ($(".product-detail .product-thumb-images").fadeIn(), clearInterval(check_loaded_main_product), postion = $("#content").data("templateview"), numberimage = $("#content").data("numberimage"), numberimage1200 = $("#content").data("numberimage1200"), numberimage992 = $("#content").data("numberimage992"), numberimage768 = $("#content").data("numberimage768"), numberimage576 = $("#content").data("numberimage576"), numberimage480 = $("#content").data("numberimage480"), numberimage360 = $("#content").data("numberimage360"), "undefined" !== postion && initSlickProductThumb(postion, numberimage, numberimage1200, numberimage992, numberimage768, numberimage576, numberimage480, numberimage360))
		}, 300)
	}), initSlickProductModal()), applyElevateZoom()
}

function restartElevateZoom() {
	$(".zoomContainer").remove(), applyElevateZoom()
}

function applyElevateZoom() {
	if ($(window).width() <= 991 || "none" == $("#content").data("templatezoomtype")) return $("#main").hasClass("product-image-gallery") ? $("img.js-thumb").data("elevateZoom") && ($("img.js-thumb").data("elevateZoom").changeState("disable"), $("img.js-thumb").unbind("touchmove")) : $("#zoom_product").data("elevateZoom") && ($("#zoom_product").data("elevateZoom").changeState("disable"), $("#zoom_product").unbind("touchmove")), !1;
	var e, t, i, o, a, s = $("#content").data("templatezoomtype"),
		n = !1,
		d = 200,
		l = 200,
		c = 200,
		r = 200,
		u = !1,
		m = 1;
	"in" == s ? (o = "crosshair", l = d = !(a = "inner")) : (o = "default", a = "window", u = !0, $("#content").data("zoomwindowwidth"), $("#content").data("zoomwindowheight"), $("#content").data("lensWidth"), $("#content").data("lensHeight"), "right" == $("#content").data("zoomposition") && (m = 1 == prestashop.language.is_rtl ? 11 : 1), "left" == $("#content").data("zoomposition") && (m = 1 == prestashop.language.is_rtl ? 1 : 11), "top" == $("#content").data("zoomposition") && (m = 13), "bottom" == $("#content").data("zoomposition") && (m = 7), "in_scrooll" == s && (t = (e = window.navigator.userAgent).indexOf("MSIE "), i = e.indexOf("Trident/"), n = !(0 < t || 0 < i))), $("#main").hasClass("product-image-gallery") && (r = c = l = d = !1);
	var p = {
		responsive: !0,
		cursor: o,
		scrollZoom: n,
		scrollZoomIncrement: .1,
		zoomLevel: 1,
		zoomType: a,
		gallery: "thumb-gallery",
		lensFadeIn: d,
		lensFadeOut: l,
		zoomWindowFadeIn: c,
		zoomWindowFadeOut: r,
		zoomWindowWidth: 600,
		zoomWindowHeight: 600,
		lensWidth: 200,
		lensHeight: 200,
		borderColour: "#888",
		borderSize: 2,
		zoomWindowOffetx: 0,
		zoomWindowOffety: 0,
		zoomWindowPosition: m,
		tint: u
	};
	$("#main").hasClass("product-image-gallery") ? ($("img.js-thumb").each(function () {
		var e = $(this).parent();
		$(this).attr("src", e.data("image")), $(this).data("type-zoom", e.data("zoom-image"))
	}), void 0 !== $.fn.elevateZoom && ($("img.js-thumb").elevateZoom(p), $("img.js-thumb").bind("click", function (e) {
		var t = $(this).data("elevateZoom");
		return $.fancybox(t.getGalleryList()), !1
	}))) : void 0 !== $.fn.elevateZoom && ($("#zoom_product").elevateZoom(p), $("#zoom_product").bind("click", function (e) {
		var t = $("#zoom_product").data("elevateZoom");
		return $.fancybox(t.getGalleryList()), !1
	}))
}

function initSlickProductThumb(e, t, i, o, a, s, n, d) {
	var l = !0,
		c = !0,
		r = !1;
	"bottom" == e && (c = l = !1), "none" == e && (c = l = !1, t = i = o = a = s = n = d = 1), l || 1 != prestashop.language.is_rtl || (r = !0);
	var u, m, p, h, g = $("#thumb-gallery");
	g.slick({
		speed: 300,
		dots: !1,
		infinite: !1,
		slidesToShow: t,
		vertical: l,
		verticalSwiping: c,
		slidesToScroll: 1,
		rtl: r,
		responsive: [{
			breakpoint: 1200,
			settings: {
				slidesToShow: i,
				slidesToScroll: 1
			}
		}, {
			breakpoint: 992,
			settings: {
				slidesToShow: o,
				slidesToScroll: 1
			}
		}, {
			breakpoint: 768,
			settings: {
				slidesToShow: a,
				slidesToScroll: 1
			}
		}, {
			breakpoint: 576,
			settings: {
				slidesToShow: s,
				slidesToScroll: 1
			}
		}, {
			breakpoint: 480,
			settings: {
				slidesToShow: n,
				slidesToScroll: 1
			}
		}, {
			breakpoint: 360,
			settings: {
				slidesToShow: d,
				slidesToScroll: 1
			}
		}]
	}), $("#thumb-gallery").show(), "none" == e && (u = g[0], (p = findPosition(m = $(u.slick.$slides))) + 1 == (h = u.slick.slideCount) ? $(".arrows-product-fake .slick-next").addClass("slick-disabled") : 0 == p && $(".arrows-product-fake .slick-prev").addClass("slick-disabled"), g.slick("slickGoTo", p), $(".arrows-product-fake .slick-next").on("click", function () {
		var e;
		$(this).hasClass("slick-disabled") || ($(".arrows-product-fake .slick-prev").removeClass("slick-disabled"), (e = findPosition(m)) + 1 < h && ($(m[e]).removeClass("active"), $(m[e + 1]).addClass("active"), $(m[e + 1]).find("img").trigger("click"), g.slick("slickNext"), e + 1 == h - 1 && $(this).addClass("slick-disabled")))
	}), $(".arrows-product-fake .slick-prev").on("click", function () {
		var e;
		$(this).hasClass("slick-disabled") || ($(".arrows-product-fake .slick-next").removeClass("slick-disabled"), 0 < (e = findPosition(m)) && ($(m[e]).removeClass("active"), $(m[e - 1]).addClass("active"), $(m[e - 1]).find("img").trigger("click"), g.slick("slickPrev"), e - 1 == 0 && $(this).addClass("slick-disabled")))
	}))
}

function findPosition(e) {
	for (var t = 0; t < e.length; t++)
		if ($(e[t]).hasClass("active")) return $(e[t]).data("slick-index")
}

function actionQuickViewLoading() {
	$(".quick-view").click(function () {
		$(this).hasClass("active") || ($(this).addClass("active"), $(this).find(".leo-quickview-bt-loading").css({
			display: "block"
		}), $(this).find(".leo-quickview-bt-content").hide(), "undefined" != typeof check_active_quickview && clearInterval(check_active_quickview), check_active_quickview = setInterval(function () {
			$(".quickview.modal").length && ($(".quickview.modal").on("hide.bs.modal", function (e) {
				$(".quick-view.active").find(".leo-quickview-bt-loading").hide(), $(".quick-view.active").find(".leo-quickview-bt-content").show(), $(".quick-view.active").removeClass("active")
			}), clearInterval(check_active_quickview), initSlickProductQuickView())
		}, 300))
	})
}

function setDefaultListGrid() {
	"grid" == $.cookie(LEO_COOKIE_THEME + "_grid_list") && $(".leo_grid").trigger("click"), "list" == $.cookie(LEO_COOKIE_THEME + "_grid_list") && $(".leo_list").trigger("click")
}

function processFloatHeader(e, t) {
	var i;
	$(".ac_results").length && $(".ac_results").hide(), e ? ($("#header").addClass("navbar-fixed-top"), i = $("#header").height() + 120, $("#page").css("padding-top", $("#header").height()), setTimeout(function () {
		$("#page").css("padding-top", $("#header").height())
	}, 200)) : ($("#header").removeClass("navbar-fixed-top"), $("#page").css("padding-top", ""));
	var o = $(window).scrollTop();
	t && i <= o ? ($(".header-nav").addClass("hide-bar"), $(".hide-bar").css("margin-top", -$(".header-nav").height()), $("#header").addClass("mini-navbar")) : ($(".header-nav").removeClass("hide-bar"), $(".header-nav").css("margin-top", 0), $("#header").removeClass("mini-navbar"))
}

function floatHeader() {
	var e;
	!$("body").hasClass("keep-header") || $(window).width() <= 990 || ($(window).resize(function () {
		$(window).width() <= 990 ? processFloatHeader(0, 0) : 990 < $(window).width() && $("body").hasClass("keep-header") && processFloatHeader(1, 1)
	}), $(window).scroll(function () {
		e && window.clearTimeout(e), e = window.setTimeout(function () {
			$("body").hasClass("keep-header") && 990 < $(window).width() && processFloatHeader(1, 1)
		}, 100)
	}))
}

function backtotop() {
	$("#back-top").hide(), $(window).scroll(function () {
		100 < $(this).scrollTop() ? $("#back-top").fadeIn() : $("#back-top").fadeOut()
	}), $("#back-top a").click(function () {
		return $("body,html").animate({
			scrollTop: 0
		}, 800), !1
	})
}

function initSlickProductQuickView() {
	$(".quickview.modal .product-thumb-images").imagesLoaded(function () {
		"undefined" != typeof check_loaded_thumb_quickview && clearInterval(check_loaded_thumb_quickview), check_loaded_thumb_quickview = setInterval(function () {
			0 < $(".quickview.modal .product-thumb-images").height() && ($(".quickview.modal .product-thumb-images").fadeIn(), clearInterval(check_loaded_thumb_quickview), $(".quickview.modal .product-thumb-images").slick(options_quickview))
		}, 300)
	})
}

function initSlickProductModal() {
	$("#product-modal .product-images").imagesLoaded(function () {
		"undefined" != typeof check_loaded_thumb_modal && clearInterval(check_loaded_thumb_modal), check_loaded_thumb_modal = setInterval(function () {
			0 < $("#product-modal .product-images").height() && ($("#product-modal .product-images").fadeIn(), clearInterval(check_loaded_thumb_modal), $("#product-modal .product-images").slick(options_modal_product_page))
		}, 300)
	})
}
$(window).resize(function () {
	"product" == prestashop.page.page_name && restartElevateZoom(), $("#product-modal .product-images").hasClass("slick-initialized") && 0 == $("#product-modal .product-images").height() && ($("#product-modal .product-images").slick("unslick"), $("#product-modal .product-images").hide(), initSlickProductModal())
}), $(document).ready(function () {
	if (floatHeader(), backtotop(), "product" == prestashop.page.page_name && innitSlickandZoom(), "category" == prestashop.page.page_name && setDefaultListGrid(), "undefined" != typeof products_list_functions)
		for (var e = 0; e < products_list_functions.length; e++) products_list_functions[e]();
	$(".address-item .radio-block").click(function () {
		$(this).parents(".address-item").hasClass("selected") || ($(".address-item.selected").removeClass("selected"), $(this).parents(".address-item").addClass("selected"))
	}), actionQuickViewLoading(), prestashop.on("updateProductList", function () {
		actionQuickViewLoading()
	}), prestashop.on("updatedProduct", function () {
		$(".quickview.modal .product-thumb-images").length ? initSlickProductQuickView() : $(".product-detail .product-thumb-images").length && innitSlickandZoom()
	}), void 0 !== $("#content").data("templatemodal") && ($("#content").data("templatemodal") || $('div[data-target="#product-modal"]').hide()), $(".demo-product-detail a").click(function (e) {
		var t, i, o, a, s;
		$(this).hasClass("updated") || (e.preventDefault(), a = window.location.href, "product" == prestashop.page.page_name && 0 <= a.indexOf(".html") && (i = (t = $(this).attr("href")).indexOf("?layout="), o = t.substring(i), s = (a = a.substring(0, a.indexOf(".html"))) + ".html" + o, window.location.href = s))
	})
}), $(document).on("click", ".leo_grid", function (e) {
	e.preventDefault(), $("#js-product-list .product_list").removeClass("list"), $("#js-product-list .product_list").addClass("grid"), $(this).parent().find(".leo_list").removeClass("selected"), $(this).addClass("selected");
	var t = LEO_COOKIE_THEME + "_grid_list";
	$.cookie(t, "grid", {
		expires: 1,
		path: "/"
	})
}), $(document).on("click", ".leo_list", function (e) {
	e.preventDefault(), $("#js-product-list .product_list").removeClass("grid"), $("#js-product-list .product_list").addClass("list"), $(this).parent().find(".leo_grid").removeClass("selected"), $(this).addClass("selected");
	var t = LEO_COOKIE_THEME + "_grid_list";
	$.cookie(t, "list", {
		expires: 1,
		path: "/"
	})
}), $(document).ready(function () {
	$(".product-flag").removeAttr("style"), prestashop.on("updateProductList", function () {
		$(".product-flag").removeAttr("style")
	})
}), $(document).click(function (e) {
	$(e.target).closest(".group-nav.active-menu").length || $(".group-nav.active-menu").is(":visible") && ($(".showmenu.active").removeClass("active"), $(".group-nav.active-menu").removeClass("active-menu"), $(".bg-over-lay.show-over-lay").removeClass("show-over-lay"))
}), $(document).ready(function () {
	$(".box-video .icon-play").click(function () {
		$.fancybox({
			content: $(".box-video .video").html(),
			afterClose: function (e, t) {}
		})
	})
}), $().ready(function () {
	$("#leo_search_block_top .title_block").click(function () {
		$(this).parent().toggleClass("active")
	}), $(".leo-megamenu .navbar-nav li .caret").click(function () {
		$(this).parent().toggleClass("show")
	})
}), $(function () {
	$(".menu_button").click(function (e) {
		e.stopPropagation(), $("body").hasClass("active-menu") ? $("body").removeClass("active-menu") : $("body").addClass("active-menu")
	})
});
//listen to ajax start event
$( document ).ajaxStart(function() {
  $('.spinner-bg').fadeIn();
});

//listen to ajax complete event
$( document ).ajaxComplete(function() {
  $('.spinner-bg').fadeOut();
});