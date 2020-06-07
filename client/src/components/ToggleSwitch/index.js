import React from 'react'

const ToggleSwitch = props => {
  const darkMode = props.darkMode;
  return (
    <div className="custom-control custom-switch mb-3">
      <input type="checkbox" className="custom-control-input" id={props.toggleId} onClick={() => {
        console.log(`currently: ${props.darkMode}`)
        props.toggle();
      }} />
      <label className="custom-control-label text-white" htmlFor={props.toggleId}>{props.label}</label>
    </div>
  )
}

export default ToggleSwitch