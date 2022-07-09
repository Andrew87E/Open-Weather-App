var apiKey = "46b9fbe392a7416271fab6f07e46740a";
var cityName = localStorage.getItem("cityName");
var geoAPIUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`;
var cardBackCity = `https://maps.googleapis.com/maps/api/place/photo?parameters`;
var lat;
var lon;
var listEl = $("#ae-list");
var userInput = $("#userInput");
var currentCityEl = $(".current-city");
var allForecastEl = $(".forecast-card");
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
          console.log(weatherDaily);
          generateCurrentWeather();
        });
    });
}

$(".default").on("click", function () {
  cityName = this.text;
  console.log(this.text);
  currentCityEl.text("");
  $(".forecast-card__cover").text("");
  generateGeo();
  geoAPIUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`;
});

userInput.keypress(function (event) {
  if (listEl) {
  }
  if (event.key === "Enter") {
    currentCityEl.text("");
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
      "</p>" +
      '<p id="uvi">' +
      "The current UV Index is " +
      weatherCurrent.uvi +
      "</p>"
  );

  var uviEl = $("#uvi");

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
  console.log("uviEL", uviEl);
  uviEl.text("The current UV Index is " + weatherCurrent.uvi);
  generateForecastCard();
}

function generateForecastCard() {
  $("#day-0").append(
    "<h1>" +
      moment().add(1, "day").format("dddd") +
      " " +
      "</h1>" +
      "<p id=futureWeather>" +
      " It will be: " +
      weatherDaily[0].weather[0].description +
      "<br>" +
      "<br>" +
      "The high will be : " +
      weatherDaily[0].temp.max +
      "<br>" +
      "The low will be : " +
      weatherDaily[0].temp.min +
      "<br>" +
      "<br>" +
      " The humidity will be : " +
      weatherDaily[0].humidity +
      "<br>" +
      "<br>" +
      "The UV Index will be " +
      weatherDaily[0].uvi +
      "</p>"
  );
  $("#day-1").append(
    "<h1>" +
      moment().add(2, "day").format("dddd") +
      " " +
      "</h1>" +
      "<p id=futureWeather>" +
      " It will be: " +
      weatherDaily[1].weather[0].description +
      "<br>" +
      "<br>" +
      "The high will be : " +
      weatherDaily[1].temp.max +
      "<br>" +
      "The low will be : " +
      weatherDaily[1].temp.min +
      "<br>" +
      "<br>" +
      " The humidity will be : " +
      weatherDaily[1].humidity +
      "<br>" +
      "<br>" +
      "The UV Index will be " +
      weatherDaily[1].uvi +
      "</p>"
  );
  $("#day-2").append(
    "<h1>" +
      moment().add(3, "day").format("dddd") +
      " " +
      "</h1>" +
      "<p id=futureWeather>" +
      " It will be: " +
      weatherDaily[2].weather[0].description +
      "<br>" +
      "<br>" +
      "The high will be : " +
      weatherDaily[2].temp.max +
      "<br>" +
      "The low will be : " +
      weatherDaily[2].temp.min +
      "<br>" +
      "<br>" +
      " The humidity will be : " +
      weatherDaily[2].humidity +
      "<br>" +
      "<br>" +
      "The UV Index will be " +
      weatherDaily[2].uvi +
      "</p>"
  );
  $("#day-3").append(
    "<h1>" +
      moment().add(4, "day").format("dddd") +
      " " +
      "</h1>" +
      "<p id=futureWeather>" +
      " It will be: " +
      weatherDaily[3].weather[0].description +
      "<br>" +
      "<br>" +
      "The high will be : " +
      weatherDaily[3].temp.max +
      "<br>" +
      "The low will be : " +
      weatherDaily[3].temp.min +
      "<br>" +
      "<br>" +
      " The humidity will be : " +
      weatherDaily[3].humidity +
      "<br>" +
      "<br>" +
      "The UV Index will be " +
      weatherDaily[3].uvi +
      "</p>"
  );
  $("#day-4").append(
    "<h1>" +
      moment().add(5, "day").format("dddd") +
      " " +
      "</h1>" +
      "<p id=futureWeather>" +
      " It will be: " +
      weatherDaily[4].weather[0].description +
      "<br>" +
      "<br>" +
      "The high will be : " +
      weatherDaily[4].temp.max +
      "<br>" +
      "The low will be : " +
      weatherDaily[4].temp.min +
      "<br>" +
      "<br>" +
      " The humidity will be : " +
      weatherDaily[4].humidity +
      "<br>" +
      "<br>" +
      "The UV Index will be " +
      weatherDaily[4].uvi +
      "</p>"
  );
  console.log(weatherDaily[0].weather[0].icon);
  // var card = $('.forecast-card__cover')[i]

  $(".forecast-card__cover").each(generateBackground());
  
  function generateBackground() {
    for (i = 0; i < 6; i++) {
      var icon = weatherDaily[i].weather[0].icon;
    }
    if (icon === "01d") {
      $(".forecast-card__cover").css(
        "background-image",
        "url(./assets/img/01d.gif)"
      ); //change to sunny day
    } else if (icon === "01n") {
      $(".forecast-card__cover").css(
        "background-image",
        "url(./assets/img/01n.gif)"
      ); //sunny night
    } else if (icon === "02d") {
      $(".forecast-card__cover").css(
        "background-image",
        "url(./assets/img/02d.gif)"
      ); //change to sunny day
    } else if (icon === "02n") {
      $(".forecast-card__cover").css(
        "background-image",
        "url(./assets/img/02n.gif)"
      ); //change to sunny day
    } else if (icon === "03d") {
      $(".forecast-card__cover").css(
        "background-image",
        "url(./assets/img/03d.gif)"
      ); //change to sunny day
    } else if (icon === "03n") {
      $(".forecast-card__cover").css(
        "background-image",
        "url(./assets/img/03n.gif)"
      ); //change to sunny day
    } else if (icon === "04d") {
      $(".forecast-card__cover").css(
        "background-image",
        "url(./assets/img/04d.gif)"
      ); //change to sunny day
    } else if (icon === "04n") {
      $(".forecast-card__cover").css(
        "background-image",
        "url(./assets/img/04n.gif)"
      ); //change to sunny day
    } else if (icon === "09d") {
      $(".forecast-card__cover").css(
        "background-image",
        "url(./assets/img/09d.gif)"
      ); //change to sunny day
    } else if (icon === "09n") {
      $(".forecast-card__cover").css(
        "background-image",
        "url(./assets/img/09n.gif)"
      ); //change to sunny day
    } else if (icon === "10d") {
      $(".forecast-card__cover").css(
        "background-image",
        "url(./assets/img/10d.gif)"
      );
    } else if (icon === "10n") {
      $(".forecast-card__cover").css(
        "background-image",
        "url(./assets/img/10n.gif)"
      ); //change to sunny day
    } else if (icon === "11d") {
      $(".forecast-card__cover").css(
        "background-image",
        "url(./assets/img/11d.gif)"
      ); //change to sunny day
    } else if (icon === "11n") {
      $(".forecast-card__cover").css(
        "background-image",
        "url(./assets/img/11n.gif)"
      ); //change to sunny day
    } else if (icon === "13d") {
      $(".forecast-card__cover").css(
        "background-image",
        "url(./assets/img/13d.gif)"
      ); //change to sunny day
    } else if (icon === "13n") {
      $(".forecast-card__cover").css(
        "background-image",
        "url(./assets/img/13n.gif)"
      ); //change to sunny day
    } else if (icon === "50d") {
      $(".forecast-card__cover").css(
        "background-image",
        "url(./assets/img/50d.gif)"
      ); //change to sunny day
    } else {
      $(".forecast-card__cover").css(
        "background-image",
        "url(./assets/img/50n.gif)"
      ); //change to sunny day
    }
  }
}

// function generateBackground() {
//   //if weather = sunny {insert sunny background and icon}
//   //else if weather === rain {insert rainy background}
//   //else if weather === cloudy {insert cloudy background}
//   // else if
// }
