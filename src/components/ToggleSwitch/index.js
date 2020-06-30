import React, { useContext } from 'react';
import ThemeContext from '../../utils/ThemeContext';

const ToggleSwitch = props => {

  const themeContext = useContext(ThemeContext);

  return (
    <div className="custom-control custom-switch mb-3">

      <input type="checkbox" className="custom-control-input" id={props.toggleId}
        checked={props.darkMode}
        onChange={() => props.toggle(!props.darkMode)} />
      <label className={`custom-control-label text-${themeContext.textColor}`}
        htmlFor={props.toggleId}>{props.label}
      </label>

    </div>
  )
}

export default ToggleSwitch