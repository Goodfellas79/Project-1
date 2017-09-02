$(document).ready(function() {

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

  $("#login-btn").on("click", function(event) {
    event.preventDefault();
    var userNameInput = $("#user-name-input").val().trim();
    var emailInput = $("#email-input").val().trim();
    console.log(emailInput);
var query = firebase.database().ref("users/");


    /*var query = firebase.database().ref("users/");
    query.once("value").then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        var email = childSnapshot.val().email;
        var userName = childSnapshot.val().userName;
        console.log(userName);
        var dataArray = [];
        dataArray.push(userName, email);
        console.log(dataArray);*/
          
      
        

        
        

        /*if(dataArray[0] == userNameInput && dataArray[1] == emailInput) {
          window.location.href = "profile-page.html";
          console.log(userName);
        } else {
          return;
        }*/
      });
    });
  });
  

});