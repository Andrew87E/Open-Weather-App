var apiKey = "46b9fbe392a7416271fab6f07e46740a";
var cityName = localStorage.getItem("cityName");
var geoAPIUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`;
var cardBackCity = `https://maps.googleapis.com/maps/api/place/photo?parameters`;
var lat;
var lon;
var listEl = $("#ae-list");
var userInput = $("#userInput");
var currentCityEl = $(".current-city");
var allForecastEl = $(".forecast-card");
var uviEl = $("#uvi");
// allForecastEl.hide();
var weatherData;
var usableData;
var weatherCurrent;
var weatherDaily;
var weatherHourly;
var todaysDate = moment().format("dddd, MMMM, YYYY, h:mm a");

function generateGeo() {
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
          console.log(weatherDaily)
          generateCurrentWeather();
          generateForecastCard();
        });
    });
}

$(".default").on("click", function () {
  cityName = this.text;
  console.log(this.text);
  currentCityEl.text("");
  $(".forecast-card__cover").text("");
  generateGeo();
  geoAPIUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`;
});

$("#userInput").keypress(function (event) {
  if (event.key === "Enter") {
    userInput = this.value;
    cityName = this.value;
    localStorage.setItem("cityName", userInput);
    addListItem();
    generateGeo();
    console.log(data);
  }
});

function addListItem() {
  listEl.append("<li>" + '<a href="#">' + cityName + "</a>" + "</li>");
}
$("#uvi").hide();

function generateCurrentWeather() {
  $("#uvi").show();
  currentCityEl.append(
    "<h1>" +
      "The current weather in  " +
      cityName +
      " " +
      todaysDate +
      "</h1>" +
      "<br>"
  );
  currentCityEl.append(
    "<p>" +
      "The current temp is : " +
      weatherCurrent.temp +
      "<br>" +
      " It feels like: " +
      weatherCurrent.feels_like +
      "<br>" +
      " The humidity is: " +
      weatherCurrent.humidity +
      "<br>" +
      " The wind speed is " +
      weatherCurrent.wind_speed +
      " mph " +
      "<br>" +
      "<br>" +
      "</p>"
  );
  uviEl.append("<p>" + "The current UV Index is " + weatherCurrent.uvi);

  console.log(weatherCurrent.wind_gust);
  if (weatherCurrent.uvi < 3) {
    uviEl.addClass("lowuvi");
  } else if (weatherCurrent.uvi > 3 && weatherCurrent.uvi < 6) {
    uviEl.addClass("meduvi");
  } else if (weatherCurrent.uvi > 6 && weatherCurrent.uvi < 8) {
    uviEl.addClass("moderateuvi");
  } else if (weatherCurrent.uvi > 8 && weatherCurrent.uvi < 11) {
    uviEl.addClass("highuvi");
  } else {
    uviEl.addClass("yougonnadie");
  }
}

function generateForecastCard() {
  $("#day-1").append(
    "<h1>" + moment().add(1, "day").format("dddd") + " " + "</h1>"

  );
  $("#day-2").append(
    "<h1>" + moment().add(2, "day").format("dddd") + " " + "</h1>"
  );
  $("#day-3").append(
    "<h1>" + moment().add(3, "day").format("dddd") + " " + "</h1>"
  );
  $("#day-4").append(
    "<h1>" + moment().add(4, "day").format("dddd") + " " + "</h1>"
  );
  $("#day-5").append(
    "<h1>" + moment().add(5, "day").format("dddd") + " " + "</h1>"
  );
}

function generateBackground() {
  //if weather = sunny {insert sunny background and icon}
  //else if weather === rain {insert rainy background}
  //else if weather === cloudy {insert cloudy background}
  // else if
}
