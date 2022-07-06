var apiKey = "46b9fbe392a7416271fab6f07e46740a";
var cityName = localStorage.getItem("cityName");
var geoAPIUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`;
var cardBackCity = `https://maps.googleapis.com/maps/api/place/photo?parameters`;
var lat;
var lon;
var listEl = $("#ae-list");
var userInput = $("#userInput");


fetch(geoAPIUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    console.log("lat", data[0].lat);
    console.log("lon", data[0].lon);
    lat = data[0].lat;
    lon = data[0].lon;
  })
  .then(function () {
    var weatherAPIUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    fetch(weatherAPIUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
  });

  $("#userInput").keypress(function (event) {
    if (event.key === "Enter") {
      if (userInput === " " || userInput === null) {
        window.alert("Please enter your initials. Press enter when finished.");
      } else {
        userInput = this.value;
        localStorage.setItem("cityName", userInput);
        addListItem();
      }
    }
  });

function addListItem() {
  if (cityName === $('#ae-list')){
        return;
    }else {
        listEl.append('<li>' + '<a href="#">' + cityName + '</a>');        
        }
}

getLatLon();
console.log(cityName);
function getLatLon() {
    

console.log(lat);
console.log(lon);
}
function currentForecast() {
  console.log(lat);
  console.log(lon);
  fetch(weatherAPIUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // append to page here
    });
}

$(".option").click(function(){
    $(".option").removeClass("active");
    $(this).addClass("active");
 });
