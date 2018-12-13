// Below is dev code for the Random User Api for random generation of differnt avatars

// $.ajax({
//   url: 'https://randomuser.me/api/',
//   dataType: 'json',
//   success: function(data) {
//     console.log(data);
//   }
// });

fetch('https://randomuser.me/api/').then((res)=> res.json()).then((data)=>
	$.each(data, function(i,v){ 
		console.log(i,v);
		if (i === "results") {
			// console.log(v[0].picture.thumbnail)
			const avi = v[0].picture.thumbnail;
			$('#avatar').attr('src', avi);
			$('#avatar').show();

		}
	}
		))