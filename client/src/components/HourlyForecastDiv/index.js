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
        return (
          <div className="d-flex flex-column border align-items-center" key={hour.dt} style={hourStyle}>
            <img size="w-100" src={require(`../../assets/${hour.weather[0].icon}@2x.png`)} alt="weather icon" />
            <div>{Moment.unix(hour.dt).format(`h A`)}</div>
            <div>{hour.temp}F</div>
          </div>
        )
      })}
    </div>

  )
};

export { HourlyForecastDiv };