import React from 'react';

const CountryDropdown = props => {
  return (
    <div className="input-group">
      <div className="input-group">
        <select className="custom-select" onChange={props.onChange}>
          <option key="default" value="us">Select a country</option>
          {props.countryArr.map(country => {
            return <option key={country.name} value={country.code}>{country.name}</option>
          })}
        </select>
      </div>
      <small className="ml-1">Default country: US</small>
    </div>
  );
}

export { CountryDropdown }
