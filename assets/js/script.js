const apiKey = process.env.APIKEY;
const cityName = localStorage.getItem("cityName");
const cityArr = JSON.parse(localStorage.getItem("cityName")) || [];
const geoAPIUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`;
const cardBackCity = `https://maps.googleapis.com/maps/api/place/photo?parameters`;
let lat;
let lon;
const listEl = $("#ae-list");
const userInput = $("#userInput");
const currentCityEl = $(".current-city");
const allForecastEl = $(".forecast-card");
// allForecastEl.hide();
let weatherData;
let usableData;
let weatherCurrent;
let weatherDaily;
let weatherHourly;
const todaysDate = moment().format("dddd, MMMM, YYYY, h:mm a");

function init() {
  const $cardContainer = $(".ae-container");

  //create our forecast cards
  for (let day = 0; day < 5; day++) {
    const template = `
      <div class="forecast-card">
          <div class="forecast-card__cover" id="day-${day}"></div>
      </div>`;

    const $card = $(template);
    $cardContainer.append($card);
  }
}

function generateGeo() {
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      lat = data[0].lat;
      lon = data[0].lon;
      // })
      // .then(function () {
      const weatherAPIUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
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
  eraser();
  generateGeo();
  geoAPIUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`;
});

function eraser() {
  currentCityEl.text("");
  $(".forecast-card__cover").text("");
  $("#uvi").text("");
}

userInput.keypress(function (event) {
  if (event.key === "Enter") {
    eraser();
    userInput = this.value;
    cityName = this.value;
    cityArr.push(cityName);
    localStorage.setItem("cityName", JSON.stringify(cityArr));
    addListItem();
    generateGeo();
  }
});

function addListItem() {
  const newLi = $("<li>");
  // newLi.html(`<a href="#${cityName}">` + cityName + "</a>");
  const newA = $("<a>");
  newA.attr("href", `#${cityName}`);
  newA.text(cityName);
  newA.on("click", function () {
    cityName = this.text;
    eraser();
    generateGeo();
    geoAPIUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`;
  });
  newLi.append(newA);
  listEl.append(newLi);
}

// $("#uvi").hide();

function generateCurrentWeather() {
  // $("#uvi").show();

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
      <br><span id="uvi">The current UV Index is: ${Math.floor(
        weatherCurrent.uvi
      )}</span>
    </p>
  `);

  const uviEl = $("#uvi");

  if (weatherCurrent.uvi < 3) uviEl.addClass("lowuvi");
  else if (weatherCurrent.uvi > 3 && weatherCurrent.uvi < 6)
    uviEl.addClass("meduvi");
  else if (weatherCurrent.uvi > 6 && weatherCurrent.uvi < 8)
    uviEl.addClass("moderateuvi");
  else if (weatherCurrent.uvi > 8 && weatherCurrent.uvi < 11)
    uviEl.addClass("highuvi");
  else uviEl.addClass("yougonnadie");

  // uviEl.text("The current UV Index is " + weatherCurrent.uvi);

  const icon = weatherCurrent.weather[0].icon;
  currentCityEl.css("background-image", `url(./assets/img/${icon}.gif)`);

  generateForecastCard();
}

function generateForecastCard() {
  for (let day = 0; day < 5; day++) {
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
  for (let day = 0; day < 5; day++) {
    const icon = weatherDaily[day].weather[0].icon;
    $("#day-" + day).css("background-image", `url(./assets/img/${icon}.gif)`);
  }
}

init();

for (let i = 0; i < cityArr.length; i++) {
  cityName = cityArr[i];
  addListItem();
}
