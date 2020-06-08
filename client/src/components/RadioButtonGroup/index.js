import React from 'react'
import propTypes from 'prop-types';

const RadioButtonGroup = props => {
  return (
    <div className="form-group">
      <label className="text-white">Temperature Unit</label>

      {props.radios ? props.radios.map(radio => {
        return (
          <div className="custom-control custom-radio" key={radio.label}>
            <input type="radio" id={radio.label} name="customRadio"
              checked={radio.type === props.currentUnitType ? `checked` : ``}
              className="custom-control-input"
              onChange={() => props.updateUnit(radio.type)} />
            <label className="custom-control-label text-white" htmlFor={radio.label}>{radio.label}</label>
          </div>
        )
      }) : ``}
    </div>
  )
}

RadioButtonGroup.propTypes = {
  radios: propTypes.array,
  children: propTypes.element
}

export default RadioButtonGroup