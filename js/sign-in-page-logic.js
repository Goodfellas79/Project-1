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

  $("#add-user-btn").on("click", function(event) {
    event.preventDefault();
    bootbox.confirm("Are you sure you want to register?", function(result) {

      var name = $("#name-input").val().trim();
      var email = $("#email-input").val().trim();
      var homeCity = $("#home-city-input").val().trim();
      var phone = $("#phone-input").val().trim();
      var userName = $("#user-name-input").val().trim();
      var genre = $("#genre-input").val().trim();
      var band1 = $("#bands-input1").val().trim();
      var band2 = $("#bands-input2").val().trim();
      var band3 = $("#bands-input3").val().trim();
      var song1 = $("#songs-input1").val().trim();
      var song2 = $("#songs-input2").val().trim();
      var song3 = $("#songs-input3").val().trim();
      var links = $("#links-input").val().trim();
      var aboutYou = $("#about-input").val().trim();

      var newUser = {
        name: name,
        email: email,
        homeCity: homeCity,
        phone: phone,
        userName: userName,
        genre: genre,
        band1: band1,
        band2: band2,
        band3: band3,
        song1: song1,
        song2: song2,
        song3: song3,
        links: links,
        abooutYou: aboutYou
      }

      database.ref("users/").push(newUser);
     
      bootbox.alert("User successfully added");
      $("#name-input").val("");
      $("#email-input").val("");
      $("#home-city-input").val("");
      $("#phone-input").val("");
      $("#user-name-input").val("");
      $("#genre-input").val("");
      $("#bands-input1").val("");
      $("#bands-input2").val("");
      $("#bands-input3").val("");
      $("#songs-input1").val("");
      $("#songs-input2").val("");
      $("#songs-input3").val("");
      $("#links-input").val("");
      $("#about-input").val("");
    
    });

  });

var query = firebase.database().ref("users/").orderByKey();
query.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {

      var key = childSnapshot.key;

      var userName = childSnapshot.val().userName;

      console.log(userName);
    });
  });
  
});
