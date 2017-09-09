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

var keyArray = [];
var distArray = [];
var sorted;

console.log("Distance Array: " + distArray);
console.log("Key Array: " + keyArray);

var query = database.ref("events/").orderByKey();
  query.once("value").then(function(snapshot) {
    //console.log(snapshot);
    snapshot.forEach(function(childSnapshot) {

      var key = childSnapshot.key;
      var eventLon = childSnapshot.val().eventLon;
      var eventLat = childSnapshot.val().eventLat;
      var userLon = localStorage.getItem("userLon");
      var userLat = localStorage.getItem("userLat");

      var eventDistance = distance(userLon, userLat ,eventLon, eventLat); 
            
      keyArray.push(key);

  });

});

//display events from firebase db
var addEvent = function(key,imageSrc, event, date, description, location, link) {
  $("#event").append("<div class='row event-medium-container' id='event-container" + key + "'><div class='col-xs-12'><h3 class='event-medium-title' id='event-title" + key + "'>" + event + "</h3></div><div class='col-xs-2'><img class='event-medium-image' id='event-picture" + key + "' src='" + imageSrc + "'></div><div class='col-xs-8'><p class='event-medium-description' id='event-description" + key + "'>Description: " + description + "</p><p class='event-medium-date' id='event-date" + key + "'>Date: " + date + "</p><br><p class='event-medium-location' id='event-location" + key + "'>Location: " + location + "</p><br><a href='" + link + "' class='event-medium-link' id='event-link" + key + "'>Check Us Out</a></div></div>");

  $("#event-container" + key).attr("key", key);

};

var loadSortedEvents = function() {
  for (var i = 0; i < keyArray.length; i++) {
    var query = database.ref("events/" + keyArray[i]);
      query.once("value").then(function(snapshot) {

        var event = snapshot.val().title;
        var location = snapshot.val().location;
        var date = snapshot.val().date;
        var description = snapshot.val().description;
        var link = snapshot.val().link;
        var user = snapshot.val().user;
        var imageSrc = snapshot.val().imageSRC;

        addEvent(keyArray[i], imageSrc, event, date, description, location, link);

      });
  }
};

$(document.body).on("click", ".event-medium-container", function() {
    var event = $(this).attr("key");
    localStorage.setItem("eventKey", event);
    //window.location.href to push the page or reload html?
    console.log("You clicked on event: " + event);
});

var distance = function(userLon, userLat, eventLon, eventLat) {
  var queryURL = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + userLon + "," + userLat + "&destinations=" + eventLon + "," + eventLat + "&key=AIzaSyAGrEKN1Msn1IQeAs_Ctw4SbM-yX40fGPc";

  $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      distArray.push(response.rows[0].elements[0].distance.value);
  });
};

var bubbleSort = function(distArr, keyArr) {

  var end = distArr.length - 1;
  sorted = true;
  for (var i = 0; i < end; i++) {
    if (distArr[i] > distArr[i + 1]) {
      var tempDist = distArr[i];
      distArr[i] = distArr[i + 1];
      distArr[i + 1] = tempDist;
      var tempKey = keyArr[i];
      keyArr[i] = keyArr[i + 1];
      keyArr[i + 1] = tempKey;
      sorted = false;
      console.log("Distance Array: " + distArray);
      console.log("Key Array: " + keyArray);
    }
  }
};

var bubbleCall = function() {
  do {
    bubbleSort(distArray, keyArray);
  } while (!sorted);
}

setTimeout(bubbleCall, 1000 * 3);
setTimeout(loadSortedEvents, 1000 * 5);