var apiKey = "46b9fbe392a7416271fab6f07e46740a";
var cityName = localStorage.getItem("cityName");
var geoAPIUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`;
var cardBackCity = `https://maps.googleapis.com/maps/api/place/photo?parameters`;
var lat;
var lon;
var listEl = $("#ae-list");
var userInput = $("#userInput");
var currentCityEl = $('.current-city')
var weatherData;
var usableData;
var weatherCurrent;
var weatherDaily;
var weatherHourly;

fetch(geoAPIUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    lat = data[0].lat;
    lon = data[0].lon;
  })
  .then(function () {
    var weatherAPIUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    fetch(weatherAPIUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        weatherCurrent = data.current;
        weatherDaily = data.daily;
        weatherHourly = data.hourly;
        console.log(weatherCurrent);
        console.log(data)
        generateCurrentWeather()

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
      generateWeather();
      console.log(data);
    }
  }
});

function addListItem() {
  listEl.append("<li>" + '<a href="#">' + cityName + "</a>" + "</li>");
};

function generateCurrentWeather() {
  currentCityEl.append('<h1>' + cityName + '</h1>')
  $('.city-info').append('<p>' + 'current temp is : ' + weatherCurrent.temp + ' it feels like: ' + 
  weatherCurrent.feels_like + ' The humidity is: ' + weatherCurrent.humidity + '</p>');

}

$(".option").click(function () {
  $(".option").removeClass("active");
  $(this).addClass("active");
});

function generateBackground() {
  //if weather = sunny {insert sunny background and icon}
  //else if weather === rain {insert rainy background}
  //else if weather === cloudy {insert cloudy background}
  // else if
}

function generateForecastCard() {
  //for loop iterate through built array of data
}
