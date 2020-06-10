import React, { useContext } from 'react';
import Moment from 'moment';
import { Container, Col, Row } from '../Grid';
import countryArr from '../../constant/countries.json';
import AppContext from '../../utils/AppContext';

const CurrentWeatherDiv = props => {
  const currentCountryCode = props.currentWeather.sys.country;
  const currentCountryName = countryArr.find(country => country.code === currentCountryCode).name;

  const appContext = useContext(AppContext);
  return (
    <div>
      <Row>
        <Col size="12 md-6">
          <div className="h-100 d-flex flex-row justify-content-center justify-content-md-end align-items-center">
            <img size="w-100" src={require(`../../assets/${props.currentWeather.weather[0].icon}@2x.png`)} alt="weather icon" />
            <div className="d-flex">
              <h1 className="display-3">{Math.round(parseInt(props.currentWeather.main.temp))}</h1>
              <p className="mt-3">{appContext.units}</p>
            </div>
          </div>
        </Col>
        <Col size="12 md-6">
          <div className="h-100">
            <div className="d-flex flex-row justify-content-center justify-content-md-start align-items-end">
              <p className="font-italic my-0">{props.currentWeather.weather[0].description} in</p>
            </div>
            <div className="d-flex flex-row justify-content-center justify-content-md-start align-items-end">
              <h2 className="display-4 mr-2">{props.currentWeather.name}</h2>
              <small className="mb-2">{currentCountryName}</small>
            </div>
          </div>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col size="12 md-4">
          <p className="text-center text-md-left">Now: {Moment.unix(props.currentWeather.dt).format('h:mm A')}</p>
        </Col>
        <Col size="12 md-4">
          <p className="text-center text-md-left">Sunrise: {Moment.unix(props.currentWeather.sys.sunrise).format('h:mm A')}</p>
        </Col>
        <Col size="12 md-4">
          <p className="text-center text-md-left">Sunset: {Moment.unix(props.currentWeather.sys.sunset).format('h:mm A')}</p>
        </Col>
      </Row>
      <hr />

      <Row>
        <Col size="12 md-6">
          <p>Feels like: {props.currentWeather.main.feels_like}{appContext.units}</p>
          <p>Humidity: {props.currentWeather.main.humidity}%</p>
          <p>Pressure: {props.currentWeather.main.pressure} hPa</p>
        </Col>
        <Col size="12 md-6">
          
        </Col>
      </Row>
    </div>
  )
};

export { CurrentWeatherDiv };