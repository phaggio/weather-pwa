import React, { useContext } from 'react';
import { Col, Row } from '../Grid';
import UnitContext from '../../utils/UnitContext';
import ThemeContext from '../../utils/ThemeContext';
import * as Conversion from '../../utils/Conversion';

const hourlyForecastStyle = {
  overflowX: 'auto'
};

const HourlyForecastDiv = props => {

  const hourArr = props.hourly.slice(0, props.hours);
  const unitContext = useContext(UnitContext);
  const themeContext = useContext(ThemeContext);

  const imgStyle = {
    height: `60px`,
    width: `60px`
  }

  return (
    <div>
      <Row className={`bg-${themeContext.backgroundColor}`}>
        <Col size="12 lg-10 xl-9">
          <h4 className={`text-${themeContext.textColor}`}>Hourly forecast</h4>
          <div className="rounded-lg d-flex flex-nowrap" style={hourlyForecastStyle}>
            {hourArr.map(hour => {
              return (
                <div className="d-flex flex-column align-items-center" key={hour.dt}>
                  <div className={`text-${themeContext.textColor}`}>{Conversion.unixToLocalTime(hour.dt, props.timezone, `hA`)}</div>
                  <img className="mx-1 rounded-circle bg-light" style={imgStyle} size="w-100" src={require(`../../assets/${hour.weather[0].icon}@2x.png`)} alt="weather icon" />
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

export default HourlyForecastDiv;