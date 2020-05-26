import axios from 'axios';

const currentWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?';
const cityForecastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=';
const coordUVIndexURL = 'https://api.openweathermap.org/data/2.5/uvi?';
const key = '786953f37f3a1158ba41f05aad533b5b';

const currentWeatherByCity = (city, country) => {
  return axios.get(`${currentWeatherURL}q=${city},${country}&appid=${key}`);
}

const currentWeatherByCoord = (latitude, longitude) => {
  return axios.get(`${currentWeatherURL}lat=${latitude}&lon=${longitude}&appid=${key}`);
}
export default {
  currentWeatherByCity,
  currentWeatherByCoord
}