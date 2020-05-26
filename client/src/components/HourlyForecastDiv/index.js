import React from 'react';
import Moment from 'moment';
import { Container, Col, Row } from '../Grid';

const hourlyForecastStyle = {
  overflowX: 'auto'
};

const hourStyle = {
  display: 'inline-block',
  padding: '5px'
}

const HourlyForecastDiv = props => {
  return (
    <div className="d-flex flex-nowrap" style={hourlyForecastStyle}>
      {props.hourlyForecast.map(hour => {
        return <div className="d-flex flex-column" key={hour.dt} style={hourStyle}>
          <div>Time: {Moment.unix(hour.dt).format(`h:mm A`)}</div>
          <div>Temperature: {hour.temp}F</div>
          <div>Feels like: {hour.feels_like}</div>
        </div>
      })}

      {/* <Col size="4 sm-4 lg-3">
        <img size="w-100" src={require(`../../assets/${props.currentWeather.weather[0].icon}@2x.png`)} alt="weather icon" />
      </Col> */}
    </div>

  )
};

export { HourlyForecastDiv };