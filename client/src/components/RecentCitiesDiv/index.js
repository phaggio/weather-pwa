import React from 'react';

const RecentCitiesDiv = props => {
  return (
    <div>
      <button className="btn btn-light w-100" onClick={props.onClick}>Button 1</button>
      <button className="btn btn-light w-100">Button 2</button>
      {props.recentCities.map(city => {
        return (
          <button className="btn btn-light w-100"
            key={city.city} >

            {`${city.city}, ${city.country}, lon: ${city.lon}`}
          </button>
        )
      })}
    </div>
  )
};

export { RecentCitiesDiv };