// Below is the core workings of the Application, Please do not alter without being
// sure of proper exicutions.

// Using the fetch api to handle the async call to api and return a promised data
// Data is 'then' returned as json though another promise

fetch(`https://websrvcs.sa.uic.edu/api/sao/user/${authUser}`, {headers:{'Authorization': 'supersecret'}}).then(function (res) {
    // Uncomment to view promised returned in the console
	// console.log(res);

	return res.json();
}).then(function (data) {
    // 'then' promised json data will be looped through to find the proper key/vals to set
	// uncomment console.log(data) line below to see the api data object being sent in full
    // uncomment console.log(i, v) line below to see the api data objext data in organized format
    
    // console.log(data);

	$.each(data, function(i, v){
        // console.log(i, v);
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
                    // console.log(t)
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
