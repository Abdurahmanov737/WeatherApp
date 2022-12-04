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
const apiKey = ''
// -------------------------------------------
// -------------------------------------------




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


}

coordSubmit.onclick = function(){
    var latitude = document.getElementById("latInp").value
    var longitude = document.getElementById("longInp").value
    console.log(latitude,longitude)
    requestApiCoord(latitude,longitude,apiKey)

}

function requestApiCity(city){
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    fetch(api).then(response => console.log(response.json()))

}

function requestApiCoord(lat,lon){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    fetch(api).then(response => console.log(response.json()))
}