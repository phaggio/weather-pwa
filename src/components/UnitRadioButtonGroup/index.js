import React from 'react'
import propTypes from 'prop-types';

const UnitRadioButtonGroup = props => {
  return (
    <div className="form-group">
      <label className="text-white">Temperature Unit</label>

      {props.radios ? props.radios.map(radio => {
        return (
          <div className="custom-control custom-radio" key={radio.label}>
            <input type="radio" id={radio.label} name="customRadio"
              checked={radio.type === props.currentUnitType ? `checked` : ``}
              className="custom-control-input"
              onChange={() => props.updateUnitType(radio.type, radio.unit)} />
            <label className="custom-control-label text-white" htmlFor={radio.label}>{radio.label}</label>
            <small className="ml-2 font-italic text-white" htmlFor={radio.label}>{radio.description}</small>
          </div>
        )
      }) : ``}
    </div>
  )
}

UnitRadioButtonGroup.propTypes = {
  radios: propTypes.array,
  children: propTypes.element
}

export default UnitRadioButtonGroup