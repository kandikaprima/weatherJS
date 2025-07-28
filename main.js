const APIKEY = "7698af9594434f9f9b8145630252707"
const city = document.querySelector(".city").textContent;

function getIconEmoji(code, isNight) {
    if ([1000].includes(code)) return isNight ? "🌙" : "☀️";
    if ([1003].includes(code)) return isNight ? "🌤️" : "🌤️";
    if ([1006, 1009].includes(code)) return "☁️";
    if ([1030, 1135, 1147].includes(code)) return "🌫️";
    if ([1063, 1150, 1153, 1180, 1183, 1240].includes(code)) return isNight ? "🌧️" : "🌦️";
    if ([1186, 1189, 1192, 1195, 1243, 1246].includes(code)) return "🌧️";
    if ([1066, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(code)) return "❄️";
    if ([1069, 1072, 1168, 1171, 1204, 1207, 1237, 1249, 1252, 1261, 1264].includes(code)) return "🌨️";
    if ([1087, 1273, 1276, 1279, 1282].includes(code)) return "⛈️";
    return "🌡️";
}

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
        // const localHour = new Date(location.localtime).getHours();
        const localHour = 10; // untuk cek siang[6-17]/malam[18-24/1-5] manual
        const nightMode = isNight(localHour);
        const emoji = getIconEmoji(current.condition.code, nightMode);

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

        document.querySelector(".city").textContent = location.name;
        document.querySelector(".date").textContent = new Date().toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });
        document.querySelector(".humidity").textContent = `💧 ${current.humidity}%`;
        document.querySelector(".wind").textContent = `💨 ${current.wind_kph} km/h`;
        document.querySelector(".temperature").textContent = `${current.temp_c} °C`;
        document.querySelector(".weather-icon").textContent = emoji;
    }).catch(err => {
        console.error(err);
    })
}

window.onload = () => {
    getWeatherByCity(city);
}