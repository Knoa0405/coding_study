import { apiKey } from "./env.js";

const weather = document.querySelector(".js-weather");

const LOCATION = "location";
const saveLocaleLocation = (LatLong) => {
  localStorage.setItem(LOCATION, JSON.stringify(LatLong));
};

const handleSuccessLocation = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const LatLong = {
    latitude,
    longitude,
  };
  saveLocaleLocation(LatLong);
  getWeather(latitude, longitude);
};

const getWeather = (lat, lon) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  )
    .then((response) => {
      return response.json();
    })
    .then((weatherJson) => {
      const {
        main: { temp },
        name,
        sys: { country },
      } = weatherJson;
      weather.textContent = `${country} / ${name} - ${temp} °C`;
    });
};

const handleErrorLocation = () => {
  console.log("Unhandled error about loction");
};

const locationRef = () => {
  navigator.geolocation.getCurrentPosition(
    handleSuccessLocation,
    handleErrorLocation
  );
};

const loadLoction = () => {
  const loadedLocation = localStorage.getItem(LOCATION);
  if (loadedLocation === null) {
    locationRef();
  } else {
    const parseLocation = JSON.parse(loadedLocation);
    getWeather(parseLocation.latitude, parseLocation.longitude);
  }
};

function init() {
  loadLoction();
}

init();
