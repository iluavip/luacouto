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
    /*============= UPDATE IMPACT STATS ============= */
    function updateImpactStats() {
        fetch('stats.json')
            .then(response => response.json())
            .then(data => {
                const elements = {
                    'users': data.users,
                    'views': data.views,
                    'engagement': data.engagement
                };

                // Atualiza os textos com animação simples
                if (document.querySelector('#impact h3')) {
                    document.querySelectorAll('.impact-card h3').forEach((el, index) => {
                        const keys = ['users', 'views', 'engagement'];
                        const value = elements[keys[index]];
                        el.innerText = (keys[index] === 'engagement') ? value : '+' + parseInt(value).toLocaleString('pt-BR');
                    });
                }
            })
            .catch(err => console.error('Erro ao carregar estatísticas:', err));
    }

    $(document).ready(function () {
        updateImpactStats();
        // ... rest of ready function
    });

    /*============= DESSINCRONIZAÇÃO DO VÍDEO TRIPLO ============= */
    var vTop = document.querySelector(".video-top");
    var vMid = document.querySelector(".video-mid");
    var vBottom = document.querySelector(".video-bottom");

    if (vTop && vMid && vBottom) {
        // Define tempos de início diferentes para parecerem vídeos distintos
        vMid.currentTime = 5;    // Começa aos 5 segundos
        vBottom.currentTime = 10; // Começa aos 10 segundos

        // Garante que todos comecem a rodar
        vTop.play();
        vMid.play();
        vBottom.play();
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
    gutterPixels: 0 // Garante alinhamento perfeito com o grid
}
var filterizd = $(".filtr-container").filterizr(options);
filterizd.filterizr("setOptions", options);

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