$(document).ready(function(){
    function resizeCards(){
        $(".home-card").css("height", $(window).height() - 50 + "px")
    }

    var homeMap = {};

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


    $(document).scroll(function(){

        revealAsides();

        renderScrollProgress();
    });

    $(window).resize(function(){
        resizeCards();
        initializeScrollProgress();
        renderScrollProgress();
    });
});

