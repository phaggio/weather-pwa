import React, { useContext } from 'react';
import UnitContext from '../../utils/UnitContext';
import DarkModeContext from '../../utils/DarkModeContext';
import ThemeContext from '../../utils/ThemeContext';

const DebugTool = props => {

  const unitContext = useContext(UnitContext);
  const darkModeContext = useContext(DarkModeContext);
  const themeContext = useContext(ThemeContext);

  return (
    <div className="d-flex flex-column btn-group mt-3">
      <label className={`text-${themeContext.textColor}`}>Debug Log Tool</label>
      <ul className="list-group w-75">
        <button className="btn btn-primary w-100 mb-1" onClick={() => console.log(unitContext)}><small>unitContext</small></button>
        <button className="btn btn-secondary w-100 mb-1" onClick={() => console.log(darkModeContext)}><small>darkModeContext</small></button>
        <button className="btn btn-success w-100 mb-1" onClick={() => console.log(themeContext)}><small>themeContext</small></button>
        <button className="btn btn-danger w-100 mb-1" onClick={props.consoleRecentCities}><small>recentCitiesState</small></button>
        <button className="btn btn-warning w-100 mb-1" onClick={props.consoleSearchCity}><small>searchCityState</small></button>
        <button className="btn btn-info w-100 mb-1" onClick={props.consoleSelectedCountry}><small>selectedCountryState</small></button>
        <button className="btn btn-light w-100 mb-1" onClick={props.consoleSelectedCoord}><small>selectedCoord</small></button>
        <button className="btn btn-dark w-100 mb-1" onClick={props.consoleShowRecentCities}><small>showRecentCitiesState</small></button>
      </ul>
    </div>
  )
};

export default DebugTool