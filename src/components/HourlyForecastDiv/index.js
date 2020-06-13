import React, { useContext } from 'react';
import Moment from 'moment';
import UnitContext from '../../utils/UnitContext';
import * as Conversion from '../../utils/Conversion';

const hourlyForecastStyle = {
  overflowX: 'auto'
};

const hourStyle = {
  display: 'inline-block',
  padding: '5px'
}

const HourlyForecastDiv = props => {

  const hourArr = props.hourlyForecast.slice(0, props.hours);
  const unitContext = useContext(UnitContext);
  
  return (
    <div className="border border-primary d-flex flex-nowrap" style={hourlyForecastStyle}>
      {hourArr.map(hour => {
        return (
          <div className="d-flex flex-column border align-items-center" key={hour.dt} style={hourStyle}>
            <img className="border border-danger" size="w-100" src={require(`../../assets/${hour.weather[0].icon}@2x.png`)} alt="weather icon" />
            <div>{Moment.unix(hour.dt).format(`h A`)}</div>
            <div>{Conversion.returnRoundedTemperature(hour.temp)}{unitContext.units}</div>
          </div>
        )
      })}
    </div>

  )
};

export { HourlyForecastDiv };