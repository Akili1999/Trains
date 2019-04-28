// First, we initialize Firebase //
var config = {
    apiKey: "AIzaSyCUmWGJTSpzozLFcbVzZPqVzRTXqESd39A",
    authDomain: "trains-4e20d.firebaseapp.com",
    databaseURL: "https://trains-4e20d.firebaseio.com",
    projectId: "trains-4e20d",
    stortimeBucket: "trains-4e20d.appspot.com",
    messagingSenderId: "107459012904"
  };
  firebase.initializeApp(config);

// This is the input for the name and destination of the train, as a string //
var name = "";
var destination = "";

// This is the button for adding a train to the list //
$("#add-train").on("click", function(){
// This "if" statment prevents the submit button from creating blank table elements //
// It does this by checking if the boxes are blank, before doing our function //
  if($("#name-input").val(),$("#destination-input").val(),$("#time-input").val(),$("#frequency-input").val() !=""){
  name = $("#name-input").val().trim();
  destination = $("#destination-input").val().trim();
  time = $("#time-input").val().trim();
  console.log(time.length);
  console.log(time[2]);
  console.log(validate(time));
  // This "if" statement restricts "time" from being anything other than our desired way of input //
  if (time.length !== 5 || time[2] !== ':' || validate(time) !== true) {
    console.log('gonna break here..');
    
  } else {
    // This is how we get our most recent trains from our firebase //
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
// This is where we retrict the user from using letters in the time input //
function validate (time) {
  var isGood = true;
  for (let i = 0; i < time.length; i++ ){
    if(time[i] !== ':') {
      console.log(typeof(time[i]));
      // This ensures that this funciton does what is desired, by ensuring that what is inside the box is an integer //
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
  
  // Our table here is dynamic, as it can be updated and changed by the user, and it still retains the same organization. Each row has our table elements appended to it, as well as our var values //
  // This is also where we will calculate our value for the next arrival, and minutes away //
  var tillTrain = snapshot.val().frequency - remainder;
  var row = $("<tr>")
  row.append("<td>"+snapshot.val().name+"</td>");
  row.append("<td>"+snapshot.val().destination+"</td>");
  row.append("<td>"+snapshot.val().frequency+"</td>");
  row.append("<td>"+snapshot.val().time+"</td>");
  row.append("<td>"+ tillTrain + "</td>");
  $(".fire-table").append(row)
  
})
