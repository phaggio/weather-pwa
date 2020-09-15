import React, { useContext } from 'react';
import ThemeContext from '../../utils/ThemeContext';

const SearchGroup = props => {
  const themeContext = useContext(ThemeContext);

  return (
    <div>
      
      <label className={`text-${themeContext.textColor}`}>Search a city:</label>
      <div className="input-group">
        <input defaultValue={props.defaultValue}
          className="form-control"
          type="text"
          placeholder="city name"
          aria-label="search city"
          onChange={event => props.onChange(event.target.value.trim())} // send input value to page
          onKeyDown={event => props.keyPressed(event.keyCode)} // send keyCode to page
        />

        <div className="input-group-append">
          {props.showSearchButton ?
            <button className="btn btn-primary btn-sm" type="search" onClick={() => props.searchButtonPressed()}>
              <i className="material-icons">search</i>
            </button>
            :
            <button className="btn btn-success btn-sm" onClick={() => props.locateMeButtonPressed()}>
              <i className="material-icons">location_searching</i>
            </button>
          }
        </div>
      </div>

    </div>
  )
};

export default SearchGroup
