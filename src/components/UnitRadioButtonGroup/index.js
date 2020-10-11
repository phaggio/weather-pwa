import React, { useContext } from 'react'
import propTypes from 'prop-types';
import ThemeContext from '../../utils/ThemeContext';

const UnitRadioButtonGroup = props => {

  const themeContext = useContext(ThemeContext);

  return (
    <div className="form-group">
      <label className={`text-${themeContext.textColor}`}>Unit</label>

      {
        props.radios ? props.radios.map(radio => {
          return (
            <div className="custom-control custom-radio" key={radio.label}>
              <input type="radio" id={radio.label} name="customRadio"
                checked={radio.type === props.currentUnitType ? true : false}
                className="custom-control-input"
                onChange={() => props.updateUnits(radio.type, radio.unit)} />
              <label className={`custom-control-label text-${themeContext.textColor}`} htmlFor={radio.label}>{radio.label}</label>
              <small className={`ml-2 font-italic text-${themeContext.textColor}`} htmlFor={radio.label}>{radio.description}</small>
            </div>
          )
        })
          :
          null
      }
    </div>
  )
}

UnitRadioButtonGroup.propTypes = {
  radios: propTypes.array,
  children: propTypes.element
}

export default UnitRadioButtonGroup