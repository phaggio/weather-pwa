import React, { useContext } from 'react';
import Moment from 'moment';
import { Col, Row } from '../Grid';
import countryArr from '../../constant/countries.json';
import AppContext from '../../utils/AppContext';

const CurrentWeatherDiv = props => {
  const currentCountryCode = props.currentWeather.sys.country;
  const currentCountryName = countryArr.find(country => country.code === currentCountryCode).name;

  const appContext = useContext(AppContext);
  return (
    <Row>
      <Col size="4 sm-4 lg-3">
        <img size="w-100" src={require(`../../assets/${props.currentWeather.weather[0].icon}@2x.png`)} alt="weather icon" />
      </Col>
      <Col size="8 sm-8 lg-9">

        <div className="d-flex">
          <h1 className="display-3">{props.currentWeather.main.temp}</h1><p className="mt-3">{appContext.units}</p>
        </div>

        <div className="d-flex align-items-end">
          <h2 className="display-4">{props.currentWeather.name}</h2><small className="ml-2">{currentCountryName}</small>
        </div>

        <p>Sunrise: {Moment.unix(props.currentWeather.sys.sunrise).format('h:mm A')}</p>
        <p>Sunset: {Moment.unix(props.currentWeather.sys.sunset).format('h:mm A')}</p>
        <p>Description: {props.currentWeather.weather[0].description}</p>

        <p>Feels like: {props.currentWeather.main.feels_like}{appContext.units}</p>
        <p>Humidity: {props.currentWeather.main.humidity}%</p>
        <p>Pressure: {props.currentWeather.main.pressure} hPa</p>
      </Col>
    </Row>

  )
};

export { CurrentWeatherDiv };