// selection buttons
const cityBtn = document.getElementById("city")
const coordBtn = document.getElementById("coord")
const automBtn = document.getElementById("autom")

// submit buttons 
const citySubmit = document.getElementById("citySubmit")
const coordSubmit = document.getElementById("coordSubmit")

// sections which contain inputs
var cityDiv = document.getElementById("main-city")
var coordDiv = document.getElementById("main-coord")

var myModal = document.getElementById("weatherModal")
var closeModal = document.getElementById("closeBtnModal")

// this is the apiKey which lets us use the API of openWeather
// -------------------------------------------
const apiKey = ''
// -------------------------------------------
// -------------------------------------------


var weatherDiv = document.getElementById("weather-info")

// function for showing and hiding the corresponding sections which contain inputs
function toggleDiv(openDiv, closeDiv) {
    closeDiv.classList.remove("visibles")
    if (openDiv.classList.contains("visibles")) {
        openDiv.classList.remove("visibles")

    } else {
        openDiv.classList.add("visibles")

    }

}
cityBtn.onclick = function () {

    toggleDiv(cityDiv, coordDiv)

}

coordBtn.onclick = function () {
    toggleDiv(coordDiv, cityDiv)
}


citySubmit.onclick = function () {
    var cityName = document.getElementById("cityInp").value;
    // console.log(cityName)
    requestApiCity(cityName)

    document.getElementById("cityInp").value = ''


}

coordSubmit.onclick = function () {
    var latitude = document.getElementById("latInp").value
    var longitude = document.getElementById("longInp").value
    // console.log(latitude, longitude)
    requestApiCoord(latitude, longitude, apiKey)
    document.getElementById("latInp").value = ''
    document.getElementById("longInp").value = ''
}

function requestApiCity(city) {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    fetch(api).then(response => response.json()).then(result => showDetails(result))

}

function requestApiCoord(lat, lon) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    fetch(api).then(response => response.json()).then(result => showDetails(result))
}

async function showDetails(info) {
    console.log(info)


    var city_name = info.name;
    var countryName = await requestFullname(info.sys.country);
    var weather_condition = info.weather[0].main
    var weather_description = info.weather[0].description
    var temperature = Math.trunc(info.main.temp - 273.15)
    var min_temp = Math.floor(info.main.temp_min - 273.15)
    var max_temp = Math.ceil(info.main.temp_max - 273.15)
    var feels_like = Math.trunc(info.main.feels_like - 273.15)
    var humidity = info.main.humidity
    var pressure = info.main.pressure
    var wind_speed = info.wind.speed
    var wind_direction = info.wind.deg
    var wind_direction_poles
    var time = info.dt


    var date = new Date(time * 1000)
    var year = date.getFullYear()
    var month = date.getMonth()
    var day = date.getDate()
    var hours = date.getHours()
    var minutes = "0" + date.getMinutes()
    var seconds = "0" + date.getSeconds()

    if (wind_direction > 315 || wind_direction < 45) {
        wind_direction_poles = "North"

    } else if (wind_direction > 45 && wind_direction < 135) {
        wind_direction_poles = "East"
    } else if (wind_direction > 135 && wind_direction < 225) {
        wind_direction_poles = "South"
    } else if (wind_direction > 225 && wind_direction < 315) {
        wind_direction_poles = "West"
    }
    weatherDiv.innerHTML += `
    <h3>Name of the City: ${city_name}.</h3>
    <h3>Name of the Country: ${countryName}.</h3>
    <h4>Condition of the Weather: ${weather_condition}.</h4>
    <h4>Description: ${weather_description}.</h4>
    <p>Temperature: ${temperature} C , minimum temperature: ${min_temp} , maximum temperature: ${max_temp} and how it feels: ${feels_like}.</p>
    <p>Humidity: ${humidity}%.</p>
    <p>Pressure: ${pressure} hPa.</p>
    <p>Speed of the wind: ${wind_speed} m/s and direction of the wind: ${wind_direction_poles}.</p>
    <p>Local date and time: ${day}.${month}.${year} ,  ${hours} : ${minutes.slice(-2)} : ${seconds.slice(-2)}</p>
    `

    myModal.classList.add("visibleModal")

}



function requestFullname(code) {

    let nameApi = `https://restcountries.com/v2/alpha/${code}`;
    const cityName = fetch(nameApi).then(response => response.json()).then(result => {
        return result.name
    })
    return cityName
}

closeModal.onclick = function () {

    myModal.classList.remove("visibleModal")
    weatherDiv.innerHTML = " "
}