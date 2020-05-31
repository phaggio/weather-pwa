import React from 'react';

const RecentCitiesDiv = props => {
  return (
    <div className="d-flex flex-column btn-group mt-3">
      <label>Recent cities:</label>
      <ul className="list-group w-100">
        <button className="btn btn-light w-100" onClick={props.consoleRecentCities}>console.log recent cities</button>
        {props.recentCities.map(city => {
          return (
            <div key={city.key}>
              <button className="btn btn-light w-75"
                value={city}
                onClick={() => props.recentCityButtonPressed(city.lat, city.lon)} >
                {`${city.city}, ${city.country}`}
              </button>
              <button className="btn btn-light w-25"
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

export { RecentCitiesDiv };