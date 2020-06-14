import axios from 'axios';

const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?`;
const oneCallWeatherURL = `https://api.openweathermap.org/data/2.5/onecall?`;
const key = `786953f37f3a1158ba41f05aad533b5b`;

const currentWeatherByCity = ({ units, city, country }) => {
  if (country === `US`) {
    return axios.get(`${currentWeatherURL}q=${city},,${country}&units=${units ? units : ``}&appid=${key}`)
  } else {
    return axios.get(`${currentWeatherURL}q=${city},${country}&units=${units ? units : ``}&appid=${key}`)
  }
}

const currentWeatherByCoord = ({ units, lat, lon }) => {
  return axios.get(`${currentWeatherURL}lat=${lat}&lon=${lon}&units=${units ? units : ``}&appid=${key}`);
}

const oneCallWeatherByCoord = ({ units, lat, lon }) => {
  return axios.get(`${oneCallWeatherURL}lat=${lat}&lon=${lon}&exclude=minutely&units=${units ? units : ``}&appid=${key}`);
}

export default {
  currentWeatherByCity,
  currentWeatherByCoord,
  oneCallWeatherByCoord
}