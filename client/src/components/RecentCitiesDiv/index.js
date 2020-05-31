import React from 'react';

const RecentCitiesDiv = props => {
  return (
    <div>
      <button className="btn btn-light w-100" onClick={props.consoleRecentCities}>Console Log</button>
      {props.recentCities.map(city => {
        return (
          <button className="btn btn-light w-100"
            key={`${city.city}, ${city.country}`}
            value={city}
            onClick={() => props.recentCityButtonPressed(city.lat, city.lon)} >
            {`${city.city}, ${city.country}`}
          </button>
        )
      })}
    </div>
  )
};

export { RecentCitiesDiv };