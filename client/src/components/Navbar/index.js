import React, { useContext } from 'react';
import ToggleSwitch from '../ToggleSwitch';
import RadioButtonGroup from '../RadioButtonGroup';
import AppContext from '../../utils/AppContext';

const unitArr = [{ label: `Fahrenheit (°F)`, units: `imperial` }, { label: `Celsius (°C)`, units: `metric` }];

const Navbar = () => {
  const appContext = useContext(AppContext);
  const toggleDarkMode = () => {
    appContext.updateDarkMode(!appContext.darkMode);
  }
  return (
    <div className="">
      <div className="collapse" id="navbarToggleExternalContent">
        <div className="bg-dark p-4">
          {/* <h5 className="text-black h4">Collapsed content</h5>
          <span className="text-muted">Toggleable via the navbar brand.</span> */}
          <h4 className="text-white h4">Settings</h4>

          <ToggleSwitch toggleId="dark-mode-toggle" label="Dark mode" darkMode={appContext.darkMode} toggle={toggleDarkMode} />

          <RadioButtonGroup
            radios={unitArr}
            updateUnit={appContext.updateUnit}
            currentUnit={appContext.unit} />


        </div>
      </div>

      <nav className="navbar navbar-dark bg-dark">
        <button className="navbar-toggler" type="button" data-toggle="collapse"
          data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <span className="navbar-brand mb-0 h1 mx-auto text-white">Simple Weather</span>
      </nav>
    </div>
  )
}

export default Navbar;