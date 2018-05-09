
	<!-- the following script will load the map and set the default view and zoom, as well as loading the basemap tiles -->

	// load the map
	var mymap = L.map('mapid').setView([51.505, -0.09], 13);
	// load the tiles
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
			maxZoom: 18,
			//attribution is the copyright statement
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' + 
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' + 
				'Imagery © <a href="http://mapbox.com">Mapbox</a>', 
			id: 'mapbox.streets'
		}).addTo(mymap);
		
		

var xhr;
// Function to make an AJAX request for the User Guide
function callDivChange() {
	xhr = new XMLHttpRequest();
	xhr.open("GET", "questionsUserGuide.html", true);
	xhr.onreadystatechange = processDivChange;
	try {
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	}
	catch (e) {
		// this only works in internet explorer
	}
	xhr.send();
}
// Function to load the User Guide
function processDivChange() {
	if (xhr.readyState < 4) // while waiting response from server
		document.getElementById('main').innerHTML = "Loading...";
	else if (xhr.readyState === 4) { // 4 = Response from server has been completely loaded.
		if (xhr.status == 200 && xhr.status < 300)
			// http status between 200 to 299 are all successful
			document.getElementById('main').innerHTML = xhr.responseText;
	}
}

var client;
// Function to send question to server
function processData(postString) {
   client = new XMLHttpRequest();
   client.open('POST','http://developer.cege.ucl.ac.uk:30266/createQuestion',true);
 
   client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   client.onreadystatechange = dataUploaded;
   client.send(postString);
}
// Function to display the upload result
function dataUploaded() {
  if (client.readyState == 4) {
    // change the DIV to show the response
    document.getElementById("dataUploadResult").innerHTML = client.responseText;
	alert("Question successfully submitted!");
    }
  else {
      document.getElementById("dataUploadResult").innerHTML = "ERROR";
  }
}


// create a custom popup 
var popup = L.popup();
// create an event detector to wait for the user's click event and then use the popup to show them where they clicked

var latlng;

function onMapClick(e) { 
	popup
		.setLatLng(e.latlng)
		.setContent("You are adding a question at this point " + e.latlng.toString()) 
		.openOn(mymap);
	latlng = e.latlng;
}
// now add the click event detector to the map 
mymap.on('click', onMapClick);
         
// Function to extract the question parts from the form
function startDataUpload() {

var question = document.getElementById("question").value;
var answer1 = document.getElementById("answer1").value;
var answer2 = document.getElementById("answer2").value;
var answer3 = document.getElementById("answer3").value;
var answer4 = document.getElementById("answer4").value;
var correctAnswer = 0;



if (document.getElementById("correctAnswer1").checked === true) {
	correctAnswer = 1;
}
else if (document.getElementById("correctAnswer2").checked === true) {
	correctAnswer = 2;
}
else if (document.getElementById("correctAnswer3").checked === true) {
	correctAnswer = 3;
}
else if (document.getElementById("correctAnswer4").checked === true) {
	correctAnswer = 4;
}

var postString = "question="+question+"&answer1="+answer1+"&answer2="+answer2+"&answer3="+answer3+"&answer4="+answer4+"&correctAnswer="+correctAnswer+"&lng="+latlng.lng+"&lat="+latlng.lat;
processData(postString);

}

 