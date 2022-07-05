var apiKey = '46b9fbe392a7416271fab6f07e46740a'
var cityName = localStorage.getItem('cityName')
var weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=46b9fbe392a7416271fab6f07e46740a`
var geoAPIUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`
var listEl = $('#ae-list');
var userInput = $('#userInput');
var lat;
var lon;


$('#userInput').keypress(function (event) {
    if (event.key === 'Enter') {
        if (userInput === ' ' || userInput === null) {
            window.alert('Please enter your initials. Press enter when finished.')
        } else {
            userInput = (this).value;
            localStorage.setItem('cityName', userInput);
        }
    }
});

getLatLon();
console.log(cityName)

function getLatLon() {
    fetch(geoAPIUrl)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            console.log('lat', data[0].lat);
            console.log('lon', data[0].lon);
            lat = data[0].lat.text();
            lon = data[0].lon.text();
        })
};

console.log(lat)
console.log(lon)

currentForecast()

function currentForecast() {
    fetch(weatherAPIUrl)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            // append to page here
        })
};
