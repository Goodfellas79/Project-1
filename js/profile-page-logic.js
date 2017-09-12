
$(document).ready(function() {

  // Initialize Firebase
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

  var title;
  var street;
  var city;
  var state;
  var zipcode;
  var date;
  var time;
  var location;
  var description;
  var link;

  var eventLon;
  var eventLat;

  var keyArray = [];
  var distArray = [];
  var sorted;

  var addNewEvent = function() {
    console.log("hi");

    var newEvent = {
      title: title,
      street: street,
      city: city,
      state: state,
      zipcode: zipcode,
      date: date,
      time: time,
      eventLon: eventLon,
      eventLat: eventLat,
      description: description,
      link: link
    };

    database.ref("events/").push(newEvent);

    console.log(newEvent);

    $("#title-input").val("");
    $("#street-input").val("");
    $("#city-input").val("");
    $("#state-input").val("");
    $("#zip-input").val("");
    $("#date-input").val("");
    $("#time-input").val("");
    $("#description-input").val("");
    $("#link-input").val("");

    bootbox.alert("Event successfully added");
  };

  var coordinates = function(street, city, state, zipcode) {
    var replaceAddress = street.split(" ").join("+");
    var address = replaceAddress + "+" + city + "+" + state + "+" + zipcode;
    var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyAGrEKN1Msn1IQeAs_Ctw4SbM-yX40fGPc";
   
   $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
        console.log(response);
        //distArray.push(response.rows[0].elements[0].distance.value);
        eventLon = response.results[0].geometry.location.lng;
        eventLat = response.results[0].geometry.location.lat;
        console.log(eventLat);
        console.log(eventLon);
        addEvent();
      }).fail(function() {
        bootbox.alert("Invalid address");
      })
  };

  $("#event-modal-btn").on("click", function() {
    $("#create-event-modal").modal();
  });

  $("#event-form").on("submit", function(e) {
    e.preventDefault();

    var form = $(this);
    form.parsley().validate();

    if (form.parsley().isValid()) {
      bootbox.confirm("Are you sure you want to create this event?", function(result) {
        if(result) {
          title = $("#title-input").val().trim();
          street = $("#street-input").val().trim();
          city = $("#city-input").val().trim();
          state = $("#state-input").val().trim();
          zipcode = $("#zip-input").val().trim();
          date = $("#date-input").val().trim();
          time = $("#time-input").val().trim();
          description = $("#description-input").val().trim();
          link = $("#link-input").val().trim();
          coordinates(street, city, state, zipcode);
          addNewEvent();
        }
      });  
    } 

  });

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
        console.log(response);
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

  setTimeout(bubbleCall, 1000 * 4);
  setTimeout(loadSortedEvents, 1000 * 5);
});