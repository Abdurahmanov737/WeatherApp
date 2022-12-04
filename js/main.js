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




// this is the apiKey which lets us use the API of openWeather
// -------------------------------------------
const apiKey = '35df0f09cc00c2fffc614dcf6e9b36b0'
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
    console.log(latitude, longitude)
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


    var countryName = await  requestFullname(info.sys.country)
    // console.log("this is" + countryName)
    weatherDiv.innerHTML += `
    <h3> ${info.name}</h3>
                
                <h4>${info.weather[0].main}</h4>
                <h4>${info.weather[0].description}</h4>
            <h3>${countryName}</h3>

                <p>Temp, min-temp, max-temp and real-feel</p>
                <p>humidity</p>
                <p>Pressure</p>
                <p>wind speed and wind direction</p>
                <p>date and time</p>
    `

}



function requestFullname(code) {

    let nameApi = `https://restcountries.com/v2/alpha/${code}`;
   const cityName = fetch(nameApi).then(response =>response.json()).then(result => {
        return result.name
    })
    return cityName
}

