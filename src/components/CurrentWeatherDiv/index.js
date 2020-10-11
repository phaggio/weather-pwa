import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import countryCode from '../../JSON/countryCode.json';
import UnitContext from '../../utils/UnitContext';
import ThemeContext from '../../utils/ThemeContext';
import * as Conversion from '../../utils/Conversion';

const CurrentWeatherDiv = props => {
  const countryName = countryCode[0][props.currentWeather.sys.country] ? countryCode[0][props.currentWeather.sys.country] : `N/A`;

  const unitContext = useContext(UnitContext);
  const themeContext = useContext(ThemeContext);

  return (
    <div>
      <div className="row">
        <div className="col-12 col-md-6">

          <div className="d-flex justify-content-center justify-content-md-end align-items-center">
            <img className="mx-1 rounded-circle bg-light"
              src={require(`../../assets/${props.currentWeather.weather[0].icon}@2x.png`)} alt="weather icon" />
            <div className="d-flex align-items-baseline">
              <h1 className={`display-4 text-${themeContext.textColor}`}>{Math.round(parseInt(props.currentWeather.main.temp))}</h1>
              <p className={`ml-1 text-${themeContext.textColor}`}>{unitContext.units}</p>
            </div>
          </div>

        </div>
        <div className="col-12 col-md-6">

          <div className="d-flex justify-content-center justify-content-md-start align-items-center">
            <p className={`font-italic mb-0 mt-2 text-${themeContext.textColor}`}>{props.currentWeather.weather[0].description} in</p>
          </div>

          <div className="d-flex flex-row justify-content-center justify-content-md-start align-items-baseline flex-wrap">
            <p className={`h1 mr-2 text-center text-md-left text-${themeContext.textColor}`}>{props.currentWeather.name}</p>
            <small className={` text-${themeContext.textColor}`}>{countryName}</small>
          </div>

        </div>
      </div>

      <hr className={`bg-light`} />

      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column flex-sm-row justify-content-around ">
            <p className={`text-center text-md-left text-${themeContext.textColor}`}>
              Now: {Conversion.unixToLocalTime(props.currentWeather.dt, props.currentWeather.timezone, `h:mm A`)}
            </p>
            <p className={`text-center text-md-left text-${themeContext.textColor}`}>
              Sunrise: {Conversion.unixToLocalTime(props.currentWeather.sys.sunrise, props.currentWeather.timezone, `h:mm A`)}
            </p>
            <p className={`text-center text-md-left text-${themeContext.textColor}`}>
              Sunset: {Conversion.unixToLocalTime(props.currentWeather.sys.sunset, props.currentWeather.timezone, `h:mm A`)}
            </p>
          </div>
        </div>
      </div>

      <hr className={`bg-light`} />

      <div className="row">
        <div className="col-6">
          <div className="d-flex flex-column">
            <small className={`text-left text-${themeContext.textColor}`}>HUMIDITY</small>
            <div className="d-flex justify-content-end justify-content-sm-center align-items-baseline">
              <div className={`display-4 mr-1 text-${themeContext.textColor}`}>{props.currentWeather.main.humidity}</div>
              <small className={`text-${themeContext.textColor}`}>%</small>
            </div>
          </div>
          <div className="d-flex flex-column">
            <small className={`text-left text-${themeContext.textColor}`}>WIND</small>
            <div className="d-flex justify-content-end justify-content-sm-center align-items-baseline">
              <small className={`text-${themeContext.textColor} mr-1`}>
                {Conversion.convertDirection(props.currentWeather.wind.deg, unitContext.unitType)}
              </small>
              <div className={`display-4 mr-1 text-${themeContext.textColor}`}>
                {Conversion.returnRoundedWindSpeed(props.currentWeather.wind.speed)}
              </div>
              <small className={`text-${themeContext.textColor}`}>{Conversion.returnSpeedUnit(unitContext.unitType)}</small>
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className="d-flex flex-column">
            <small className={`text-left text-${themeContext.textColor}`}>PRESSURE</small>
            <div className="d-flex justify-content-end justify-content-sm-center align-items-baseline">
              <div className={`display-4 mr-1 text-${themeContext.textColor}`}>
                {Conversion.convertPressure(props.currentWeather.main.pressure, unitContext.unitType)}
              </div>
              <small className={`text-${themeContext.textColor}`}>{Conversion.returnPressureUnit(unitContext.unitType)}</small>
            </div>
          </div>
          <div className="d-flex flex-column">
            <small className={`text-left text-${themeContext.textColor}`}>FEELS LIKE</small>
            <div className="d-flex justify-content-end justify-content-sm-center align-items-baseline">
              <div className={`display-4 mr-1 text-${themeContext.textColor}`}>
                {Conversion.returnRoundedTemperature(props.currentWeather.main.feels_like)}
              </div>
              <small className={`text-${themeContext.textColor}`}>{unitContext.units}</small>
            </div>
          </div>
        </div>

      </div>

      <hr className={`bg-light`} />
    </div>
  )
};

CurrentWeatherDiv.propTypes = {
  children: PropTypes.node,
  currentWeather: PropTypes.object
};


export default CurrentWeatherDiv;