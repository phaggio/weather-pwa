import React, { useContext } from 'react';
import AppContext from '../../utils/AppContext';

const RecentCitiesDiv = props => {
  const appContext = useContext(AppContext);
  return (
    <div className="d-flex flex-column btn-group mt-3">
      <label>Recent cities:</label>
      <ul className="list-group w-100">
        <button className="btn btn-secondary w-100" onClick={() => console.log(appContext)}>console.log appContext</button>
        <button className="btn btn-danger w-100" onClick={props.consoleRecentCities}>console.log recentCities</button>
        <button className="btn btn-danger w-100" onClick={props.consoleSearchCity}>console.log searchCity</button>
        <button className="btn btn-danger w-100" onClick={props.consoleSelectedCountry}>console.log selectedCountry</button>
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