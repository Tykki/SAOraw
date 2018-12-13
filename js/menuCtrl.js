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
            // console.log(data.target.id)
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
                // console.log(elem.id)
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
                // console.log(elem.id)
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
            // console.log(data.target.id)
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
                    // console.log(data.target.id)
                    ga('send', 'event', 'currated view', 'click', authUser, tracker);
                }
            }
        }
    }

    dynData = true;
};


//--------------End of Nav-Active Logic----------------------------------------------------------------
