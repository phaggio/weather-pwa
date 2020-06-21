import React, { useContext } from 'react';
import { Col, Row } from '../Grid';
import ThemeContext from '../../utils/ThemeContext';

const SearchGroup = props => {
  const searchInput = React.createRef();
  const themeContext = useContext(ThemeContext);

  return (
    <Row className={`bg-${themeContext.backgroundColor}`}>
      <Col size="12">
        <div>
          <label className={`text-${themeContext.textColor}`}>Search a city:</label>
          <div className="input-group">
            <input
              ref={searchInput}
              className="form-control"
              id="search-input"
              type="text"
              placeholder="city name"
              aria-label="Search"
              onChange={event => props.onChange(event)}
              onKeyDown={event => props.keyPressed(event)}
            />

            <div className="input-group-append">
              {props.showSearchButton ?
                <button className="btn btn-primary btn-sm" type="search" onClick={() => props.searchButtonPressed(searchInput)}>
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
      </Col>
    </Row>
  );
};

export default SearchGroup
