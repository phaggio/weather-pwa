import React from 'react';
import Moment from 'moment';
import { Col, Row } from '../Grid';
import countryArr from '../../constant/countries.json';

const CurrentWeatherDiv = props => {
  const currentCountryCode = props.currentWeather.sys.country.toLowerCase()
  const currentCountryName = countryArr.find(country => country.code = currentCountryCode).name;
  return (
    <Row>
      <Col size="8 sm-8 lg-9">
        <h2>{props.currentWeather.name}</h2>
        <h6>{currentCountryName}</h6>
        <p>Sunrise: {Moment.unix(props.currentWeather.sys.sunrise).format('h:mm A')}</p>
        <p>Sunset: {Moment.unix(props.currentWeather.sys.sunset).format('h:mm A')}</p>
        <p>Description: {props.currentWeather.weather[0].description}</p>
        <p>Current temperature: {props.currentWeather.main.temp}</p>
        <p>Feels like: {props.currentWeather.main.feels_like}</p>
        <p>Humidity: {props.currentWeather.main.humidity}%</p>
        <p>Pressure: {props.currentWeather.main.pressure} hPa</p>
      </Col>
      <Col size="4 sm-4 lg-3">
        <img size="w-100" src={require(`../../assets/${props.currentWeather.weather[0].icon}@2x.png`)} alt="weather icon" />
      </Col>
    </Row>

  )
};

export { CurrentWeatherDiv };