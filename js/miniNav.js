// Logic for toggling Icon Nav
// Note: media queries from the SAO.css file also works into this logic, please check
// css file also if changes made here bring unexpected effects.
// From SAO.css: @media (max-width: 767px) {#toggle-wrap{display: none;}
// From SAO.css: @media (min-width: 768px) {#toggle-wrap{display: block;}


$('#toggle-wrap').on('click', function() {

    // on click of the toggle, hide all text in the navbar and give class active to toggle
    // Note: Active actually refers to when sideNav is being hidden,
    // not when it is being displayed.
    $(this).toggleClass('active');
    $('li strong').hide();
    $('span.arrow').hide();
    // $('.brand strong').hide();
    // $('.brand i').toggle();
    if (!$('#toggle-wrap').hasClass('active')){
        // When toggle does not have 'active' class:
        // Nav width  will transition 300px from the 50px of the iconNav.
        // The displayed content (what is held in .rCol) will also adjust with Nav.
        // The arrow rotation of 180 degs is removed and menu style is reset from 'display: block'
        // Note: 'ul.sub-menu' having style display block comes from the natural way jQuery
        // displays and hides conent, at 'display: block', the ul content will never close.

        $('nav.nav-side-menu').animate({width: '300px'}, 500, ()=>{
            $('li strong').show();
            $('span.arrow').show();
            $('.brand strong').show();
            $('ul.sub-menu').attr('style', '');
        });
        $('#header').animate({width: '-=250px'}, 500, ()=>{
            $('#header').width('calc(100% - 300px)');
        });
        $('#display').animate({width: '-=250px'}, 500, ()=>{
            $('#display').width('calc(100% - 300px)');
        });
        $('#footer').animate({width: '-=250px'}, 500, ()=>{
            $('#footer').width('calc(100% - 300px)');
        });
        // $('.rCol').animate({left: '0'}, 500);
        $('#toggle-wrap').removeClass('fa-rotate-180');
        $('#avatar').animate({left: '+=125px'}, 500) 
    }
    else{
        // When '#toggle-wrap.active = true':
        // Nav width will transition to 50px, for Icon Nav.
        // Displayed content will adjust to screen real-estate also.
        // arrow is rotated 180 degs and hide all the Second lvl nav

        $('nav.nav-side-menu').animate({width: '50px'}, 500);
        $('#header').animate({width: '+=250px'}, 500, ()=>{
            $('#header').width('calc(100% - 50px)');
        });
        $('#display').animate({width: '+=250px'}, "slow", ()=>{
            $('#display').width('calc(100% - 50px)');
        });
        $('#footer').animate({width: '+=250px'}, 500, ()=>{
            $('#footer').width('calc(100% - 50px)');
        });
        $('#avatar').animate({left: '-=125px'}, 450);

        // $('.rCol').animate({left: '-250px'}, 600);
        $('#toggle-wrap').addClass('fa-rotate-180');
        $('ul.sub-menu').hide();
    }

});

$('#avatar').on('click', function(){
    // Add event listener on menu items so that items will also toggle icon menu
    if ($('#toggle-wrap').hasClass('active')){
        // When toggle has 'active' class:
        // Nav width  will transition 300px from the 50px of the iconNav.
        // The displayed content (what is held in .rCol) will also adjust with Nav.
        // The arrow rotation of 180 degs is removed and menu style is reset from 'display: block'
        // Note: 'ul.sub-menu' having style display block comes from the natural way jQuery
        // displays and hides conent, at 'display: block', the ul content will never close.

        $('#toggle-wrap').removeClass('active');
        $('nav.nav-side-menu').animate({width: '300px'}, 500, function(){
            $('li strong').show();
            $('span.arrow').show();
            // $('.brand strong').show();
            $('ul.sub-menu').attr('style', '');
        });
        $('#header').animate({width: '-=250px'}, 500, ()=>{
            $('#header').width('calc(100% - 300px)');
        });
        $('#display').animate({width: '-=250px'}, 500, ()=>{
            $('#display').width('calc(100% - 300px)');
        });
        $('#footer').animate({width: '-=250px'}, 500, ()=>{
            $('#footer').width('calc(100% - 300px)');
        });
        $('#avatar').animate({left: '+=125px'}, 500);

        $('#toggle-wrap').removeClass('fa-rotate-180');
    }
});


$('#menu-content').on('click', function(){
    // Add event listener on menu items so that items will also toggle icon menu
    if ($('#toggle-wrap').hasClass('active')){
        // When toggle has 'active' class:
        // Nav width  will transition 300px from the 50px of the iconNav.
        // The displayed content (what is held in .rCol) will also adjust with Nav.
        // The arrow rotation of 180 degs is removed and menu style is reset from 'display: block'
        // Note: 'ul.sub-menu' having style display block comes from the natural way jQuery
        // displays and hides conent, at 'display: block', the ul content will never close.

        $('#toggle-wrap').removeClass('active');
        $('nav.nav-side-menu').animate({width: '300px'}, 500, function(){
            $('li strong').show();
            $('span.arrow').show();
            // $('.brand strong').show();
            $('ul.sub-menu').attr('style', '');
        });
        $('#header').animate({width: '-=250px'}, 500, ()=>{
            $('#header').width('calc(100% - 300px)');
        });
        $('#display').animate({width: '-=250px'}, 500, ()=>{
            $('#display').width('calc(100% - 300px)');
        });
        $('#footer').animate({width: '-=250px'}, 500, ()=>{
            $('#footer').width('calc(100% - 300px)');
        });
        $('#avatar').animate({left: '+=125px'}, 500);

        $('#toggle-wrap').removeClass('fa-rotate-180');
    }
});

// There is an uncommon UI error that occurs due to transitions:
// If IconNav is toggled in a desktop view, when trying to view application
// in mobile views later the css does not respond properly.
// Case 1: the nav will stay at width 300px when the viewport is decreaed from 767px
// this gives an akward navagation.
// Case 2: If IconNav is 'active', resizing to a viewport for mobile views will cause
// Nav to be unviewable.


$(window).resize(() => {
    // When window is resized to meet the breakpoint of the media query, forcably
    // change the width to 100%, else have it set to the initial 300px

    // Case 1 fix
    if($(window).width() <= 767){
        //the equals is important! without the '=' at 767px the screen breaks
        // with both css styles trying to be prevalent.
    $('nav.nav-side-menu').css('width', '100%');
    $('#display').width('');
    // if($('#toggle-wrap.active')){
    //     $('#toggle-wrap').removeClass('active');

    // }
}
    if($(window).width() > 767){
            $('nav.nav-side-menu').css('width', '300px');
        // if($('#toggle-wrap')){
        //     }

        }
    // $('#display').width('calc(100% - 300px)');

})

//-------------------End of IconNav Logic-------------------------------------------------------------
