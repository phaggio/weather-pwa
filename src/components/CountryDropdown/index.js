import React, { useContext } from 'react';
import ThemeContext from '../../utils/ThemeContext';

const CountryDropdown = props => {
  const themeContext = useContext(ThemeContext);

  return (
    <div className={`input-group bg-${themeContext.backgroundColor}`}>
      <div className="input-group">
        <select className="custom-select" onChange={props.onChange}>
          <option key="default" value="us">Select a country</option>
          {props.countryArr.map(country => {
            return <option key={country.name} value={country.code}>{country.name}</option>
          })}
        </select>
      </div>
      <small className={`ml-1 text-${themeContext.textColor}`}>Default country: US</small>
    </div>
  );
}

export { CountryDropdown }
