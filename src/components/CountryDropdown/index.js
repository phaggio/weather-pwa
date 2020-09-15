import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../../utils/ThemeContext';

const CountryDropdown = props => {
  const themeContext = useContext(ThemeContext);

  return (
    <div className="input-group">
      <div className="input-group">
        <select className="custom-select" onChange={props.onChange} value={props.selectedCountry}>
          <option key="default" value="us">Select a country</option>
          {props.countryArr.map(country => {
            return <option key={country.name} value={country.code}>{country.name}</option>
          })}
        </select>
      </div>
      <small className={`ml-1 text-${themeContext.textColor}`}>Default country: US</small>
    </div>
  )
}

CountryDropdown.propTypes = {
  children: PropTypes.node,
  selectedCountry: PropTypes.string,
  countryArr: PropTypes.arrayOf(Object),
  onChange: PropTypes.func
};

export default CountryDropdown
