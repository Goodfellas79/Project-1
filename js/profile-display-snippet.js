var query = database.ref("users/" + localStorage.getItem(userKey));
  query.once("value").then(function(snapshot) {
  	
  	$("#name-profile").text(snapshot.name);
  	$("#genre-profile").text(snapshot.genre);
  	$("#homeCity-profile").text(snapshot.aboutYou);
  	$("#aboutYou-profile").text(snapshot.homeCity);
  	$("#links-profile").text(snapshot.links);
  	$("#song1-profile").text(snapshot.song1);
  	$("#song2-profile").text(snapshot.song2);
  	$("#song3-profile").text(snapshot.song3);
  	$("#band1-profile").text(snapshot.band1);
  	$("#band2-profile").text(snapshot.band2);
  	$("#band3-profile").text(snapshot.band3);
  });
