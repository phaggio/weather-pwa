import React from 'react'

const ToggleSwitch = props => {
  return (
    <div className="custom-control custom-switch">
      <label className="custom-control-label text-white" htmlFor={props.toggleId}>{props.label}</label>
      <input type="checkbox" className="custom-control-input" id={props.toggleId} />
    </div>
  )
}

export default ToggleSwitch