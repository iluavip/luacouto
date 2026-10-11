/*-----------------------------------------------------------------------------------

    Theme Name: GLOSSY
    Theme URI: http://
    Description:  Beauty Center Template
    Author: gecdesigns    

-----------------------------------------------------------------------------------*/

/*=================================================
 == Table Of Content

    1. PRELOADER
    2. SCROLLIT
    3. NAVBAR    
    4. HOME SLIDER
    5. SCROLL TO TOP 
    6. PORTFOLIO   
    7. OWLCAROUSEL
    8. VALIDATOR

*/

$(function () {
    "use strict";
    var wind = $(window);

    /*============= PRELOADER ============= */
    $(window).on('load', function () {
        $("#loader-wrapper").fadeOut(500);
    });

    /*============= VÍDEO TRIPLO — CARREGAMENTO INTELIGENTE =============
       - Mantém a dessincronização (offsets de tempo) para parecerem 3 vídeos.
       - Pausa os 3 quando o hero sai da tela (economiza CPU/bateria no mobile)
         e retoma quando volta. */
    var bgVideos = [
        { el: document.querySelector(".video-top"), offset: 0 },
        { el: document.querySelector(".video-mid"), offset: 5 },   // começa aos 5s
        { el: document.querySelector(".video-bottom"), offset: 9 } // começa aos 9s (clipe tem ~9,5s)
    ].filter(function (v) { return v.el; });

    if (bgVideos.length) {
        // O autoplay é NATIVO (atributos autoplay/muted/playsinline no HTML e
        // <source media> escolhendo a versão leve no celular). O JS só aplica
        // os offsets e garante a retomada em casos de bloqueio/restauração.
        function tryPlay(v) {
            if (!v.el.paused) { return; }
            var p = v.el.play();
            if (p && p.catch) { p.catch(function () {}); }
        }

        function applyOffset(v) {
            if (!v.offset || v.applied) { return; }
            v.applied = true;
            try { v.el.currentTime = Math.min(v.offset, v.el.duration - 0.2); } catch (e) {}
        }

        bgVideos.forEach(function (v) {
            v.el.muted = true;
            v.el.defaultMuted = true;
            v.el.playsInline = true;
            if (v.el.readyState >= 1) { applyOffset(v); }
            else { v.el.addEventListener("loadedmetadata", function () { applyOffset(v); }, { once: true }); }
            v.el.addEventListener("canplay", function () { tryPlay(v); }, { once: true });
            tryPlay(v);
        });

        function resumeAll() { bgVideos.forEach(tryPlay); }

        // Reabertura do link: o celular pode restaurar a página da memória
        // (bfcache / aba em segundo plano) com os vídeos pausados.
        window.addEventListener("pageshow", resumeAll);
        document.addEventListener("visibilitychange", function () {
            if (document.visibilityState === "visible") { resumeAll(); }
        });
        // Rede de segurança: tenta de novo algumas vezes nos primeiros segundos.
        [500, 1500, 3000].forEach(function (ms) { setTimeout(resumeAll, ms); });

        // Último recurso: primeiro toque/rolagem do usuário.
        var resumeOnGesture = function () {
            resumeAll();
            ["touchstart", "click", "scroll"].forEach(function (evt) {
                window.removeEventListener(evt, resumeOnGesture);
            });
        };
        ["touchstart", "click", "scroll"].forEach(function (evt) {
            window.addEventListener(evt, resumeOnGesture, { passive: true });
        });

        // Pausa quando o hero sai da tela e retoma quando volta.
        var heroArea = document.querySelector(".video-container") || document.querySelector(".home");
        if ("IntersectionObserver" in window && heroArea) {
            var io = new IntersectionObserver(function (entries) {
                var visible = entries[0] && entries[0].isIntersecting;
                bgVideos.forEach(function (v) {
                    if (visible) { tryPlay(v); } else { v.el.pause(); }
                });
            }, { threshold: 0.01 });
            io.observe(heroArea);
        }
    }

    /*============= SCROLLIT ============= */
    $.scrollIt({
        upKey: 38, // key code to navigate to the next section
        downKey: 40, // key code to navigate to the previous section
        easing: 'swing', // the easing function for animation
        scrollTime: 600, // how long (in ms) the animation takes
        activeClass: 'active', // class given to the active nav element
        onPageChange: null, // function(pageIndex) that is called when page is changed
        topOffset: -70 // offste (in px) for fixed top navigation
    });

    /*============= NAVBAR============= */
    function animateMenu() {
        var menu = $('.navbg');
        var nav = $('.navbar-nav');

        if (menu.hasClass('showMenu')) { // Hide menu if it's open
            menu.removeClass('showMenu').addClass('hideMenu');
            nav.removeClass('fadeIn');
            // Remove a visibilidade após a animação
            setTimeout(function() {
                if(menu.hasClass('hideMenu')) {
                    menu.hide();
                }
            }, 500);
        } else { // Show menu
            menu.show();
            menu.removeClass('hideMenu').addClass('showMenu');
            nav.addClass('fadeIn');
        }
    };

    $(document).ready(function () {
        $('.nav-icon').on('click', function () {
            $(this).toggleClass('open');
            animateMenu();
        });
        $('.navbar-nav a').on('click', function () {
            $('.nav-icon').toggleClass('open');
            animateMenu();
        });
    });


/*============= SCROLL TO TOP ============= */
$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('#scroll-to-top').fadeIn();
        } else {
            $('#scroll-to-top').fadeOut();
        }
    });
    // scroll body to 0px on click
    $('#scroll-to-top').click(function () {
        $('#scroll-to-top').tooltip('hide');
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
});

/*===========  PORTFOLIO ===============*/
$(".simplefilter li").on("click", function () {
    $(".simplefilter li").removeClass("active");
    $(this).addClass("active");
});

var filterizd;
$(window).on('load', function () {
    var options = {
        animationDuration: 0.6,
        filter: "all",
        callbacks: {
            onFilteringStart: function () { },
            onFilteringEnd: function () { }
        },
        delay: 0,
        delayMode: "alternate",
        easing: "ease-out",
        layout: "packed",
        selector: ".filtr-container",
        setupControls: true,
        gutterPixels: 0
    };
    
    filterizd = $(".filtr-container").filterizr(options);
    
    // Força um recálculo de layout após um pequeno delay para garantir renderização total
    setTimeout(function() {
        $(window).trigger('resize');
    }, 500);
});

/*========= OWLCAROUSEL =========*/

// Package owlCarousel
//=========================
function package_carousel() {
    var owl = $(".package-carousel");
    owl.owlCarousel({
        loop: true,
        margin: 30,
        responsiveClass: true,
        navigation: true,
        navText: ["<i class='fa fa-arrow-left'></i>", "<i class='fa fa-arrow-right'></i>"],
        nav: true,
        items: 3,
        smartSpeed: 1000,
        dots: false,
        autoplay: true,
        autoplayTimeout: 4000,
        center: false,
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 1
            },
            760: {
                items: 2
            },
            994: {
                items: 3
            }
        }
    });
}
package_carousel();

// Testimonials owlCarousel
//=========================
$('.testimonials .owl-carousel').owlCarousel({
    loop: true,
    items: 1,
    margin: 15,
    mouseDrag: false,
    autoplay: true,
    smartSpeed: 500
});

});