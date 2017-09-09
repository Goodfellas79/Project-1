
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

  /*function validateForm() {
    var x = document.forms["sign-in-form"]["name"].value;
    if (x == "") {
        alert("Name must be filled out");
        return false;
    }
  }*/

  $("#add-event-btn").on("click", function(event) {
    event.preventDefault();
    bootbox.confirm("Are you sure you want to register this event?", function(result) {

      var title = $("#title-input").val().trim();
      var location = $("#location-input").val().trim();
      var date = $("#date-input").val().trim();
      var description = $("#description-input").val().trim();
      var link = $("#link-input").val().trim();

      var newEvent = {
        title: title,
        location: location,
        date: date,
        description: description,
        link: link
      }

      database.ref("events/").push(newEvent);
     
      bootbox.alert("Event successfully added");
      $("#title-input").val("");
      $("#location-input").val("");
      $("#date-input").val("");
      $("#description-input").val("");
      $("#link-input").val("");
  
    });

  });



  var query = firebase.database().ref("events/").orderByKey();
  query.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {

      var key = childSnapshot.key;

      var event = childSnapshot.val().title;

      console.log(event);
    });
  });

});
  