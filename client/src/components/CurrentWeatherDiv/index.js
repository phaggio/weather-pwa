import React from 'react';
import { Container, Col, Row } from '../Grid';

const CurrentWeatherDiv = props => {
    return (
      <Row>
        <Col size="8 sm-8 lg-7">
          <h2>{props.currentWeather.name}</h2>
          <h3>Date MM/DD/YYYY</h3>
          <h4>Current Time</h4>
          <p>Current weather condition</p>
        </Col>
        <Col size="4 sm-4 lg-3">
          <img size="w-100" src={require("../../assets/02n@2x.png")} alt="weather icon" />
        </Col>
      </Row>

    )
};

export { CurrentWeatherDiv };