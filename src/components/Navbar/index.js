import React, { useContext, useEffect } from 'react';
import $ from 'jquery';
import { ToggleSwitch, UnitRadioButtonGroup, Nav } from '..';
import * as LocalStorage from '../../utils/LocalStorage';
import UnitContext from '../../utils/UnitContext';
import DarkModeContext from '../../utils/DarkModeContext';
import ThemeContext from '../../utils/ThemeContext';
import unitArr from '../../JSON/units.json';
import pkg from '../../../package.json'; // for updating app version

const Navbar = () => {

  const unitContext = useContext(UnitContext);
  const darkModeContext = useContext(DarkModeContext);
  const themeContext = useContext(ThemeContext);

  const toggle = bool => {
    darkModeContext.toggleDarkMode(bool);
    const storageObj = {
      darkMode: bool,
      "type": unitContext.unitType,
      "units": unitContext.units
    };
    LocalStorage.saveLocalStorage(`simple-weather`, storageObj);
    $('.navbar-collapse').collapse('hide');
  };

  const updateUnits = (type, unit) => {
    unitContext.updateUnitType(type, unit);
    const storageObj = {
      "darkMode": darkModeContext.darkMode,
      type: type,
      units: unit
    };
    LocalStorage.saveLocalStorage(`simple-weather`, storageObj);
    $('.navbar-collapse').collapse('hide');
  }

  useEffect(() => {
    themeContext.updateTheme(darkModeContext.darkMode);
  }, [darkModeContext.darkMode])

  return (
    <div>
      <div className="collapse navbar-collapse" id="navbarToggleExternalContent">
        <div className={`bg-${themeContext.backgroundColor} p-4`}>

          <h4 className={`text-${themeContext.textColor} h4`}>Settings</h4>

          <ToggleSwitch toggleId="dark-mode-toggle" label="Dark mode"
            darkMode={darkModeContext.darkMode} toggle={toggle}
          />

          <UnitRadioButtonGroup
            radios={unitArr}
            updateUnits={updateUnits}
            currentUnitType={unitContext.unitType}
          />

          <small className={`text-${themeContext.textColor}`}><em>version {pkg.version}</em></small>
        </div>
      </div>

      <Nav />
    </div>
  )
}

export default Navbar;