const APIKEY = "7698af9594434f9f9b8145630252707"
const city = document.querySelector(".city").textContent;

function isNight(hour) {
    return hour >= 18 || hour < 6;
}

function getWeatherByCity(city) {
    const URL = `http://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=${city}`

    fetch(URL)
    .then(response => response.json())
    .then(result => {
        // Data dari API
        const current = result.current;
        const location = result.location;
        const forecast = result.forecast;

        // check keadaan siang/malam
        const localHour = new Date(location.localtime).getHours();
        const nightMode = isNight(localHour);

        // Ngambil tag HMTL
        const body = document.body;
        const card = document.querySelector(".weather-card");
        const sun = document.querySelector(".sun");
        const moon = document.querySelector(".moon");

        if(nightMode) {
            body.dataset.mode = "night";
            card.dataset.mode = "night";
            sun.style.display = "none";
            moon.style.display = "block";
        } else {
            body.dataset.mode = "day";
            card.dataset.mode = "day";
            sun.style.display = "block";
            moon.style.display = "none";
        }

    }).catch(err => {
        console.error(err);
    })
}

window.onload = () => {
    getWeatherByCity(city);
}