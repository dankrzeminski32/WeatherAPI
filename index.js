fetchWeather();

function showWeatherItems(data) {
  let row = document.querySelector(".three-day-forecast");
  console.log(data.daily.toString());
  data.daily = data.daily.splice(1);
  console.log(data.daily);
  row.innerHTML = data.daily
    .map((day, idx) => {
      if (idx < 3) {
        let dt = new Date(day.dt * 1000);
        return `
          <li class="first">
            <p class="day">${dt.toDateString().slice(0, 3)}</p>
            <img src="http://openweathermap.org/img/wn/${
              day.weather[0].icon
            }@4x.png" class="weth-logo" />
            <p class="temp">${Math.trunc(day.temp.day)}&#8457</p>
          </li>
    `;
      }
    })
    .join(" ");
}

function showWeatherDescription(data) {
  let weatherDescription = capitalizeFirstLetter(
    data.current.weather[0].description
  );
  let row = document.querySelector(".weather-description");
  console.log(weatherDescription);
  row.innerHTML = `${weatherDescription}`;
}

function showWeatherHeader(data) {
  let row = document.querySelector(".container-current");
  row.innerHTML = `<img class="current weth-logo" src="http://openweathermap.org/img/wn/${
    data.current.weather[0].icon
  }@4x.png" alt="" /><h1 class="current-temp">${Math.trunc(
    data.current.temp
  )}&#8457</h1> `;
}

function fetchWeather() {
  let key = config.MY_KEY;
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=39.7684&lon=-86.1581&exclude=minutely,alerts&appid=${key}&units=imperial`;
  //fetch the API
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      showWeatherItems(data);
      showWeatherHeader(data);
      showWeatherDescription(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
