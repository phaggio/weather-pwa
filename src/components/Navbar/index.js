import React, { useContext, useEffect } from 'react';
import ToggleSwitch from '../ToggleSwitch';
import UnitRadioButtonGroup from '../UnitRadioButtonGroup';
import Nav from '../Nav';
import UnitContext from '../../utils/UnitContext';
import DarkModeContext from '../../utils/DarkModeContext';
import ThemeContext from '../../utils/ThemeContext';
import unitArr from '../../constant/units.json';

const Navbar = () => {

  const unitContext = useContext(UnitContext);
  const darkModeContext = useContext(DarkModeContext);
  const themeContext = useContext(ThemeContext);

  const toggle = bool => bool ? darkModeContext.toggleDarkMode(false) : darkModeContext.toggleDarkMode(true);

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
            updateUnitType={unitContext.updateUnitType}
            updateUnits={unitContext.updateUnits}
            currentUnitType={unitContext.unitType}
          />

        </div>
      </div>

      <Nav />
    </div>
  )
}

export default Navbar;