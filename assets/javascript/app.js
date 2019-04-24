// Initialize Firebase
var config = {
    apiKey: "AIzaSyCUmWGJTSpzozLFcbVzZPqVzRTXqESd39A",
    authDomain: "trains-4e20d.firebaseapp.com",
    databaseURL: "https://trains-4e20d.firebaseio.com",
    projectId: "trains-4e20d",
    storageBucket: "trains-4e20d.appspot.com",
    messagingSenderId: "107459012904"
  };
  firebase.initializeApp(config);

  var dataRef = firebase.database();

  var name = "";
  var destination = "";
  var time = 0;
  var frequency = 0;

  $("#add-user").on("click", function(event) {
    event.preventDefault();

    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
    name = $("#name-input").val().trim();
    destination = $("#email-input").val().trim();
    time = $("#age-input").val().trim();
    frequency = $("#comment-input").val().trim();

    // Code for the push
    dataRef.ref().push({

      name: name,
      destination: destination,
      time: time,
      frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  });

  dataRef.ref().on("child_added", function(childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().time);
    console.log(childSnapshot.val().frequency);

    // full list of items to the well
    $("#full-member-list").append("<div class='well'><span class='train-name'> " +
      childSnapshot.val().name +
      " </span><span class='train-destination'> " + childSnapshot.val().destination +
      " </span><span class='train-time'> " + childSnapshot.val().time +
      " </span><span class='train-frequency'> " + childSnapshot.val().frequency +
      " </span></div>");

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

  dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
    // Change the HTML to reflect
    $("#name-display").text(snapshot.val().name);
    $("#destination-display").text(snapshot.val().destination);
    $("#time-display").text(snapshot.val().time);
    $("#frequency-display").text(snapshot.val().frequency);
  });