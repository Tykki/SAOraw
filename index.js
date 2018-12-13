// Variables List,
// Please include all variables that will be used in this list below for easy references
// Please note the authUser is the endpoint to recieve the student netID and start the api call


const fName = $('#fName');
const lName = $('#lName');
const email = $('#email');
const rGroup = $('#rGroup');
const rName = $('#rName');
const rLink = $('#rLink');
const authUser = "ccunni3";
const lvl1 = [];
const lvl2 = [];
const opts = $('.blink');
let dynData = false; 
let lvlC;
let tracker;

//---------------End of Variables----------------------------------------------------------------


// Below is the core workings of the Application, Please do not alter without being
// sure of proper exicutions.

// Using the fetch api to handle the async call to api and return a promised data
// Data is 'then' returned as json though another promise

fetch(`http://10.55.121.84/api/sao/user/${authUser}`).then(function (res) {
    // Uncomment to view promised returned in the console
	// console.log(res);

	return res.json();
}).then(function (data) {
    // 'then' promised json data will be looped through to find the proper key/vals to set
	// uncomment console.log(data) line below to see the api data object being sent in full
    // uncomment console.log(i, v) line below to see the api data objext data in organized format
    
    // console.log(data);

	$.each(data, function(i, v){
        console.log(i, v);
        if (i === "givenName") {
            fName.text(v);
        }
        if (i === "surname") {
            lName.text(v);
        }
        if (i === "email") {
          email.text(v);
        }
        // if (i === "department") {
        // dName.text(v);
        // }

        if (i === "resourceGroups") {
            // When the resource Groups are found, delete the placeholders due to having content now.
           
            rGroup.remove();
            $('#ResourseGroup').remove();

            for (i = 0; i < v.length; i++){
                // When the resource Groups are found, loop through the array length to track and
                // create the amount of First lvl li tags needed for user. Uncomment the consol.log(i)
                // to view how many times the loop will iterate due to resourse Group length.

                
                // console.log(i);
                    let t = 0;
                

                $('.prof').before(`<li id="rG${i}" data-toggle="collapse" data-target="#Gr${i}" class="collapsed">
                <a href="#"><i class="${v[i].icon}"></i> <strong id="rN${i}"> ${v[i].name}</strong> <span class="arrow"></span></a></li><ul class="sub-menu collapse" id="Gr${i}"></ul>`);
                for(resource of v[i].resources){
                    console.log(t)
                    // After a resource group li has been created from code above, populate it's corrisponding ul tag resources
                    // by looping through the given resources and creating dynamic html.
                    // Uncomment console.log() below to view the name of the resource with the group number
                    
                    // console.log(i, resource.name);
                    $(`#Gr${i}`).append(`<li><a id=r${t} href="${resource.url}" target="_blank">${resource.name}</a></li>`);
                    t++;
                }
            }
        }
    });
});
//-------------------------End of AJAX and dynamic html setup---------------------------------------------------------

// Logic for the navbar features: active highlights on dynamic html, close other ul except
// active li>ul
// *lvl indicate the first and second lvl of navagation

// DOM properties must be used to gain access to dynamic HTML.

