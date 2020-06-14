import React, { useContext } from 'react';
import Moment from 'moment';
import { Col, Row } from '../Grid';
import countryArr from '../../constant/countries.json';
import UnitContext from '../../utils/UnitContext';
import ThemeContext from '../../utils/ThemeContext';
import * as Conversion from '../../utils/Conversion';

const CurrentWeatherDiv = props => {
  console.log(`rendering CurrentWeatherDiv`)
  const currentCountryCode = props.currentWeather.sys.country ? props.currentWeather.sys.country : ``;
  const currentCountryName = countryArr.find(country => country.code === currentCountryCode).name;

  const unitContext = useContext(UnitContext);
  const themeContext = useContext(ThemeContext);

  return (
    <div>
      <Row className={`bg-${themeContext.backgroundColor}`}>
        <Col size="12 md-6 lg-6">
          <div className="h-100 d-flex flex-row justify-content-center justify-content-md-end align-items-center">
            <img className="mx-1 rounded-circle bg-light" src={require(`../../assets/${props.currentWeather.weather[0].icon}@2x.png`)} alt="weather icon" />
            <div className="d-flex align-items-end">
              <h1 className={`display-4 text-${themeContext.textColor}`}>{Math.round(parseInt(props.currentWeather.main.temp))}</h1>
              <p className={`mb-2 text-${themeContext.textColor}`}>{unitContext.units}</p>
            </div>
          </div>
        </Col>
        <Col size="12 md-6 lg-6">
          <div className="h-100">
            <div className="d-flex flex-row justify-content-center justify-content-md-start align-items-end">
              <p className={`font-italic my-0 text-${themeContext.textColor}`}>{props.currentWeather.weather[0].description} in</p>
            </div>
            <div className="d-flex flex-row justify-content-center justify-content-md-start align-items-end flex-wrap">
              <p className={`h1 mr-2 text-center text-md-left text-${themeContext.textColor}`}>{props.currentWeather.name}</p>
              <small className={`mb-2 text-${themeContext.textColor}`}>{currentCountryName}</small>
            </div>
          </div>
        </Col>
      </Row>

      <Row className={`bg-${themeContext.backgroundColor}`}>
        <Col size="12">
          <hr className={`bg-light`} />
        </Col>
      </Row>

      <Row className={`bg-${themeContext.backgroundColor}`}>
        <Col size="12 md-4">
          <p className={`text-center text-md-left text-${themeContext.textColor}`}>Now: {Moment.unix(props.currentWeather.dt).format('h:mm A')}</p>
        </Col>
        <Col size="12 md-4">
          <p className={`text-center text-md-left text-${themeContext.textColor}`}>Sunrise: {Moment.unix(props.currentWeather.sys.sunrise).format('h:mm A')}</p>
        </Col>
        <Col size="12 md-4">
          <p className={`text-center text-md-left text-${themeContext.textColor}`}>Sunset: {Moment.unix(props.currentWeather.sys.sunset).format('h:mm A')}</p>
        </Col>
      </Row>

      <Row className={`bg-${themeContext.backgroundColor}`}>
        <Col size="12">
          <hr className={`bg-light`} />
        </Col>
      </Row>

      <Row className={`bg-${themeContext.backgroundColor}`}>
        <Col size="6 md-6 lg-5 xl-4" className={`bg-${themeContext.backgroundColor}`}>
          <div className="d-flex flex-column">
            <small className={`text-left text-${themeContext.textColor}`}>HUMIDITY</small>
            <div className="d-flex justify-content-end justify-content-sm-center justify-content-lg-center align-items-end">
              <p className={`display-4 text-${themeContext.textColor}`}>{props.currentWeather.main.humidity}</p>
              <p className={`text-${themeContext.textColor}`}>%</p>
            </div>
          </div>
          <div className="d-flex flex-column">
            <small className={`text-left text-${themeContext.textColor}`}>WIND</small>
            <div className="d-flex justify-content-end justify-content-sm-center justify-content-lg-center align-items-end">
              <p className={`display-4 text-${themeContext.textColor}`}>{props.currentWeather.wind.speed}</p>
              <div className="d-flex flex-column justify-content-end">
                <div className={`text-${themeContext.textColor}`}>{Conversion.convertDirection(props.currentWeather.wind.deg, unitContext.unitType)}</div>
                <p className={`text-${themeContext.textColor}`}>{Conversion.returnSpeedUnit(unitContext.unitType)}</p>
              </div>
            </div>
          </div>
        </Col>
        <Col size="6 md-6 lg-5 xl-4">
          <div className="d-flex flex-column">
            <small className={`text-left text-${themeContext.textColor}`}>PRESSURE</small>
            <div className="d-flex justify-content-end justify-content-sm-center justify-content-lg-center align-items-end">
              <p className={`display-4 text-right text-${themeContext.textColor}`}>{Conversion.convertPressure(props.currentWeather.main.pressure, unitContext.unitType)}</p>
              <p className={`text-${themeContext.textColor}`}>{Conversion.returnPressureUnit(unitContext.unitType)}</p>
            </div>
          </div>
          <div className="d-flex flex-column">
            <small className={`text-left text-${themeContext.textColor}`}>FEELS LIKE</small>
            <div className="d-flex justify-content-end justify-content-sm-center justify-content-lg-center align-items-end">
              <p className={`display-4 text-${themeContext.textColor}`}>{Conversion.returnRoundedTemperature(props.currentWeather.main.feels_like)}</p>
              <p className={`text-${themeContext.textColor}`}>{unitContext.units}</p>
            </div>
          </div>
        </Col>
      </Row>

      <Row className={`bg-${themeContext.backgroundColor}`}>
        <Col size="12">
          <hr className={`bg-light`} />
        </Col>
      </Row>
    </div>
  )
};

export { CurrentWeatherDiv };