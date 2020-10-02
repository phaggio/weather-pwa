import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import countryCodeJSON from '../../JSON/countryCode.json';
import ThemeContext from '../../utils/ThemeContext';

const CountryDropdown = props => {
  const themeContext = useContext(ThemeContext);
  const countries = [];
  for (const key in countryCodeJSON[0]) {
    // console.log(key, countryCodeJSON[0][key])
    countries.push(<option key={key} value={key}>{countryCodeJSON[0][key]}</option>)
  }

  return (
    <div className="input-group">
      <div className="input-group">
        <select className="custom-select"
          defaultValue={props.selectedCountry}
          onChange={props.onChange}>
          <option key="default" value="US">Select a country</option>
          {countries}
        </select>
      </div>
      <small className={`ml-1 text-${themeContext.textColor}`}>Default country: US</small>
    </div>
  )
}

CountryDropdown.propTypes = {
  children: PropTypes.node,
  selectedCountry: PropTypes.string,
  onChange: PropTypes.func
};

export default CountryDropdown
