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

    // Sticky nav-bar logic as offered by google.
    // ISSUE: It jumps! Not so fine crafted as expected :(
    // var getNavbarOffset = function(){
    //   return $(".nav-sticky").offset().top;
    // }
    // var navbarInitialOffset = getNavbarOffset();
    // $('.nav-sticky').pushpin({
    //   top: navbarInitialOffset,
    //   bottom: Infinity,
    //   offset: 0
    // });

    // Sticky nav-bar logic
    var getNavbarOffset = function(){
      return $(".nav-sticky").offset().top;
    }
    var navbarInitialOffset = getNavbarOffset();
    var navbarHeight = $(".nav-sticky").height();
    var stickyNavChecker = function() {
        var currentScrollTop = $(window).scrollTop();
        if (currentScrollTop > navbarInitialOffset) {
            // Take navbar out from layout to fixed position
            $(".nav-sticky").css({
                'position': 'fixed',
                "top": 0,
                "width": "100%"
            });
            $("main").css("padding-top", navbarHeight);
        } else {
            // Put back navbar into DOM layout
            $(".nav-sticky").css("position", "static");
            $("main").css("padding-top", 0);
        }
    }

    // Themify button initialization
    //$(".themify-tool").hide();

    // Themify button logic
    var themifyToolChecker = function() {
        var currentScrollTop = $(window).scrollTop();
        if (/*(currentScrollTop > (navbarInitialOffset / 3)) &&*/ !$("footer").isInViewport()) {
            $(".themify-tool").show("slow");
        } else {
            $(".themify-tool").hide("slow");
        }
    }

    // Bind checkers to Scroll and Resize
    $(window).scroll(function() {
        stickyNavChecker();
        //themifyToolChecker();
    });
    $(window).resize(function() {
        navbarInitialOffset = getNavbarOffset();
        stickyNavChecker();
        //themifyToolChecker();
    });
})

var themifyMe = function(themeName){
  $(document).find("[class*='theme-']").attr("class", function(i, cls){
    return cls.replace(/theme-(.*)/, "theme-" + themeName);
  });
}
