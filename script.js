const timeNow = document.getElementById('curr-time');
const today = document.getElementById('today');
const dateNow = document.getElementById('today-date');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

setInterval(() => {
    const time = new Date();
    const hour = time.getHours();
    const minute = time.getMinutes().toString().padStart(2, 0);
    const hourIn12HrFormat = hour >= 13 ? (hour % 12).toString().padStart(2, 0) : hour;
    const ampm = hour >= 12 ? 'pm' : 'am';
    timeNow.innerHTML = hourIn12HrFormat + ':' + minute + ' ' + `<span id="am-pm">${ampm}</span>`;

    const day = time.getDay();
    today.innerHTML = days[day];

    const date = time.getDate().toString().padStart(2, 0);
    const month = time.getMonth();
    const year = time.getFullYear().toString().slice(-2);
    dateNow.innerHTML = date + ' ' + months[month] + " '" + year;
}, 1000);

const API_key = '761cffc00823d4531b0b2271a3be188c';

function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {

        let { latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_key}`)
        .then(res => res.json())
        .then(data => {

            console.log(data)
            showWeatherData(data);
        })

    })
}

getWeatherData();

const currentTemperature = document.getElementById("curr-temp");
const currWindSpeed = document.getElementById("wind-speed");
const currHumidityLevel = document.getElementById("hum-level");

function showWeatherData(data) {
    let { humidity, temp } = data.main;
    let { speed } = data.wind;

    currentTemperature.innerHTML =
        `<div class="curr-temp">${Math.round(temp)}<span id="temp-unit">°C</span></div>`;

    currWindSpeed.innerHTML = speed + ' ' + 'km/h';
    currHumidityLevel.innerHTML = humidity + '%';
}
