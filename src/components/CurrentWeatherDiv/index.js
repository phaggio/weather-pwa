import React, { useContext } from 'react';
import Moment from 'moment';
import { Col, Row } from '../Grid';
import countryArr from '../../constant/countries.json';
import AppContext from '../../utils/AppContext';
import * as Conversion from '../../utils/Conversion';

const CurrentWeatherDiv = props => {
  const currentCountryCode = props.currentWeather.sys.country;
  const currentCountryName = countryArr.find(country => country.code === currentCountryCode).name;

  const appContext = useContext(AppContext);
  return (
    <div>
      <Row>
        <Col size="12 md-5 lg-6">
          <div className="h-100 d-flex flex-row justify-content-center justify-content-md-end align-items-center">
            <img className="mw-100" src={require(`../../assets/${props.currentWeather.weather[0].icon}@2x.png`)} alt="weather icon" />
            <div className="d-flex">
              <h1 className="display-3">{Math.round(parseInt(props.currentWeather.main.temp))}</h1>
              <p className="mt-3">{appContext.units}</p>
            </div>
          </div>
        </Col>
        <Col size="12 md-7 lg-6">
          <div className="h-100">
            <div className="d-flex flex-row justify-content-center justify-content-md-start align-items-end">
              <p className="font-italic my-0">{props.currentWeather.weather[0].description} in</p>
            </div>
            <div className="d-flex flex-row justify-content-center justify-content-md-start align-items-end">
              <p className="h1 mr-2 text-center text-md-left">{props.currentWeather.name}</p>
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
        <Col size="6 md-6">
          <div className="d-flex flex-column">
            <small className="text-left">HUMIDITY</small>
            <div className="d-flex justify-content-end align-items-end">
              <p className="display-4">{props.currentWeather.main.humidity}</p>
              <p>%</p>
            </div>
          </div>

          <div className="d-flex flex-column">
            <small className="text-left">WIND</small>
            <div className="d-flex justify-content-end align-items-end">
              <p className="display-4">{props.currentWeather.wind.speed}</p>
              <div className="d-flex flex-column justify-content-end">
                <div>{Conversion.convertDirection(props.currentWeather.wind.deg, appContext.unitType)}</div>
                <p>{Conversion.returnSpeedUnit(appContext.unitType)}</p>
              </div>
            </div>
          </div>
        </Col>
        <Col size="6 md-6">
          <div className="d-flex flex-column">
            <small className="text-left">PRESSURE</small>
            <div className="d-flex justify-content-end align-items-end">
              <p className="display-4 text-right">{Conversion.convertPressure(props.currentWeather.main.pressure, appContext.unitType)}</p>
              <p>{Conversion.returnPressureUnit(appContext.unitType)}</p>
            </div>
          </div>

          <div className="d-flex flex-column">
            <small className="text-left">FEELS LIKE</small>
            <div className="d-flex justify-content-end align-items-end">
              <p className="display-4">{props.currentWeather.main.feels_like}</p>
              <p>{appContext.units}</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
};

export { CurrentWeatherDiv };