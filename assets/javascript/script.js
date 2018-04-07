// submit train name, Destination, train time, frewuency
// store this data in Firebase

//

//

//













// fire base api



  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBUjWM_S72JR_i95XRVW730mjVfbZBil9A",
    authDomain: "train-time-5f07b.firebaseapp.com",
    databaseURL: "https://train-time-5f07b.firebaseio.com",
    projectId: "train-time-5f07b",
    storageBucket: "train-time-5f07b.appspot.com",
    messagingSenderId: "934629427852"
  };
  firebase.initializeApp(config);
var database = firebase.database();
$("#add-train-btn").on("click", function() {
  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = $("#first-train-input").val().trim();
  var frequency = $("#frequency-input").val().trim();
  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };
  // Uploads train data to the database
  database.ref().push(newTrain);
  
  alert("Train successfully added");
  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
  // Determine when the next train arrives.
  return false;
});
trainData.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());
  // Store everything into a variable.
  var tName = childSnapshot.val().name;
  var tDestination = childSnapshot.val().destination;
  var tFrequency = childSnapshot.val().frequency;
  var tFirstTrain = childSnapshot.val().firstTrain;
  var timeArr = tFirstTrain.split(":");
  var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
  var maxMoment = moment.max(moment(), trainTime);
  var tMinutes;
  var tArrival;
  
  //If the first train is later than the current time, sent arrival to the first train time
  if (maxMoment === trainTime) {
    tArrival = trainTime.format("hh:mm A");
    tMinutes = trainTime.diff(moment(), "minutes");
  } else {
    // Calculate the minutes until arrival using hardcore math
    // To calculate the minutes till arrival, take the current time in unix subtract the FirstTrain time
    // and find the modulus between the difference and the frequency.
    var differenceTimes = moment().diff(trainTime, "minutes");
    var tRemainder = differenceTimes % tFrequency;
    tMinutes = tFrequency - tRemainder;
    // To calculate the arrival time, add the tMinutes to the currrent time
    tArrival = moment().add(tMinutes, "m").format("hh:mm A");
  }
    console.log("tMinutes:", tMinutes);
    console.log("tArrival:", tArrival);
    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
      tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
  });

