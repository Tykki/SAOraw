fetch(`https://websrvcs.sa.uic.edu/api/sao/events/form`).then(function (res) {

	return res.json();
}).then(function (data) {

	$.each(data, function(i, v){
        console.log(i, v);
        if (i === "audiences") {
        	for(item of v){
        		fmAud.append(`<option>${item.name}</option>`)
        	}

        }
        if (i === "categories") {
        	for(item of v){
        		fmCat.append(`<option>${item.name}</option>`)
        	}

        }
        if (i === "departments") {
        	for(item of v){
        		fmDep.append(`<option>${item.name}</option>`)
        	}

        }
        if (i === "status") {
        	for(item of v){
        		fmStat.append(`<option>${item.name}</option>`)
        	}

        }
        if (i === "locations") {
        	for(item of v){
        		fmLoc.append(`<option>${item.name}</option>`)
        	}

        }
    })
})

