/**
 * 2015-2021 Bonpresta
 *
 * Bonpresta Instagram Carousel Social Feed Photos
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the General Public License (GPL 2.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/GPL-2.0
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade the module to newer
 * versions in the future.
 *
 *  @author    Bonpresta
 *  @copyright 2015-2021 Bonpresta
 *  @license   http://opensource.org/licenses/GPL-2.0 General Public License (GPL 2.0)
 */

$(document).ready(function () {
    setTimeout(() => {
        setTimeInst();
    }, 200);
    function setTimeInst() {
        $('.instagram-carousel-container').show();
    }
    if (BONINSTAGRAMSLICK_DOTS == 1) {
        var BONINSTAGRAMSLICK_DOTS_SCRIPT = true;
    } else {
        var BONINSTAGRAMSLICK_DOTS_SCRIPT = false;
    }
    if (BONINSTAGRAMSLICK_NAV == 1) {
        var BONINSTAGRAMSLICK_NAV_SCRIPT = true;
    } else {
        var BONINSTAGRAMSLICK_NAV_SCRIPT = false;
    }
    if (BONINSTAGRAMSLICK_LOOP == 1) {
        var BONINSTAGRAMSLICK_LOOP_SCRIPT = true;
    } else {
        var BONINSTAGRAMSLICK_LOOP_SCRIPT = false;
    }
    $('.slick-carousel-instagram').bonslick({
        slidesToShow: BONINSTAGRAMSLICK_NB,
        infinite: BONINSTAGRAMSLICK_LOOP_SCRIPT,
        autoplaySpeed: BONINSTAGRAMSLICK_MARGIN,
        draggable: true,
        dots: BONINSTAGRAMSLICK_DOTS_SCRIPT,
        arrows: BONINSTAGRAMSLICK_NAV_SCRIPT,
        autoplay: true,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 6,
            }

        }, {
            breakpoint: 800,
            settings: {
                slidesToShow: 3,
            }


        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
            }
        }]
    });
    $('.instagram-carousel-container .slick-list').wrap('<div class="slick-list-wrap"></div>');
});