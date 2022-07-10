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

function init() {
  var $cardContainer = $(".ae-container");

  //create our forecast cards
  for (var day = 0; day < 5; day++) {
    var template = `
      <div class="forecast-card">
          <div class="forecast-card__cover" id="day-${day}"></div>
      </div>`;

    var $card = $(template);
    $cardContainer.append($card);
  }
}

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
          generateCurrentWeather();
        });
    });
}

$(".default").on("click", function () {
  cityName = this.text;
  eraser()
  generateGeo();
  geoAPIUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`;
});

function eraser() {
  currentCityEl.text("");
  $(".forecast-card__cover").text("");
}

userInput.keypress(function (event) {
  if (event.key === "Enter") {
    eraser()
    userInput = this.value;
    cityName = this.value;
    localStorage.setItem("cityName", userInput);
    addListItem();
    generateGeo();
  }
});

function addListItem() {
  listEl.append("<li>" + '<a href="#">' + cityName + "</a>" + "</li>");
}
$("#uvi").hide();

function generateCurrentWeather() {
  $("#uvi").show();

  currentCityEl.append(`
    <h1>
      The current weather in  ${cityName}<br>
      ${todaysDate}
    </h1><br>
    <p>
      The current temp is: ${weatherCurrent.temp}<br>
      It feels like: ${weatherCurrent.feels_like}<br>
      The humidity is: ${weatherCurrent.humidity}<br>
      The wind speed is: ${weatherCurrent.wind_speed}mph<br>    
      <br><span id="uvi">The current UV Index is: ${weatherCurrent.uvi}</span>
    </p>
  `);

  var uviEl = $("#uvi");

  if (weatherCurrent.uvi < 3) uviEl.addClass("lowuvi");
  else if (weatherCurrent.uvi > 3 && weatherCurrent.uvi < 6)
    uviEl.addClass("meduvi");
  else if (weatherCurrent.uvi > 6 && weatherCurrent.uvi < 8)
    uviEl.addClass("moderateuvi");
  else if (weatherCurrent.uvi > 8 && weatherCurrent.uvi < 11)
    uviEl.addClass("highuvi");
  else uviEl.addClass("yougonnadie");

  uviEl.text("The current UV Index is " + weatherCurrent.uvi);

  var icon = weatherCurrent.weather[0].icon;
  currentCityEl.css("background-image", `url(./assets/img/${icon}.gif)`);

  generateForecastCard();
}

function generateForecastCard() {
  for (var day = 0; day < 5; day++) {
    dayWeather = weatherDaily[day];

    $(`#day-${day}`).append(
      `<h1>
              ${moment()
                .add(day + 1, "day")
                .format("dddd")}
            </h1>
            <p id=futureWeather>
                It will be: ${dayWeather.weather[0].description}<br><br>
                The high will be : ${dayWeather.temp.max}<br><br>
                The low will be : ${dayWeather.temp.min}<br><br>
                The humidity will be : ${dayWeather.humidity}<br><br>
                The UV Index will be ${dayWeather.uvi}
            "</p>`
    );
  }

  setDayCardBackgrounds();
}
function setDayCardBackgrounds() {
  for (var day = 0; day < 5; day++) {
    var icon = weatherDaily[day].weather[0].icon;
    $("#day-" + day).css("background-image", `url(./assets/img/${icon}.gif)`);
  }
}

init();
