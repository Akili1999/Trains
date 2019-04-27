
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
// var time = "";
// var frequency = 0;
// var converted = moment(time, "HH:mm").subtract(1, "years");
// var current = moment();
// var diff = moment().diff(moment(converted), "minutes");
// var remainder = diff % frequency;
// var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
// var currentTime = moment();
// var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
// var tRemainder = diffTime % tFrequency;
// var tMinutesTillTrain = tFrequency - tRemainder;
// var nextTrain = moment().add(tMinutesTillTrain, "minutes");

$("#add-train").on("click", function(){
  if($("#name-input").val(),$("#destination-input").val(),$("#time-input").val(),$("#frequency-input").val() !=""){
  name = $("#name-input").val().trim();
  destination = $("#destination-input").val().trim();
  time = $("#time-input").val().trim();
  console.log(time.length);
  console.log(time[2]);
  console.log(validate(time));
  if (time.length !== 5 || time[2] !== ':' || validate(time) !== true) {
    console.log('gonna break here..');
    
  } else {
    frequency = $("#frequency-input").val().trim();
    firebase.database().ref().push({
      name:name,
      destination:destination,
      time:time,
      frequency:frequency,
      dataAdded:firebase.database.ServerValue.TIMESTAMP
    })
  }
  }
})

function validate (time) {
  var isGood = true;
  for (let i = 0; i < time.length; i++ ){
    if(time[i] !== ':') {
      console.log(typeof(time[i]));
      if (Number.isInteger(parseInt(time[i])) == false)  {
        console.log('not a valid time');
        isGood = false;
        break;
      } 
    }
  }
  return isGood;
}

firebase.database().ref().on("child_added", function(snapshot){
  var time = "";
  var frequency = 0;
  var converted = moment(snapshot.val().time, "HH:mm").subtract(1, "years");
  var current = moment();
  var diff = moment().diff(moment(converted), "minutes");  
  console.log(diff);
  console.log(typeof(snapshot.val().frequency));
  
  
  remainder = diff % parseInt(snapshot.val().frequency);
  console.log(remainder);
  
  var tillTrain = snapshot.val().frequency - remainder;
  var row = $("<tr>")
  row.append("<td>"+snapshot.val().name+"</td>");
  row.append("<td>"+snapshot.val().destination+"</td>");
  row.append("<td>"+snapshot.val().frequency+"</td>");
  row.append("<td>"+snapshot.val().time+"</td>");
  row.append("<td>"+ tillTrain + "</td>");
  $(".fire-table").append(row)
  
})
