import React, { useContext } from 'react';
import Moment from 'moment';
import { Col, Row } from '../Grid';
import UnitContext from '../../utils/UnitContext';
import * as Conversion from '../../utils/Conversion';
import ThemeContext from '../../utils/ThemeContext';

const DailyForecastDiv = props => {

  const unitContext = useContext(UnitContext);

  const themeContext = useContext(ThemeContext);

  return (
    <div>
      <Row className={`bg-${themeContext.backgroundColor}`}>
        <Col size="12">
          <h4 className={`text-${themeContext.textColor}`}>Daily forecast</h4>
          <div className="rounded-lg">
            {props.daily.map(day => {
              return (
                <div className="d-flex align-items-center" key={day.dt}>
                  <div className={`text-${themeContext.textColor}`}>{Moment.unix(day.dt).format(`h A`)}</div>
                  <img className="mx-1 rounded-circle bg-light" size="w-100" src={require(`../../assets/${day.weather[0].icon}@2x.png`)} alt="weather icon" />
                  <div className={`text-${themeContext.textColor}`}>{Conversion.returnRoundedTemperature(day.temp)}{unitContext.units}</div>
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

export { DailyForecastDiv };