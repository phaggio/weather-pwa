import React, { useContext } from 'react';
import { Col, Row } from '../Grid';
import ThemeContext from '../../utils/ThemeContext';

const CountryDropdown = props => {

  const themeContext = useContext(ThemeContext);

  return (
    <Row className={`bg-${themeContext.backgroundColor}`}>
      <Col size="12">
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
      </Col>
    </Row>
  );
}

export default CountryDropdown
