import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../../utils/ThemeContext';

const RecentCitiesDiv = props => {

  const themeContext = useContext(ThemeContext);
  const [showRecentCities, setShowRecentCities] = useState(true);

  return (
    <div>

      <div className={`d-flex flex-column btn-group mt-3`}>
        <div className="d-flex justify-content-between">
          <label className={`text-${themeContext.textColor}`}>Recent cities</label>
          <div className={`btn py-0 material-icons text-${themeContext.textColor}`}
            data-toggle="collapse"
            data-target="#recent-cities"
            role="button"
            onClick={() => setShowRecentCities(!showRecentCities)}
          >{showRecentCities ? `expand_less` : `expand_more`}</div>
        </div>

        <ul className={`list-group w-100 collapse show`} id="recent-cities">
          {
            props.recentCities.map(city => {
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
            })
          }
        </ul>
      </div>

    </div>
  )
};

RecentCitiesDiv.propTypes = {
  children: PropTypes.node,
  recentCities: PropTypes.arrayOf(Object),
  recentCityButtonPressed: PropTypes.func,
  removeCityButtonPressed: PropTypes.func
};

export default RecentCitiesDiv