$(document).ready(function(){
    function resizeCards(){
        $(".home-card").css("height", $(window).height() - 50 + "px")
    }

    var homeMap = {};

    function debounce(fn, delay) {
        var timer = null;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        };
    }

    var winHeight = $(window).height(), 
    docHeight = $(document).height(),
    progressBar = $('progress'),
    max, value;

    /* Set the max scrollable area */
    function initializeScrollProgress(){
        max = docHeight - winHeight;
        progressBar.attr('max', max);
    }

    initializeScrollProgress();
    progressBar.attr('value', 0);

    /* Render scrollbar */
    function renderScrollProgress(){
        value = $(window).scrollTop();
        progressBar.attr('value', value);
    }

    /* Initialize hidden asides. */
    function initializeAsides(){
        $('aside').fadeTo( 1000, 0 );
    }

    initializeAsides();

    /* fade in asides when visible */
    function revealAsides(){
        $('aside:in-viewport').fadeTo( 1500, 1 );
    }

    resizeCards();

    // ONLY for projects with significant Pym.js assets:
    //   A special second progress initialize and render
    //   3.5 sec after document ready,
    //   hopefully after they've loaded in.
    setTimeout(function(){
        console.log("active.");
        winHeight = $(window).height(); 
        docHeight = $(document).height();
        // initializeScrollProgress();
        // renderScrollProgress();
    }, 3500);

    // $(document).scroll(function(){
    //     revealAsides();

    //     renderScrollProgress();
    // });

    $(window).resize(function(){
            resizeCards();
            initializeScrollProgress();
            // renderScrollProgress();
    });
});

