import React from 'react';

const RecentCitiesDiv = props => {
  return (
    <div className="d-flex flex-column btn-group mt-3">
      <label>Recent cities</label>
      <ul className="list-group w-100">
        {props.recentCities.map(city => {
          return (
            <div className="btn-group rounded" key={city.key}>
              <button className="btn btn-light w-75"
                value={city}
                onClick={() => props.recentCityButtonPressed({ city: city.city, country: city.country })} >
                {`${city.city}, ${city.country}`}
              </button>
              <button className="btn btn-light w-25"
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