document.querySelector('#menu-content').onclick = function(data){

    if (dynData === false){
        // To make sure data is notchanged on every click event,
        // the vars dymData is checked to establish first click and the
        // gathering of data that is then stored into appropreate vars

        lvlC = $('.sub-menu.collapse');
        // lvlC is set using jQuery to target the dynamic HTML created
        // by the resource lists provided. Uncomment the lines below to
        // see that jQuery can access dynamic HTML within a DOM property.
        // Also the data from the nav that will be split into vars

        // console.log(lvlC)
        // console.log(data)
        // console.log(data.currentTarget.children)
        for (child of data.currentTarget.children){
            // Loop through the array of children objects held by the 'CurrentTarget',
            // which is #menu-content, even though within data it seems null in the 
            // console.log. Uncomment line below to view all the children of #menu-content
            
            // console.log(child);
            if (child.tagName === 'LI'){
                // if the child has a tag of li, place it in the lvl1 var
                // uncomment below to see the elements of First level of Nav

                // console.log(child.firstElementChild)
                // console.log(child)
                lvl1.push(child);
            }
            if (child.tagName === 'UL'){
                // if the child has a tag of ul, place it in the lvl2 var
                // uncomment line below to see the elements of Second level of Nav

                // console.log(child.children)
                lvl2.push(child.children);
            }
        }
    
        // the following if and for loop end the dynData check for first click,
        // this if loop below handles click events made to li elements, the for loop 
        // handles click events made to the 'a' element within the li element

        if (lvl1.includes(data.target)){
            // if the first click target is apart of the lvl1 elements, remove active
            // class from other base-links and set to target.
            // uncomment line below to view the class names of element before the addition
            // of active class

            // console.log(data.target.className)
            opts.removeClass('active');
            data.target.className += ' active';
            // tracker = `rG0 ${data.target.id}`;
            console.log(data.target.id)
        }

        for (elem of lvl1){
            // loop through lvl1 to access each li element as its own obj,
            // uncomment the lines below to see the values of the elem in lvl1
            // and target of data match at the 'a' tag that holds the text and icons

            // console.log(data.target.parentElement)
            // console.log(elem.firstElementChild);
            if (elem.firstElementChild === data.target.parentElement){
                // if the element of lvl1 has a first child ('a' tag) that is equal to
                // the parent element of the data target ('a' tag), remove active class
                // from other first lvl elements and apply active class to element
                // uncomment line below to see class name before the addition of active

                // console.log(data.target.className)
                opts.removeClass('active');
                elem.className += ' active';
                // tracker = `rG0 ${elem.id}`;
                console.log(elem.id)
            }
        }
    }

    // logic for all other clicks outside of first click begins here, dynData is set
    // <----------------to true at the end of if block below.------------------>

    if (dynData === true){
        // if first click has been made and dynamic HTML data has been collected.

        for (elem of lvl1){
            // loop through lvl elements and remove active class from all elements

            elem.className -= 'active';
            if (elem.firstElementChild === data.target.parentElement){
                // same catch used above for targeting elements inside of of parent li tags
                // Close other items and reomve active class.
                // Add active class to matching element
                
                lvlC.collapse('hide');
                opts.removeClass('active');
                elem.className += ' active';
                console.log(elem.id)
            }
        }
        if (lvl1.includes(data.target)){
            // same if loop used for fist click.
            // Close other items and reomve active class.
            // remove active class from all element
            // Set active to data target that matches lvl1 element

            lvlC.collapse('hide');
            opts.removeClass('active');
            for (element of lvl1){
                // same if loop used for fist click.

                if (element.className.includes('active')){
                    // if active already set on other element, remove it.
                    element.className = element.className - "active";
                }
           }
            data.target.className += ' active';
            console.log(data.target.id)
        }

        // <------------logic for lvl2 starts here-------------->

        for (let i = 0; i < lvl2.length; i++){
            // loop through lvl2 var due to not being able to use properties on
            // multi-level arrays
            
            for (element of lvl2[i]){
                // access lvl2 elements indiviually and set class name to nothing 
                // to clear active class from other elements
                // uncomment line below to view elements with class names.

                // console.log(element)
                element.className = '';
                // console.log(element.firstElementChild)
                if ((element === data.target)||(element.firstElementChild === data.target)){
                    // if the element of lvl2 or the 'a' tag of the
                    // element is equal to the data target, set class of element to active
                    // set the class of the holding collapsable li tag to active also.
                    // remove active class from base-links

                    // console.log(data);
                    for (items of lvl1){
                        if (items.className.includes('active')){
                            // check if items in lvl1 have an active class and remove it
                            items.className = items.className - "active";
                        }
                    }

                    element.className = 'active';
                    element.parentElement.previousSibling.className += " active";
                    opts.removeClass('active');
                    tracker = `${element.parentElement.previousSibling.id} ${element.firstElementChild.id}`;
                    element.firstElementChild.click();
                    console.log(data.target.id)
                    ga('send', 'event', 'currated view', 'click', authUser, tracker);
                }
            }
        }
    }

    dynData = true;
};


//--------------End of Nav-Active Logic----------------------------------------------------------------




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
    $('.brand strong').hide();
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
        // $('.rCol').animate({left: '-250px'}, 600);
        $('#toggle-wrap').addClass('fa-rotate-180');
        $('ul.sub-menu').hide();
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
