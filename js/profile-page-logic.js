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

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
	database.ref("KspXYs_kTeFwyz7HFg7").once('value').then(function(snap) {
	}
	console.log(snapshot.val().name);
}

});
