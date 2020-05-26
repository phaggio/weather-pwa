import React from 'react';

const SearchGroup = props => {
  return (
    <div className="input-group">
      <input className="form-control" id="search-input" type="text" placeholder="city name" aria-label="Search" onChange={props.onChange} />
      <div className="input-group-append">
        {props.showSearchButton ?
          <button className="btn btn-primary btn-sm" type="search">
            <i className="material-icons">search</i>
          </button>
          :
          <button className="btn btn-success btn-sm" onClick={props.locateMe}>
            <i className="material-icons">location_searching</i>
          </button>
        }
      </div>
    </div>
  );
}

export { SearchGroup }
