import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import UnitContext from '../../utils/UnitContext';
import ThemeContext from '../../utils/ThemeContext';
import * as Conversion from '../../utils/Conversion';

const hourlyForecastStyle = {
  overflowX: 'auto'
};

const HourlyForecastDiv = props => {

  const hourArr = props.hourly.slice(1, props.hours);
  const unitContext = useContext(UnitContext);
  const themeContext = useContext(ThemeContext);

  const imgStyle = {
    height: `60px`,
    width: `60px`
  }

  return (
    <div>
      <h4 className={`text-${themeContext.textColor}`}>Hourly forecast</h4>
      <div className="rounded-lg d-flex flex-nowrap" style={hourlyForecastStyle}>
        {hourArr.map(hour => {
          return (
            <div className="d-flex flex-column align-items-center" key={hour.dt}>
              <label className={`font-weight-light text-${themeContext.textColor}`}>
                {Conversion.unixToLocalTime(hour.dt, props.timezone, `hA`)}
              </label>
              <img className="mx-1 rounded-circle bg-light"
                style={imgStyle}
                size="w-100"
                src={require(`../../assets/${hour.weather[0].icon}@2x.png`)}
                alt="weather icon" />
              <small className={`font-weight-light text-${themeContext.textColor}`}>
                {Conversion.returnRoundedTemperature(hour.temp)}{unitContext.units}
              </small>
            </div>
          )
        })}
      </div>

      <hr className={`bg-light`} />

    </div>
  )
};

HourlyForecastDiv.propTypes = {
  children: PropTypes.node,
  hourly: PropTypes.array,
  hours: PropTypes.number,
  timezone: PropTypes.number
};

export default HourlyForecastDiv;