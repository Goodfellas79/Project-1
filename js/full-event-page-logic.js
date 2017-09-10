//$(document).ready(function() {

var config = {
  apiKey: "AIzaSyAGrEKN1Msn1IQeAs_Ctw4SbM-yX40fGPc",
  authDomain: "findyourjam-2008f.firebaseapp.com",
  databaseURL: "https://findyourjam-2008f.firebaseio.com",
  projectId: "findyourjam-2008f",
  storageBucket: "findyourjam-2008f.appspot.com",
  messagingSenderId: "992674752226"
};

firebase.initializeApp(config);
var database = firebase.database();

//pull current users location
//pull events from firebase based on distance from current users location

 var query = database.ref("events/").orderByKey();
  query.once("value").then(function(snapshot) {
    console.log(snapshot);
    snapshot.forEach(function(childSnapshot) {

      var key = childSnapshot.key;
      var event = childSnapshot.val().title;
      var location = childSnapshot.val().location;
      var date = childSnapshot.val().date;
      var description = childSnapshot.val().description;
      var link = childSnapshot.val().link;
      var user = childSnapshot.val().user;
      var imageSrc = childSnapshot.val().image;

      addEvent(key, imageSrc, event, date, description, location, link);

  });

});

//display events from firebase

var addEvent = function(key,imageSrc, event, date, description, location, link) {
      $("#eventTitle").append("<div class='event-medium-container' id='event-container" + key + "'><img class='event-medium-image' id='event-picture" + key + "' src='" + imageSrc + "'><h3 class='event-medium-title' id='event-title" + key + "'>" + event + "</h3></div>")
      $("#date").append("<div class='event-medium-container' id='event-container" + key + "'><p class='event-medium-date' id='event-date" + key + "'>Date: " + date + "</p></div>");
      $("#location").append("<div class='event-medium-container' id='event-container" + key + "'><p class='event-medium-location' id='event-location" + key + "'>Location: " + location + "</p></div>");
      $("#description").append("<div class='event-medium-container' id='event-container" + key + "'><p class='event-medium-description' id='event-description" + key + "'>Description: " + description + "</p></div>");
      $("#link").append("<div class='event-medium-container' id='event-container" + key + "'><p class='event-medium-link' id='event-link" + key + "'>Check Us Out: " + link +"</p></div>");
      $("#event-container" + key).attr("key", key);

};

$(document.body).on("click", ".event-medium-container", function() {
    var event = $(this).attr("key");
    //window.location.href to push the page or reload html?
    console.log("You clicked on event: " + event);
});

//});