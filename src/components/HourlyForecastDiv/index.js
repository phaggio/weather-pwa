import React, { useContext } from 'react';
import Moment from 'moment';
import { Col, Row } from '../Grid';
import UnitContext from '../../utils/UnitContext';
import * as Conversion from '../../utils/Conversion';
import ThemeContext from '../../utils/ThemeContext';

const hourlyForecastStyle = {
  overflowX: 'auto'
};

const hourStyle = {
  // display: 'inline-block',
  // padding: '5px'
}

const HourlyForecastDiv = props => {

  const hourArr = props.hourlyForecast.slice(0, props.hours);
  const unitContext = useContext(UnitContext);

  const themeContext = useContext(ThemeContext);

  return (
    <div>
      <Row className={`bg-${themeContext.backgroundColor}`}>
        <Col size="12">
          <h3 className={`text-${themeContext.textColor}`}>Hourly forecast</h3>
          <div className="rounded-lg d-flex flex-nowrap" style={hourlyForecastStyle}>
            {hourArr.map(hour => {
              return (
                <div className="d-flex flex-column align-items-center" key={hour.dt} style={hourStyle}>
                  <div className={`text-${themeContext.textColor}`}>{Moment.unix(hour.dt).format(`h A`)}</div>
                  <img className="rounded-circle bg-light" size="w-100" src={require(`../../assets/${hour.weather[0].icon}@2x.png`)} alt="weather icon" />
                  <div className={`text-${themeContext.textColor}`}>{Conversion.returnRoundedTemperature(hour.temp)}{unitContext.units}</div>
                </div>
              )
            })}
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

export { HourlyForecastDiv };