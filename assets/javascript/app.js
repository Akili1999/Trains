
var config = {
    apiKey: "AIzaSyCUmWGJTSpzozLFcbVzZPqVzRTXqESd39A",
    authDomain: "trains-4e20d.firebaseapp.com",
    databaseURL: "https://trains-4e20d.firebaseio.com",
    projectId: "trains-4e20d",
    stortimeBucket: "trains-4e20d.appspot.com",
    messagingSenderId: "107459012904"
  };
  firebase.initializeApp(config);


var name = "";
var destination = "";
var time = 0;
var frequency = 0;

$("#add-train").on("click", function(){
  name = $("#name-input").val().trim();
  destination = $("#destination-input").val().trim();
  time = $("#time-input").val().trim();
  frequency = $("#frequency-input").val().trim();
  firebase.database().ref().push({
    name:name,
    destination:destination,
    time:time,
    frequency:frequency,
    dataAdded:firebase.database.ServerValue.TIMESTAMP
  })
})

firebase.database().ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){
  $("#name-display").html(snapshot.val().name);
  $("#destination-display").html(snapshot.val().destination);
  $("#time-display").html(snapshot.val().time);
  $("#frequency-display").html(snapshot.val().frequency);
})

firebase.database().ref().on("child_added", function(snapshot){
  
  $(".fire-table").append("<th>"+snapshot.val().name+"</th>");
  $(".fire-table").append("<td>"+snapshot.val().destination+"</td>");
  $(".fire-table").append("<td>"+snapshot.val().frequency+"</td>");
  $(".fire-table").append("<td>"+snapshot.val().time+"</td>");
  
})