import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import UnitContext from '../../utils/UnitContext';
import ThemeContext from '../../utils/ThemeContext';
import * as Conversion from '../../utils/Conversion';

const DailyForecastDiv = props => {

  const unitContext = useContext(UnitContext);
  const themeContext = useContext(ThemeContext);

  const imgStyle = {
    height: `60px`,
    width: `60px`
  }

  return (
    <div>
      <h4 className={`text-${themeContext.textColor}`}>Daily forecast</h4>
      {props.daily ?
        props.daily.map(day => {
          return (
            <div className={`d-flex align-items-center mb-1`} key={day.dt}>
              <div className={`text-${themeContext.textColor} w-25`}>
                {Conversion.unixToLocalTime(day.dt, props.timezoneOffset, `dddd`)}
              </div>
              <div className="w-25">
                <img className="mx-1 rounded-circle bg-light img-thumbnail"
                  style={imgStyle} src={require(`../../assets/${day.weather[0].icon}@2x.png`)} alt="weather icon" />
              </div>
              <div className={`w-25 h5 m-0 text-center text-${themeContext.textColor}`}>
                {Conversion.returnRoundedTemperature(day.temp.max)}{unitContext.units}
              </div>
              <div className={`w-25 h5 m-0 text-center text-${themeContext.textColor}`}>
                {Conversion.returnRoundedTemperature(day.temp.min)}{unitContext.units}
              </div>
            </div>
          )
        })
        : ``
      }
    </div>
  )
};

DailyForecastDiv.propTypes = {
  children: PropTypes.node,
  daily: PropTypes.array,
  timezoneOffset: PropTypes.number
};

export default DailyForecastDiv;