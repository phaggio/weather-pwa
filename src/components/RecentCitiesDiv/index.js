import React, { useContext } from 'react';
import ThemeContext from '../../utils/ThemeContext';

const RecentCitiesDiv = props => {
  const themeContext = useContext(ThemeContext);

  return (
    <div className={`d-flex flex-column btn-group mt-3 bg-${themeContext.backgroundColor}`}>
      <label className={`text-${themeContext.textColor}`}>Recent cities</label>
      <ul className="list-group w-100">
        {props.recentCities.map(city => {
          return (
            <div className="btn-group rounded" key={city.key}>
              <button className={`btn btn-${themeContext.backgroundColor} w-75`}
                value={city}
                onClick={() => props.recentCityButtonPressed({ city: city.city, country: city.country })} >
                {`${city.city}, ${city.country}`}
              </button>
              <button className={`btn btn-${themeContext.backgroundColor} w-25`}
                value={city}
                onClick={() => props.removeCityButtonPressed(city.key)}>
                <i className="material-icons">delete_outline</i>
              </button>
            </div>
          )
        })}
      </ul>
    </div>
  )
};

export default RecentCitiesDiv