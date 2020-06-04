import axios from 'axios';

const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?`;
const oneCallWeatherURL = `https://api.openweathermap.org/data/2.5/onecall?`;
const key = `786953f37f3a1158ba41f05aad533b5b`;

const currentWeatherByCity = ({ city, country }) => {
  if (country === `US`) {
    return axios.get(`${currentWeatherURL}q=${city},,${country}&units=imperial&appid=${key}`)
  } else {
    return axios.get(`${currentWeatherURL}q=${city},${country}&units=imperial&appid=${key}`)
  }
}

const currentWeatherByCoord = ({ lat, lon }) => {
  return axios.get(`${currentWeatherURL}lat=${lat}&lon=${lon}&units=imperial&appid=${key}`);
}

const oneCallWeatherByCoord = ({ lat, lon }) => {
  return axios.get(`${oneCallWeatherURL}lat=${lat}&lon=${lon}&units=imperial&appid=${key}`);
}

export default {
  currentWeatherByCity,
  currentWeatherByCoord,
  oneCallWeatherByCoord
}