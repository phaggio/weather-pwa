import React from 'react';
import ToggleSwitch from '../ToggleSwitch';

const Navbar = () => {
  return (
    <div className="">
      <div className="collapse" id="navbarToggleExternalContent">
        <div className="bg-dark p-4">
          {/* <h5 className="text-black h4">Collapsed content</h5>
          <span className="text-muted">Toggleable via the navbar brand.</span> */}
          <h4 className="text-white h4">Settings</h4>

          <div className="custom-control custom-switch">
            <input type="checkbox" className="custom-control-input" id="hourly-forecast-toggle" />
            <label className="custom-control-label text-white" htmlFor="hourly-forecast-toggle">Hourly forecast</label>
          </div>
          <div className="custom-control custom-switch">
            <input type="checkbox" className="custom-control-input" id="dark-mode-toggle" />
            <label className="custom-control-label text-white" htmlFor="dark-mode-toggle">Dark mode</label>
          </div>
          <ToggleSwitch toggleId="Test" label="Test" />

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