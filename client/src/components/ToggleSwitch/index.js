import React from 'react'

const ToggleSwitch = props => {
  return (
    <div className="custom-control custom-switch">
      <input type="checkbox" className="custom-control-input" id={props.toggleId} />
      <label className="custom-control-label text-white" htmlFor={props.toggleId}>{props.label}</label>
    </div>
  )
}

export default ToggleSwitch