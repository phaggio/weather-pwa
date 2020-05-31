import React from 'react';
import Moment from 'moment';

const hourlyForecastStyle = {
  overflowX: 'auto'
};

const hourStyle = {
  display: 'inline-block',
  padding: '5px'
}

const HourlyForecastDiv = props => {
  const hourArr = props.hourlyForecast.slice(0, props.hours);
  return (
    <div className="d-flex flex-nowrap" style={hourlyForecastStyle}>
      {hourArr.map(hour => {
        return <div className="d-flex flex-column" key={hour.dt} style={hourStyle}>
          <div>Time: {Moment.unix(hour.dt).format(`h:mm A`)}</div>
          <div>Temperature: {hour.temp}F</div>
          <div>Feels like: {hour.feels_like}</div>
        </div>
      })}
    </div>

  )
};

export { HourlyForecastDiv };