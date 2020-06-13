import React from 'react';

const UnitContext = React.createContext({
  unitType: String,
  units: String,
  updateUnitType: () => undefined
});

export default UnitContext;