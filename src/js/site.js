$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

$(document).ready(function() {

    // *** Side-nav initialization ***
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

    // *** Sticky Navbar Logic ***
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

    // *** Themify Tool Logic ***
    var themifyToolOnlyOnMain = false;
    if(themifyToolOnlyOnMain)
    {
        $(".themify-tool").hide();
    }

    // *** Themify tool checker function ***
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
        if(themifyToolOnlyOnMain)
        {
            themifyToolChecker();
        }
    });
    $(window).resize(function() {
        navbarInitialOffset = getNavbarOffset();
        stickyNavChecker();
        if(themifyToolOnlyOnMain)
        {
            themifyToolChecker();
        }
    });
})

// *** Themify tool apply function ***
var themifyMe = function(themeName){

    // STEP 2: We are going to regenerate header jumbo background dinamically
    // using the wonderful Trianglify JS library.
    // Only applies for those themes without an specific primary image.
    // var bkgImg = $(".header-jumbo").css("background-image");
    // if( bkgImg == "none")
    // {
        var themifyJumboHeader = function(){
            var hjHeight = $(".header-jumbo").height();
            var hjWidth = $(".header-jumbo").width();
            var pattern = Trianglify({
                height: hjHeight,
                width: hjWidth,
                cell_size: 40
            });
            var patternUrl = "url('" + pattern.png() + "')";
            $(".header-jumbo").css("background-image", patternUrl);
        }();    
    // }   

    // STEP 1: Find and replace all occurences of class "theme-<x>" where
    // x is the name of the theme.  
    $(document).find("[class*='theme-']").attr("class", function(i, cls){
        return cls.replace(/theme-(.*)/, "theme-" + themeName);
    });     

    
}
