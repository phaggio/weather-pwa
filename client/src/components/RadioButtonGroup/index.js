import React from 'react'
import propTypes from 'prop-types';

const RadioButtonGroup = props => {
  return (
    <div className="form-group">
      <label className="text-white">Temperature Unit</label>

      {props.radios ? props.radios.map(radio => {
        return (
          <div className="custom-control custom-radio" key={radio}>
            <input type="radio" id={radio} name="customRadio" className="custom-control-input" />
            <label className="custom-control-label text-white" htmlFor={radio}>{radio}</label>
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