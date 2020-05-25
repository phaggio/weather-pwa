import React from 'react';

const SearchGroup = props => {
  return (
    <div className="input-group">
      <input className="form-control" id="search-input" type="text" placeholder="city name" aria-label="Search" onChange={props.onChange} />
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
    </div>
  );
}

export { SearchGroup }
