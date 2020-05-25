import PropTypes from 'prop-types';
import React from 'react';

const SearchGroup = props => {
  return (
    <div className="input-group">
      <input className="form-control" id="search-input" type="text" placeholder="city name" aria-label="Search" />
      <div className="input-group-append">
        <button className="btn btn-success btn-sm" id="locate-me-button">
          <i className="material-icons">
            location_searching
            </i>
        </button>
        <button className="btn btn-primary btn-sm" id="search-button" type="search">
          <i className="material-icons">search</i>
        </button>
      </div>
      <div className="input-group">
        <select className="custom-select" id="country-select">
          <option value="us" defaultValue>Choose a country</option>
          <option value="us">United States</option>
          <option value="ca">Canada</option>
          <option value="uk">United Kingdom</option>
        </select>
      </div>
      <small className="ml-1">Default country: US</small>
    </div>
  );
}

export { SearchGroup }
