import React, { useContext, useEffect } from 'react';
import ToggleSwitch from '../ToggleSwitch';
import UnitRadioButtonGroup from '../UnitRadioButtonGroup';
import Nav from '../Nav';
import * as LocalStorage from '../../utils/LocalStorage';
import UnitContext from '../../utils/UnitContext';
import DarkModeContext from '../../utils/DarkModeContext';
import ThemeContext from '../../utils/ThemeContext';
import unitArr from '../../constant/units.json';

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
    }
    LocalStorage.saveLocalStorage(`simple-weather`, storageObj)
  };

  const updateUnits = (type, unit) => {
    unitContext.updateUnitType(type, unit);
    const storageObj = {
      "darkMode": darkModeContext.darkMode,
      type: type,
      units: unit
    }
    LocalStorage.saveLocalStorage(`simple-weather`, storageObj)
  }

  useEffect(() => {
    themeContext.updateTheme(darkModeContext.darkMode);
    console.log(`NavBar UseEffect takes in: darkModeContext = ${darkModeContext.darkMode}`)
  }, [darkModeContext.darkMode])

  return (
    <div className="">
      <div className="collapse" id="navbarToggleExternalContent">
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

        </div>
      </div>

      <Nav />
    </div>
  )
}

export default Navbar;