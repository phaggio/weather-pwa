import React, { useContext } from 'react';
import { Col, Row } from '../Grid';
import ThemeContext from '../../utils/ThemeContext';

const RecentCitiesDiv = props => {

  const themeContext = useContext(ThemeContext);

  return (
    <Row className={`mh-100 bg-${themeContext.backgroundColor}`}>
      <Col size="12">
        <div className={`d-flex flex-column btn-group mt-3`}>
          <label className={`text-${themeContext.textColor}`}>Recent cities</label>
          <ul className={`list-group w-100`}>

            {props.recentCities.map(city => {
              return (
                <div className={`btn-group rounded mb-1`} key={city.key}>
                  <button className={`btn btn-${themeContext.backgroundColor} btn-outline-${themeContext.borderColor} w-75`}
                    value={city}
                    onClick={() => props.recentCityButtonPressed(
                      { city: city.city, country: city.country, lat: city.lat, lon: city.lon }
                    )} >
                    {`${city.city}, ${city.country}`}
                  </button>
                  <button className={`btn btn-${themeContext.backgroundColor} btn-outline-${themeContext.borderColor} w-25`}
                    value={city}
                    onClick={() => props.removeCityButtonPressed(city.key)}>
                    <i className="material-icons">delete_outline</i>
                  </button>
                </div>
              )
            })}
          </ul>
        </div>
      </Col>
    </Row>

  )
};

export default RecentCitiesDiv