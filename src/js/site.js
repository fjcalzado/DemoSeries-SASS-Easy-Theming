$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

$(document).ready(function() {
    // Side-nav initialization
    $(".button-collapse").sideNav();

    // Themify button initialization
    $(".themify-menu").hide();

    // Sticky nav-bar logic
    var getNavbarOffset = function(){
      return $(".nav-sticky-holder").offset().top;
    }
    var navbarInitialOffset = getNavbarOffset();
    var navbarHeight = $(".nav-sticky-holder").height();
    var stickyNavChecker = function() {
        var currentScrollTop = $(window).scrollTop();
        if (currentScrollTop > navbarInitialOffset) {
            // Take navbar out from layout to fixed position
            $(".nav-sticky-holder").css({
                'position': 'fixed',
                "top": 0,
                "width": "100%"
            });
            $("main").css("padding-top", navbarHeight);
        } else {
            // Put back navbar into DOM layout
            $(".nav-sticky-holder").css("position", "static");
            $("main").css("padding-top", 0);
        }
    }

    // Themify button logic
    var themifyMenuChecker = function() {
        var currentScrollTop = $(window).scrollTop();
        if ((currentScrollTop > (navbarInitialOffset / 3)) && !$("footer").isInViewport()) {
            $(".themify-menu").show("slow");
        } else {
            $(".themify-menu").hide("slow");
        }
    }

    // Bind checkers to Scroll and Resize
    $(window).scroll(function() {
        stickyNavChecker();
        themifyMenuChecker();
    });

    $(window).resize(function() {
        navbarInitialOffset = getNavbarOffset();
        stickyNavChecker();
        themifyMenuChecker();
    });
})
