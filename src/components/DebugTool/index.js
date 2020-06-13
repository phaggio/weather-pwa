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
      <label>Debug Tool</label>
      <ul className="list-group w-100">
        <button className="btn btn-primary w-100" onClick={() => console.log(unitContext)}>console.log unitContext</button>
        <button className="btn btn-primary w-100" onClick={() => console.log(darkModeContext)}>console.log darkModeContext</button>
        <button className="btn btn-primary w-100" onClick={() => console.log(themeContext)}>console.log themeContext</button>
        <button className="btn btn-secondary w-100" onClick={props.consoleRecentCities}>console.log recentCities</button>
        <button className="btn btn-info w-100" onClick={props.consoleSearchCity}>console.log searchCity</button>
        <button className="btn btn-warning w-100" onClick={props.consoleSelectedCountry}>console.log selectedCountry</button>
      </ul>
    </div>
  )
};

export default DebugTool